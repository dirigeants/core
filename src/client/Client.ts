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

	public options: ClientOptions;

	public constructor(options: Partial<ClientOptions>) {
		super();
		this.options = mergeDefault(ClientOptionsDefaults, options);
	}

	/**
	 * Logs this client into the api
	 * @param token The token to use to connect to the api with
	 */
	public async login(token: string): Promise<void> {
		this.rest = new RestManager(this, token);
		this.ws = new WebSocketManager(this, this.options.shards || 1, token);
	}

}
