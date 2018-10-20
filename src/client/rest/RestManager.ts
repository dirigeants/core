import Client from '../Client';
import RequestHandler from './RequestHandler';

export default class RestManager {

	public client: Client;
	private queues: Map<string, RequestHandler> = new Map();

	public constructor(client: Client) {
		this.client = client;
	}

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
