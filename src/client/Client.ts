import { WebSocketManager, WSOptions, WebSocketManagerEvents } from '@klasa/ws';
import { mergeDefault } from '@klasa/utils';
import { Cache } from '@klasa/cache';
import { dirname, join } from 'path';
import { BaseClient, BaseClientOptions } from './BaseClient';
import { ClientOptionsDefaults } from '../util/Constants';
import { UserStore } from './caching/stores/UserStore';
import { DMChannelStore } from './caching/stores/DMChannelStore';
import { GuildStore } from './caching/stores/GuildStore';
import { EventStore } from '../lib/structures/EventStore';
import { ActionStore } from '../lib/structures/ActionStore';
import { ClientEvents } from '../util/types/Util';

import type { Store } from '../lib/structures/base/Store';
import type { Piece } from '../lib/structures/base/Piece';
import type { ClientUser } from './caching/structures/ClientUser';

export interface PieceOptions {
	createFolders: boolean;
	disabledCoreTypes: string[];
}

export interface ClientOptions extends BaseClientOptions {
	ws?: Partial<WSOptions>;
	pieces?: PieceOptions;
	caching?: boolean;
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
	 * The client user
	 */
	public user: ClientUser | null;

	/**
	 * The collection of {@link Guild guilds} the client is currently handling, mapped by their {@link Guild#id IDs}
	 */
	public readonly guilds: GuildStore;

	/**
	 * The {@link User users} that have been cached, mapped by their {@link User#id IDs}.
	 */
	public readonly users: UserStore;

	/**
	 * The {@link DMChannel DM channels} that have bee ncached, mapped by their {@link Channel#id IDs}.
	 */
	public readonly dms: DMChannelStore;

	/**
	 * The directory where the user files are at.
	 */
	public userBaseDirectory = dirname((require.main as NodeJS.Module).filename);

	/**
	 * The Store registry.
	 */
	public readonly pieceStores: Cache<string, Store<Piece>>;

	/**
	 * The event store.
	 */
	public readonly events: EventStore;

	/**
	 * The action store.
	 */
	public readonly actions: ActionStore;

	/**
	 * @param options All of your preferences on how Project-Blue should work for you
	 */
	public constructor(options: Partial<ClientOptions> = {}) {
		super(options);
		this.options = mergeDefault(ClientOptionsDefaults, options);
		this.ws = new WebSocketManager(this.api, this.options.ws)
			.on(WebSocketManagerEvents.Debug, this.emit.bind(this, ClientEvents.WSDebug));
		this.user = null;
		this.users = new UserStore(this);
		this.guilds = new GuildStore(this);
		this.dms = new DMChannelStore(this);

		this.pieceStores = new Cache();
		this.events = new EventStore(this);
		this.actions = new ActionStore(this);

		this.registerStore(this.events)
			.registerStore(this.actions);

		const coreDirectory = join(__dirname, '../');
		for (const store of this.pieceStores.values()) store.registerCoreDirectory(coreDirectory);

		for (const plugin of Client.plugins) plugin.call(this);
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
	 * @param store The store that pieces will be stored in
	 * @chainable
	 */
	public registerStore<V extends Piece>(store: Store<V>): this {
		this.pieceStores.set(store.name, store);
		return this;
	}

	/**
	 * Un-registers a custom store from the client
	 * @since 0.0.1
	 * @param store The store that pieces will be stored in
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
		await Promise.all(this.pieceStores.map(store => store.loadAll()));
		try {
			await this.ws.spawn();
		} catch (err) {
			await this.destroy();
			throw err;
		}
		await Promise.all(this.pieceStores.map(store => store.init()));
	}

	/**
	 * Destroys all timers and disconnects all shards from the websocket
	 */
	public async destroy(): Promise<void> {
		await super.destroy();
		this.ws.destroy();
	}

	/**
	 * The plugin symbol to be used in external packages
	 */
	public static readonly plugin: unique symbol = Symbol('ProjectBluePlugin');

	/**
	 * The plugins to be used when creating a Client instance
	 */
	private static readonly plugins = new Set<Function>();

	/**
	 * Caches a plugin module to be used when creating a Client instance
	 * @param mod The module of the plugin to use
	 */
	public static use(mod: Plugin): typeof Client {
		const plugin = mod[Client.plugin];
		if (typeof plugin !== 'function') throw new TypeError('The provided module does not include a plugin function');
		Client.plugins.add(plugin);
		return Client;
	}

}

export interface Plugin {
	[Client.plugin]: Function;
}
