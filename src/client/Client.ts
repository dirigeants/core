import EventEmitter from '../util/EventEmitter';
import RestManager from './rest/RestManager';
import Router from './rest/Router';
import WebsocketManager from './ws/WebSocketManager';

interface IClientOptions {
	shards?: number | Array<number>;
}

@EventEmitter
export default class Client {

	public ws: WebsocketManager;
	public options: IClientOptions;
	public rest: RestManager;
	private token: string;

	public constructor(options: IClientOptions) {
		this.options = options;
		this.ws = new WebsocketManager(this, options.shards);
		this.rest = new RestManager(this);
	}

	public get api(): Router {
		return new Router(this);
	}

	public async login(token: string) {
		this.token = token;
		// wip
	}

}
