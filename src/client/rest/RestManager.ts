import { Cache } from '../../util/Cache';
import { Client } from '../Client';
import { RequestHandler } from './RequestHandler';
import { Request } from './Router';

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
	public constructor(public readonly client: Client, private token: string) {
		// Periodically remove inactive handlers
		this.sweeper = setInterval(() => this.queues.sweep((handler) => handler.inactive), 300000);
	}

	/**
	 * Makes a new request
	 * @param route The api route w/ major parameters
	 * @param request The request info
	 */
	public queueRequest(route: string, request: Request): Promise<unknown> {
		// When a hash isn't know, fallback to the old "Ratelimits are per route, per major parameter"
		const hash = this.hashes.get(`${request.method}:${route}`) || `UnknownHash(${route})`;
		// Get an existing request queue or create a new one
		const queue = this.queues.get(hash) || this.createQueue(hash);
		// Queue up the request
		return queue.push(route, request);
	}

	/**
	 * Creates a new rate limit queue for a new or existing hash
	 * @param hash The hash the new queue is run on
	 */
	private createQueue(hash: string): RequestHandler {
		// Creates an async request queue to handle a bucket of requests
		const queue = new RequestHandler(this, hash, this.token);
		// Caches the queue based on the hash given
		this.queues.set(hash, queue);
		// Returns the new queue
		return queue;
	}

}
