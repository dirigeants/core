import RestManager from './rest/RestManager';
import Router from './rest/Router';
import WebsocketManager from './ws/WebSocketManager';

export interface ClientOptions {
	shards?: number | Array<number>;
}

export default class Client extends EventTarget {

	public get api(): Router {
		return new Router(this);
	}

	public ws: WebsocketManager;
	public options: ClientOptions;
	public rest: RestManager;
	private token: string;

	public constructor(options: ClientOptions) {
		super();
		this.options = options;
		this.ws = new WebsocketManager(this, options.shards);
		this.rest = new RestManager(this);
	}

	public async login(token: string) {
		this.token = token;
		// wip
	}

}
