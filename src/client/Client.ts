import { EventEmitter } from 'events';
import { Router } from './rest/Router';
import { WebSocketManager } from './ws/WebSocketManager';
import { mergeDefault } from '@klasa/utils';
import { ClientOptionsDefaults } from '../util/Constants';
import { TimerManager } from '../util/TimerManager';
import { RestOptions } from './rest/RestManager';

export interface ClientOptions {
	shards: number | number[];
	rest: RestOptions;
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
	public ws: WebSocketManager;

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
		this.api = new Router(this.options.rest);
		this.ws = new WebSocketManager(this.api, this.options.shards);
	}

	/**
	 * Connects the client to the websocket
	 */
	public async connect(): Promise<void> {
		// todo: Not ready yet
		// this.ws.spawn();
	}

	/**
	 * Destroys all timers and disconnects all shards from the websocket
	 */
	public async destroy(): Promise<void> {
		TimerManager.destroy();
		// todo: Not ready yet
		// await this.ws.despawn();
	}

}
