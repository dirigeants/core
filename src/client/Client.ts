import { EventEmitter } from 'events';
import { RestManager } from './rest/RestManager';
import { Router } from './rest/Router';
import { WebSocketManager } from './ws/WebSocketManager';
import { mergeDefault } from '@klasa/utils';
import { ClientOptionsDefaults } from '../util/Constants';

export interface ClientOptions {
	shards: number | number[];
	rest: RestOptions;
}

export interface RestOptions {
	offset: number;
	retryLimit: number;
	timeout: number;
	version: number;
	api: string;
}

/**
 * The Project-Blue Client used to wrap the discord api
 */
export class Client extends EventEmitter {

	/**
	 * The api router
	 */
	public api: Router;

	/**
	 * The WebSocket manager
	 */
	public ws: WebSocketManager | null = null;

	/**
	 * The rest api manager
	 */
	public rest: RestManager | null = null;

	/**
	 * The options to use for this client
	 */
	public options: ClientOptions;

	/**
	 * @param options All of your preferences on how Project-Blue should work for you
	 */
	public constructor(options: Partial<ClientOptions>) {
		super();
		this.options = mergeDefault(ClientOptionsDefaults, options);
		this.api = new Router(this);
	}

	/**
	 * Logs this client into the api
	 * @param token The token to use to connect to the api with
	 */
	public async login(token: string): Promise<void> {
		this.rest = new RestManager(this, token);
		this.ws = new WebSocketManager(this, this.options.shards, token);
	}

}
