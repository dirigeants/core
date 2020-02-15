import { Client } from '../Client';
import { RestManager } from './RestManager';
import { AsyncQueue } from '../../util/AsyncQueue';
import { sleep } from '../../util/Util';

export interface Request {
	method: string;
	url: string;
	data: any;
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
		return (this.manager.globalTimeout || this.remaining <= 0) && Date.now() < this.reset;
	}

	private get timeToReset(): number {
		// todo: actual remaining time code
		return 0;
	}

	public async push(request: Request): Promise<any> {
		await this.asyncQueue.wait();
		try {
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
			return this.makeRequest(request);
		} finally {
			this.asyncQueue.shift();
		}
	}

	private async makeRequest(request: Request): Promise<any> {

	}

}
