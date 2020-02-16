import fetch, { Response, RequestInit } from 'node-fetch';
import AbortController from 'abort-controller';
import { Agent } from 'https';
import { URLSearchParams } from 'url';
import * as FormData from 'form-data';

import { Client } from '../Client';
import { RestManager } from './RestManager';
import { AsyncQueue } from '../../util/AsyncQueue';
import { sleep } from '../../util/Util';
import { UserAgent } from '../../util/Constants';

const agent = new Agent({ keepAlive: true });

export interface Request {
	method: string;
	url: string;
	query?: any;
	headers?: any;
	data?: any;
	files?: any[];
	reason?: string;
}

export interface Headers {
	'User-Agent': string;
	Authorization: string;
	'X-Audit-Log-Reason'?: string;
}

/**
 * The structure used to handle requests for a route
 */
export class RequestHandler {

	/**
	 * The Project-Blue client
	 */
	public client: Client;
	private asyncQueue = new AsyncQueue();
	private reset = -1;
	private remaining = -1;
	private limit = -1;
	private retryAfter = -1;

	public constructor(private readonly manager: RestManager, private readonly route: string, private token: string) {
		this.client = this.manager.client;
	}

	/**
	 * The activity state of this RequestHandler
	 */
	public get inactive(): boolean {
		return this.asyncQueue.remaining === 0 && !this.limited;
	}

	private get limited(): boolean {
		return this.remaining <= 0 && Date.now() < this.reset;
	}

	private get timeToReset(): number {
		return this.reset - Date.now();
	}

	public async push(request: Request): Promise<any> {
		const { url, options } = this.resolveRequest(request);
		await this.asyncQueue.wait();
		try {
			await this.manager.globalTimeout;
			if (this.limited) {
				this.client.emit('ratelimited', {
					timeToReset: this.timeToReset,
					limit: this.limit,
					method: request.method,
					path: request.url,
					route: this.route
				});
				await sleep(this.timeToReset);
			}
			return await this.makeRequest(url, options);
		} finally {
			this.asyncQueue.shift();
		}
	}

	private resolveRequest(request: Request): { url: string, options: RequestInit } {
		let queryString = '';

		if (request.query) queryString = `?${new URLSearchParams(request.query.filter(([, value]: [string, unknown]) => value !== null && typeof value !== undefined).toString())}`;

		const url = `${this.client.options.rest.api}/v${this.client.options.rest.version}${request.url}${queryString}`;

		const headers: Headers = {
			'User-Agent': UserAgent,
			Authorization: `Bot ${this.token}`
		};

		if (request.reason) headers['X-Audit-Log-Reason'] = encodeURIComponent(request.reason);

		let body;
		let additionalHeaders;
		if (request.files) {
			body = new FormData();
			for (const file of request.files) if (file && file.file) body.append(file.name, file.file, file.name);
			if (typeof request.data !== 'undefined') body.append('payload_json', JSON.stringify(request.data));
			additionalHeaders = body.getHeaders();
		} else if (request.data != null) { // eslint-disable-line eqeqeq
			body = JSON.stringify(request.data);
			additionalHeaders = { 'Content-Type': 'application/json' };
		}

		const options = {
			method: request.method,
			headers: { ...request.headers || {}, ...additionalHeaders || {}, ...headers },
			agent,
			body
		};

		return { url, options };
	}

	private async makeRequest(url: string, options: RequestInit, retries = 0): Promise<unknown> {
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), this.client.options.rest.timeout);
		let res: Response;

		try {
			res = await fetch(url, { ...options, signal: controller.signal });
		} finally {
			clearTimeout(timeout);
		}

		if (res.headers) {
			const serverDate = res.headers.get('date') as string;
			const limit = res.headers.get('x-ratelimit-limit');
			const remaining = res.headers.get('x-ratelimit-remaining');
			const reset = res.headers.get('x-ratelimit-reset');
			const retryAfter = res.headers.get('retry-after');

			this.limit = limit ? Number(limit) : Infinity;
			this.remaining = remaining ? Number(remaining) : 1;
			this.reset = reset ? RequestHandler.calculateReset(reset, serverDate) + this.client.options.rest.offset : Date.now();
			this.retryAfter = retryAfter ? Number(retryAfter) + this.client.options.rest.offset : -1;

			// https://github.com/discordapp/discord-api-docs/issues/182
			if (this.route.includes('reactions')) {
				this.reset = new Date(serverDate).getTime() - RequestHandler.getAPIOffset(serverDate) + 250;
			}

			// Handle global ratelimit
			if (res.headers.get('x-ratelimit-global')) {
				// Set the manager's global timeout as the promise for other requests to "wait"
				this.manager.globalTimeout = sleep(this.retryAfter).then(() => {
					this.manager.globalTimeout = null;
				});
			}
		}

		if (res.ok) {
			return RequestHandler.parseResponse(res);
		} else if (res.status === 429) {
			// A ratelimit was hit - this should never happen
			this.client.emit('debug', `429 hit on route ${this.route}`);
			await sleep(this.retryAfter);
			return this.makeRequest(url, options, retries);
		} else if (res.status >= 500 && res.status < 600) {
			// Retry the specified number of times for possible serverside issues
			if (retries !== this.client.options.rest.retryLimit) return this.makeRequest(url, options, ++retries);
			// todo: Make an HTTPError class
			throw new Error([res.statusText, res.constructor.name, res.status, options.method, url].join(', '));
		} else {
			// Handle possible malformed requests
			if (res.status >= 400 && res.status < 500) {
				const data = await RequestHandler.parseResponse(res);
				// todo: Make a DiscordAPIError class
				throw new Error([url, data, options.method, res.status].join(', '));
			}
			return null;
		}
	}

	private static parseResponse(res: Response): any {
		if (res.headers.get('content-type')!.startsWith('application/json')) return res.json();
		return res.buffer();
	}

	private static getAPIOffset(serverDate: string): number {
		return new Date(serverDate).getTime() - Date.now();
	}

	private static calculateReset(reset: string, serverDate: string): number {
		return new Date(Number(reset) * 1000).getTime() - this.getAPIOffset(serverDate);
	}

}
