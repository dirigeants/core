import { EventEmitter } from 'events';
import { RestManager } from './rest/RestManager';
import { Router } from './rest/Router';
import { WebSocketManager } from './ws/WebSocketManager';

export interface ClientOptions {
	shards?: number | Array<number>;
}

/**
 * The Project-Blue Client used to wrap the discord api
 */
export class Client extends EventEmitter {

	/**
	 * The api router
	 */
	public get api(): Router {
		return new Router(this);
	}

	/**
	 * The WebSocket manager
	 */
	public ws: WebSocketManager | null = null;

	/**
	 * The rest api manager
	 */
	public rest: RestManager | null = null;

	public constructor(public options: ClientOptions) {
		super();
	}

	/**
	 * Logs this client into the api
	 * @param token The token to use to connect to the api with
	 */
	public async login(token: string) {
		this.rest = new RestManager(this, token);
		this.ws = new WebSocketManager(this, this.options.shards || 1, token);
	}

}
