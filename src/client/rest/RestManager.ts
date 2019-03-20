import Cache from '../../util/Cache.ts';
import Client from '../Client.ts';
import RequestHandler from './RequestHandler.ts';

/**
 * The overall manager of REST requests
 */
export default class RestManager {

	/**
	 * The current request queues
	 */
	private readonly queues: Cache<string, RequestHandler> = new Cache();

	/**
	 * The sweeper to ensure queues don't memory leak
	 */
	private readonly sweeper: number = setInterval(() => this.queues.sweep((handler) => handler.inactive), 300000);

	public constructor(public readonly client: Client) { }

	/**
	 * Makes a new request
	 * @param method The http method
	 * @param route The route
	 * @param url The url
	 * @param data The data to patch/post
	 */
	public makeRequest(method: string, route: string, url: string, data?: any): Promise<any> {
		return new Promise((resolve, reject) => {
			const queue = this.queues.get(route) || this.createQueue(route);
			queue.push({ method, url, data, resolve, reject });
		});
	}

	/**
	 * Creates a new rate limit queue for a new route
	 * @param route The route the new queue is run on
	 */
	private createQueue(route: string): RequestHandler {
		const queue = new RequestHandler(this);
		this.queues.set(route, queue);
		return queue;
	}

}
