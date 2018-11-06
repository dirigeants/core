import Cache from '../../util/Cache';
import Client from '../Client';
import RequestHandler from './RequestHandler';

export default class RestManager {

	private queues: Cache<string, RequestHandler> = new Cache();
	private sweeper: number = setInterval(() => this.queues.sweep((handler) => handler.inactive), 300000);

	public constructor(public client: Client) { }

	public makeRequest(method: string, route: string, url: string, data?: any): Promise<any> {
		return new Promise((resolve, reject) => {
			const queue = this.queues.get(route) || this.createQueue(route);
			queue.push({ method, url, data, resolve, reject });
		});
	}

	private createQueue(route: string): RequestHandler {
		const queue = new RequestHandler(this);
		this.queues.set(route, queue);
		return queue;
	}

}
