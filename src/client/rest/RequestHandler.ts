import fetch, { Response, RequestInit } from 'node-fetch';
import AbortController from 'abort-controller';
import { Agent } from 'https';
import { URLSearchParams } from 'url';
import * as FormData from 'form-data';

import { Client } from '../Client';
import { Request } from './Router';
import { RestManager } from './RestManager';
import { AsyncQueue } from '../../util/AsyncQueue';
import { sleep } from '@klasa/utils';
import { UserAgent } from '../../util/Constants';

const agent = new Agent({ keepAlive: true });

export interface Headers {
	'User-Agent': string;
	Authorization: string;
	'X-RateLimit-Precision': string;
	'X-Audit-Log-Reason'?: string;
}

/**
 * The structure used to handle requests for a given bucket
 */
export class RequestHandler {

	/**
	 * The Project-Blue client
	 */
	public client: Client;

	/**
	 * The interface used to sequence async requests sequentially
	 */
	private asyncQueue = new AsyncQueue();

	/**
	 * The time this ratelimit bucket will reset
	 */
	private reset = -1;

	/**
	 * The remaining requests that can be made before we are ratelimited
	 */
	private remaining = 1;

	/**
	 * The total number of requests that can be made before we are ratelimited
	 */
	private limit = Infinity;

	/**
	 * @param manager The rest manager
	 * @param hash The hash that this RequestHandler handles
	 * @param token The bot token used to make requests
	 */
	public constructor(private readonly manager: RestManager, private readonly hash: string, private token: string) {
		this.client = this.manager.client;
	}

	/**
	 * The activity state of this RequestHandler
	 */
	public get inactive(): boolean {
		return this.asyncQueue.remaining === 0 && !this.limited;
	}

	/**
	 * If the ratelimit bucket is currently limited
	 */
	private get limited(): boolean {
		return this.remaining <= 0 && Date.now() < this.reset;
	}

	/**
	 * The time until queued requests can continue
	 */
	private get timeToReset(): number {
		return this.reset - Date.now();
	}

	/**
	 * Queues a request to be sent
	 * @param route The api route w/ major parameters
	 * @param request All the information needed to make a request
	 */
	public async push(route: string, request: Request): Promise<any> {
		// Resolve the request into usable node-fetch parameters once
		const { url, options } = this.resolveRequest(request);
		// Wait for any previous requests to be completed before this one is run
		await this.asyncQueue.wait();
		try {
			// Wait for any global ratelimits to pass before continuing to process requests
			await this.manager.globalTimeout;
			// Check if this request handler is currently ratelimited
			if (this.limited) {
				// Let library users know they have hit a ratelimit
				this.client.emit('ratelimited', {
					timeToReset: this.timeToReset,
					limit: this.limit,
					method: request.method,
					hash: this.hash,
					endpoint: request.endpoint
				});
				// Wait the remaining time left before the ratelimit resets
				await sleep(this.timeToReset);
			}
			// Make the request, and return the results
			return await this.makeRequest(route, url, options);
		} finally {
			// Allow the next request to fire
			this.asyncQueue.shift();
		}
	}

	/**
	 * Formats the request data into a format that node-fetch can use
	 * @param request All the information needed to make a request
	 */
	private resolveRequest(request: Request): { url: string, options: RequestInit } {
		let querystring = '';

		// If there is query options passed, format it into a querystring
		if (request.query) querystring = `?${new URLSearchParams(request.query.filter(([, value]: [string, unknown]) => value !== null && typeof value !== undefined).toString())}`;

		// Format the full request url (base, version, endpoint, query)
		const url = `${this.client.options.rest.api}/v${this.client.options.rest.version}${request.endpoint}${querystring}`;

		// Assign the basic request headers
		const headers: Headers = {
			'User-Agent': UserAgent,
			Authorization: `Bot ${this.token}`,
			'X-RateLimit-Precision': 'millisecond'
		};

		// Optionally assign an audit log reason
		if (request.reason) headers['X-Audit-Log-Reason'] = encodeURIComponent(request.reason);

		let body;
		let additionalHeaders;

		if (request.files) {
			body = new FormData();
			// Add attachments to the multipart form-data
			for (const file of request.files) if (file && file.file) body.append(file.name, file.file, file.name);
			// Add json data to the multipart form-data
			if (typeof request.data !== 'undefined') body.append('payload_json', JSON.stringify(request.data));
			// Get the headers we need to add for all of the multipart data
			additionalHeaders = body.getHeaders();
		} else if (request.data != null) { // eslint-disable-line eqeqeq
			// Stringify the data
			body = JSON.stringify(request.data);
			// We are sending data as json in this case
			additionalHeaders = { 'Content-Type': 'application/json' };
		}

		// Format all the fetch options together
		const options = {
			method: request.method,
			headers: { ...request.headers || {}, ...additionalHeaders || {}, ...headers },
			agent,
			body
		};

		// Return the data needed for node-fetch
		return { url, options };
	}

	/**
	 * The method that actually makes the request to the api, and updates things accordingly
	 * @param route The api route w/ major parameters
	 * @param url The fully resolved url to make the request to
	 * @param options The node-fetch options needed to make the request
	 * @param retries The number of retries this request has already attempted (recursion)
	 */
	private async makeRequest(route: string, url: string, options: RequestInit, retries = 0): Promise<unknown> {
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), this.client.options.rest.timeout);
		let res: Response;

		try {
			res = await fetch(url, { ...options, signal: controller.signal });
		} finally {
			clearTimeout(timeout);
		}

		let retryAfter = 0;

		if (res.headers) {
			const serverDate = res.headers.get('Date') as string;
			const limit = res.headers.get('X-RateLimit-Limit');
			const remaining = res.headers.get('X-RateLimit-Remaining');
			const reset = res.headers.get('X-RateLimit-Reset');
			const hash = res.headers.get('X-RateLimit-Bucket');
			const retry = res.headers.get('Retry-After');

			// Update the total number of requests that can be made before the ratelimit resets
			this.limit = limit ? Number(limit) : Infinity;
			// Update the number of remaining requests that can be made before the ratelimit resets
			this.remaining = remaining ? Number(remaining) : 1;
			// Update the time when this ratelimit resets
			this.reset = reset ? RequestHandler.calculateReset(reset, serverDate) + this.client.options.rest.offset : Date.now();

			// Amount of time in milliseconds until we should retry if ratelimited (globally or otherwise)
			if (retry) retryAfter = Number(retry) + this.client.options.rest.offset;

			// Handle buckets via the hash header retroactively
			if (hash && hash !== this.hash) {
				// Let library users know when ratelimit buckets have been updated
				this.client.emit('debug', `bucket hash update: ${this.hash} => ${hash} for ${options.method}:${route}`);
				// This queue will eventually be eliminated via attrition
				this.manager.hashes.set(`${options.method}:${route}`, hash);
			}

			// Handle global ratelimit
			if (res.headers.get('X-RateLimit-Global')) {
				// Set the manager's global timeout as the promise for other requests to "wait"
				this.manager.globalTimeout = sleep(retryAfter).then(() => {
					// After the timer is up, clear the promise
					this.manager.globalTimeout = null;
				});
			}
		}

		if (res.ok) {
			return RequestHandler.parseResponse(res);
		} else if (res.status === 429) {
			// A ratelimit was hit - this may happen if the route isn't associated with an official bucket hash yet, or when first globally ratelimited
			this.client.emit('debug', `429 hit on route: ${route}`);
			// Wait the retryAfter amount of time before retrying the request
			await sleep(retryAfter);
			// Since this is not a server side issue, the next request should pass, so we don't bump the retries counter
			return this.makeRequest(route, url, options, retries);
		} else if (res.status >= 500 && res.status < 600) {
			// Retry the specified number of times for possible server side issues
			if (retries !== this.client.options.rest.retryLimit) return this.makeRequest(route, url, options, ++retries);
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

	/**
	 * Converts the response to usable data
	 * @param res The node-fetch response
	 */
	private static parseResponse(res: Response): any {
		if (res.headers.get('Content-Type')!.startsWith('application/json')) return res.json();
		return res.buffer();
	}

	/**
	 * The difference between discord server's clock and this servers clock
	 * @param serverDate The time reported by discord.app
	 */
	private static getAPIOffset(serverDate: string): number {
		// The date header is an IMF-fixdate formated date string
		return new Date(serverDate).getTime() - Date.now();
	}

	/**
	 * The time this bucket will reset adjusted for the time difference
	 * @param reset The time the ratelimit will reset
	 * @param serverDate The time discord.app servers say it is
	 */
	private static calculateReset(reset: string, serverDate: string): number {
		// JS dates are always in milliseconds. Reset is always in seconds even with X-RateLimit-Precision set to milliseconds
		return new Date(Number(reset) * 1000).getTime() - this.getAPIOffset(serverDate);
	}

}
