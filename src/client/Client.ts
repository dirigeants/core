import RestManager from './rest/RestManager.ts';
import Router from './rest/Router.ts';
import WebsocketManager from './ws/WebSocketManager.ts';

export interface ClientOptions {
	shards?: number | Array<number>;
}

/**
 * The D.TS Client used to wrap the discord api
 */
export default class Client extends EventTarget {

	/**
	 * The api router
	 */
	public get api(): Router {
		return new Router(this);
	}

	/**
	 * The websocket manager
	 */
	public ws: WebsocketManager | null = null;

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
		this.ws = new WebsocketManager(this, this.options.shards || 1, token);
	}

}
