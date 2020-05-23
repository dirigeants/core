import { WebSocketManager, WSOptions, WebSocketManagerEvents } from '@klasa/ws';
import { mergeDefault, DeepRequired } from '@klasa/utils';
import { Cache } from '@klasa/cache';
import { ActionStore } from '../pieces/ActionStore';
import { BaseClient, BaseClientOptions } from './BaseClient';
import { ClientOptionsDefaults } from '../util/Constants';
import { dirname, join } from 'path';
import { DMChannelStore } from '../caching/stores/DMChannelStore';
import { EventStore } from '../pieces/EventStore';
import { GuildStore } from '../caching/stores/GuildStore';
import { InviteStore } from '../caching/stores/InviteStore';
import { UserStore } from '../caching/stores/UserStore';
import { ChannelStore } from '../caching/stores/ChannelStore';

import type { Store } from '../pieces/base/Store';
import type { Piece } from '../pieces/base/Piece';
import type { ClientUser } from '../caching/structures/ClientUser';
import type { GuildEmoji } from '../caching/structures/guilds/GuildEmoji';

export interface ClientPieceOptions {
	createFolders: boolean;
	disabledCoreTypes: string[];
}

export interface CacheLimits {
	bans: number;
	channels: number;
	dms: number;
	emojis: number;
	guilds: number;
	integrations: number;
	invites: number;
	members: number;
	messages: number;
	overwrites: number;
	presences: number;
	reactions: number;
	roles: number;
	users: number;
	voiceStates: number;
}

export interface ClientCacheOptions {
	enabled: boolean;
	limits: CacheLimits;
	messageLifetime: number;
}

export interface ClientOptions extends BaseClientOptions {
	ws?: Partial<WSOptions>;
	pieces?: Partial<ClientPieceOptions>;
	cache?: Partial<ClientCacheOptions>;
}

export const enum ClientEvents {
	ChannelCreate = 'channelCreate',
	ChannelDelete = 'channelDelete',
	ChannelPinsUpdate = 'channelPinsUpdate',
	ChannelUpdate = 'channelUpdate',
	Debug = 'debug',
	Error = 'error',
	GuildBanAdd = 'guildBanAdd',
	GuildBanRemove = 'guildBanRemove',
	GuildCreate = 'guildCreate',
	GuildDelete = 'guildDelete',
	GuildEmojiCreate = 'guildEmojiCreate',
	GuildEmojiDelete = 'guildEmojiDelete',
	GuildEmojisUpdate = 'guildEmojisUpdate',
	GuildEmojiUpdate = 'guildEmojiUpdate',
	GuildIntegrationsUpdate = 'guildIntegrationsUpdate',
	GuildMemberAdd = 'guildMemberAdd',
	GuildMemberRemove = 'guildMemberRemove',
	GuildMembersChunk = 'guildMembersChunk',
	GuildMemberUpdate = 'guildMemberUpdate',
	GuildRoleCreate = 'guildRoleCreate',
	GuildRoleDelete = 'guildRoleDelete',
	GuildRoleUpdate = 'guildRoleUpdate',
	GuildUpdate = 'guildUpdate',
	InviteCreate = 'inviteCreate',
	InviteDelete = 'inviteDelete',
	MessageCreate = 'messageCreate',
	MessageDelete = 'messageDelete',
	MessageDeleteBulk = 'messageDeleteBulk',
	MessageReactionAdd = 'messageReactionAdd',
	MessageReactionRemove = 'messageReactionRemove',
	MessageReactionRemoveAll = 'messageReactionRemoveAll',
	MessageReactionRemoveEmoji = 'messageReactionRemoveEmoji',
	MessageUpdate = 'messageUpdate',
	PresenceUpdate = 'presenceUpdate',
	Ready = 'ready',
	RESTDebug = 'restDebug',
	Resumed = 'resumed',
	Ratelimited = 'ratelimited',
	ShardOnline = 'shardOnline',
	ShardReady = 'shardReady',
	ShardResumed = 'shardResumed',
	TypingStart = 'typingStart',
	UserUpdate = 'userUpdate',
	VoiceServerUpdate = 'voiceServerUpdate',
	VoiceStateUpdate = 'voiceStateUpdate',
	WebhooksUpdate = 'webhooksUpdate',
	WSDebug = 'wsDebug'
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
	public options: DeepRequired<ClientOptions>;

	/**
	 * The client user
	 */
	public user: ClientUser | null;

	/**
	 * The {@link Channel channels} that have been cached, mapped by their {@link Channel#id IDs}.
	 */
	public readonly channels: ChannelStore;

	/**
	 * The collection of {@link Guild guilds} the client is currently handling, mapped by their {@link Guild#id IDs}
	 */
	public readonly guilds: GuildStore;

	/**
	 * The {@link User users} that have been cached, mapped by their {@link User#id IDs}.
	 */
	public readonly users: UserStore;

	/**
	 * The {@link DMChannel DM channels} that have been cached, mapped by their {@link Channel#id IDs}.
	 */
	public readonly dms: DMChannelStore;

	/**
	 * The {@link Invite invites} that have been cached, mapped by their codes.
	 */
	public readonly invites: InviteStore;

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
		this.channels = new ChannelStore(this);
		this.users = new UserStore(this);
		this.guilds = new GuildStore(this);
		this.dms = new DMChannelStore(this);
		this.invites = new InviteStore(this);

		this.pieceStores = new Cache();
		this.events = new EventStore(this);
		this.actions = new ActionStore(this);

		this.registerStore(this.events)
			.registerStore(this.actions);

		const coreDirectory = join(__dirname, '../../');
		for (const store of this.pieceStores.values()) store.registerCoreDirectory(coreDirectory);

		for (const plugin of Client.plugins) plugin.call(this);
	}

	/**
	 * Returns a new Cache of all guild emojis.
	 * @since 0.0.1
	 */
	get emojis(): Cache<string, GuildEmoji> {
		return new Cache<string, GuildEmoji>().concat(...this.guilds.map(guild => guild.emojis));
	}

	/**
	 * Sets the token to use for the api.
	 * @since 0.0.1
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
