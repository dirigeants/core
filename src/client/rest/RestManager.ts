import { Cache } from '../../util/Cache';
import { Client } from '../Client';
import { RequestHandler } from './RequestHandler';
import { Request } from './Router';

/**
 * The overall manager of REST requests
 */
export class RestManager {

	/**
	 * The current request queues
	 */
	private readonly queues: Cache<string, RequestHandler> = new Cache();

	/**
	 * Bucket hash lookup
	 */
	public readonly hashs: Cache<string, string> = new Cache();

	public globalTimeout: Promise<void> | null = null;

	/**
	 * The sweeper to ensure queues don't memory leak
	 */
	private readonly sweeper: NodeJS.Timeout;

	// eslint-disable-next-line no-useless-constructor
	public constructor(public readonly client: Client, private token: string) {
		this.sweeper = setInterval(() => this.queues.sweep((handler) => handler.inactive), 300000);
	}

	/**
	 * Makes a new request
	 * @param request The request info
	 */
	public queueRequest(route: string, request: Request): Promise<any> {
		const hash = this.hashs.get(`${request.method}:${route}`) || `${request.method}:unknown(${RestManager.getMajorParameter(request.endpoint)})`;
		const queue = this.queues.get(hash) || this.createQueue(hash);
		return queue.push(route, request);
	}

	/**
	 * Creates a new rate limit queue for a new or existing hash
	 * @param hash The hash the new queue is run on
	 */
	private createQueue(hash: string): RequestHandler {
		const queue = new RequestHandler(this, hash, this.token);
		this.queues.set(hash, queue);
		return queue;
	}

	private static getMajorParameter(endpoint: string): string {
		const result = /^\/(?:channels|guilds|webhooks)\/(\d{16,19})/.exec(endpoint);
		return (result && result[1]) || 'unknown';
	}

}
