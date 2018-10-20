import EventEmitter from '../util/EventEmitter';
import RestManager from './rest/RestManager';
import Router from './rest/Router';
import WebsocketManager from './ws/WebSocketManager';

export interface ClientOptions {
	shards?: number | Array<number>;
}

@EventEmitter
export default class Client {

	public get api(): Router {
		return new Router(this);
	}

	public ws: WebsocketManager;
	public options: ClientOptions;
	public rest: RestManager;
	private token: string;

	public constructor(options: ClientOptions) {
		this.options = options;
		this.ws = new WebsocketManager(this, options.shards);
		this.rest = new RestManager(this);
	}

	public async login(token: string) {
		this.token = token;
		// wip
	}

}
