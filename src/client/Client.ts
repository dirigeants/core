import { mergeDefault } from '@klasa/utils';
import { WebSocketManager, WSOptions, WebSocketManagerEvents } from '@klasa/ws';

import { BaseClient, BaseClientOptions } from './BaseClient';
import { ClientOptionsDefaults } from '../util/Constants';
import { UserStore } from './caching/stores/UserStore';

export interface ClientOptions extends BaseClientOptions {
	ws: Partial<WSOptions>;
}

/**
 * The Project-Blue Client used to wrap the discord api
 */
export class Client extends BaseClient {

	/**
	 * The WebSocket manager
	 */
	public ws: WebSocketManager;

	/**
	 * The options to use for this client
	 */
	public options: Required<ClientOptions>;

	public users: UserStore;

	/**
	 * @param options All of your preferences on how Project-Blue should work for you
	 */
	public constructor(options: Partial<ClientOptions>) {
		super(options);
		this.options = mergeDefault(ClientOptionsDefaults, options);
		this.ws = new WebSocketManager(this.api, this.options.ws)
			.on(WebSocketManagerEvents.Debug, this.emit.bind(this, WebSocketManagerEvents.ClientWSDebug));

		this.users = new UserStore(this);
	}

	/**
	 * Sets the token to use for the api.
	 */
	set token(token: string) {
		super.token = token;
		this.ws.token = token;
	}

	/**
	 * Connects the client to the websocket
	 */
	public async connect(): Promise<void> {
		try {
			await this.ws.spawn();
		} catch (err) {
			await this.destroy();
			throw err;
		}
	}

	/**
	 * Destroys all timers and disconnects all shards from the websocket
	 */
	public async destroy(): Promise<void> {
		await super.destroy();
		this.ws.destroy();
	}

}
