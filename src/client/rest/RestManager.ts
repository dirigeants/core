import { Agent } from 'https';
import { URLSearchParams } from 'url';
import { RequestInit } from 'node-fetch';
import * as FormData from 'form-data';

import { Cache } from '../../util/Cache';
import { Client } from '../Client';
import { RequestHandler } from './RequestHandler';
import { Request, RouteIdentifier } from './Router';
import { UserAgent } from '../../util/Constants';

const agent = new Agent({ keepAlive: true });

export interface Headers {
	'User-Agent': string;
	Authorization: string;
	'X-RateLimit-Precision': string;
	'X-Audit-Log-Reason'?: string;
}

/**
 * The overall manager of REST requests
 */
export class RestManager {

	/**
	 * A timeout promise when we are globally ratelimited
	 */
	public globalTimeout: Promise<void> | null = null;

	/**
	 * Caches known hashes from the api route provided
	 */
	public readonly hashes: Cache<string, string> = new Cache();

	/**
	 * The current request queues
	 */
	private readonly queues: Cache<string, RequestHandler> = new Cache();

	/**
	 * The sweeper to ensure queues don't memory leak
	 */
	private readonly sweeper: NodeJS.Timeout;

	/**
	 * @param client The Project-Blue client
	 * @param token The bot token used to make api requests
	 */
	public constructor(public readonly client: Client, private readonly token: string) {
		// Periodically remove inactive handlers
		this.sweeper = setInterval(() => this.queues.sweep((handler) => handler.inactive), 300000);
	}

	/**
	 * Makes a new request
	 * @param routeID The generalized api route with literal ids for major parameters
	 * @param request The request info
	 */
	public queueRequest(routeID: RouteIdentifier, request: Request): Promise<unknown> {
		// When a hash isn't know, fallback to the old "Ratelimits are per generalized route, per major parameter"
		const hash = this.hashes.get(`${request.method}:${routeID.route}`) || `UnknownHash(${routeID.route})`;
		// Get an existing request queue or create a new one
		const queue = this.queues.get(`${hash}:${routeID.majorParameter}`) || this.createQueue(hash, routeID.majorParameter);
		// Resolve the request into usable node-fetch parameters once
		const { url, options } = this.resolveRequest(request);
		// Queue up the request
		return queue.push(routeID, url, options);
	}

	/**
	 * Creates a new rate limit queue for a new or existing hash
	 * @param hash The hash the new queue is run on
	 */
	private createQueue(hash: string, majorParameter: string): RequestHandler {
		// Creates an async request queue to handle a bucket of requests
		const queue = new RequestHandler(this, hash, majorParameter);
		// Caches the queue based on the hash given
		this.queues.set(queue.id, queue);
		// Returns the new queue
		return queue;
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

}
