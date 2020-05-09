import { mergeDefault } from '@klasa/utils';
import { WebSocketManager, WSOptions, WebSocketManagerEvents } from '@klasa/ws';

import type { Store } from '../lib/structures/base/Store';
import type { Piece } from '../lib/structures/base/Piece';
import { BaseClient, BaseClientOptions } from './BaseClient';
import { ClientOptionsDefaults } from '../util/Constants';
import { dirname, join } from 'path';
import { Cache } from '@klasa/cache';

export interface ClientOptions extends BaseClientOptions {
	ws?: Partial<WSOptions>;
	createPiecesFolders?: boolean;
	disabledCorePieces?: string[];
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

	/**
	 * The directory where the user files are at.
	 */
	public userBaseDirectory = dirname((require.main as NodeJS.Module).filename);

	/**
	 * The story registry.
	 */
	public pieceStores = new Cache<string, Store<Piece>>();

	/**
	 * @param options All of your preferences on how Project-Blue should work for you
	 */
	public constructor(options: Partial<ClientOptions>) {
		super(options);
		this.options = mergeDefault(ClientOptionsDefaults, options);
		this.ws = new WebSocketManager(this.api, this.options.ws)
			.on(WebSocketManagerEvents.Debug, this.emit.bind(this, WebSocketManagerEvents.ClientWSDebug));

		const coreDirectory = join(__dirname, '../');
		for (const store of this.pieceStores.values()) store.registerCoreDirectory(coreDirectory);
	}

	/**
	 * Sets the token to use for the api.
	 */
	set token(token: string) {
		super.token = token;
		this.ws.token = token;
	}

	/**
	 * Registers a custom store to the client
	 * @since 0.0.1
	 * @param {Store} store The store that pieces will be stored in
	 * @returns {this}
	 * @chainable
	 */
	public registerStore<V extends Piece>(store: Store<V>): this {
		this.pieceStores.set(store.name, store);
		return this;
	}

	/**
	 * Un-registers a custom store from the client
	 * @since 0.0.1
	 * @param {Store} storeName The store that pieces will be stored in
	 * @returns {this}
	 * @chainable
	 */
	public unregisterStore<V extends Piece>(store: Store<V>): this {
		this.pieceStores.delete(store.name);
		return this;
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
