import { WebSocketManager, WSOptions } from '@klasa/ws';
import { DeepRequired } from '@klasa/utils';
import { Cache } from '@klasa/cache';
import { ActionStore } from '../pieces/ActionStore';
import { BaseClient, BaseClientOptions } from './BaseClient';
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
import type { ActionOptions } from '../pieces/Action';
import type { EventOptions } from '../pieces/Event';
export interface ClientPieceOptions {
    defaults: PieceDefaults;
    createFolders: boolean;
    disabledCoreTypes: string[];
}
export interface PieceDefaults {
    /**
     * The default command options.
     * @default {}
     */
    actions?: Partial<ActionOptions>;
    /**
     * The default event options.
     * @default {}
     */
    events?: Partial<EventOptions>;
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
    limits: Partial<CacheLimits>;
    messageLifetime: number;
    messageSweepInterval: number;
}
export interface ClientOptions extends BaseClientOptions {
    ws?: Partial<WSOptions>;
    pieces?: Partial<ClientPieceOptions>;
    cache?: Partial<ClientCacheOptions>;
}
export declare const enum ClientEvents {
    ChannelCreate = "channelCreate",
    ChannelDelete = "channelDelete",
    ChannelPinsUpdate = "channelPinsUpdate",
    ChannelUpdate = "channelUpdate",
    Debug = "debug",
    Error = "error",
    EventError = "eventError",
    GuildAvailable = "guildAvailable",
    GuildBanAdd = "guildBanAdd",
    GuildBanRemove = "guildBanRemove",
    GuildCreate = "guildCreate",
    GuildDelete = "guildDelete",
    GuildEmojiCreate = "guildEmojiCreate",
    GuildEmojiDelete = "guildEmojiDelete",
    GuildEmojisUpdate = "guildEmojisUpdate",
    GuildEmojiUpdate = "guildEmojiUpdate",
    GuildIntegrationsUpdate = "guildIntegrationsUpdate",
    GuildMemberAdd = "guildMemberAdd",
    GuildMemberRemove = "guildMemberRemove",
    GuildMembersChunk = "guildMembersChunk",
    GuildMemberUpdate = "guildMemberUpdate",
    GuildRoleCreate = "guildRoleCreate",
    GuildRoleDelete = "guildRoleDelete",
    GuildRoleUpdate = "guildRoleUpdate",
    GuildUnavailable = "guildUnavailable",
    GuildUpdate = "guildUpdate",
    InviteCreate = "inviteCreate",
    InviteDelete = "inviteDelete",
    MessageCreate = "messageCreate",
    MessageDelete = "messageDelete",
    MessageDeleteBulk = "messageDeleteBulk",
    MessageReactionAdd = "messageReactionAdd",
    MessageReactionRemove = "messageReactionRemove",
    MessageReactionRemoveAll = "messageReactionRemoveAll",
    MessageReactionRemoveEmoji = "messageReactionRemoveEmoji",
    MessageUpdate = "messageUpdate",
    PresenceUpdate = "presenceUpdate",
    PieceDisabled = "pieceDisabled",
    PieceEnabled = "pieceEnabled",
    PieceLoaded = "pieceLoaded",
    PieceReloaded = "pieceReloaded",
    PieceUnloaded = "pieceUnloaded",
    Ready = "ready",
    RESTDebug = "restDebug",
    Resumed = "resumed",
    Ratelimited = "ratelimited",
    ShardOnline = "shardOnline",
    ShardReady = "shardReady",
    ShardResumed = "shardResumed",
    TypingStart = "typingStart",
    UserUpdate = "userUpdate",
    VoiceServerUpdate = "voiceServerUpdate",
    VoiceStateUpdate = "voiceStateUpdate",
    WebhooksUpdate = "webhooksUpdate",
    WSDebug = "wsDebug",
    WTF = "wtf"
}
/**
 * The Klasa-Core Client used to wrap the discord api
 */
export declare class Client extends BaseClient {
    /**
     * The WebSocket manager
     */
    ws: WebSocketManager;
    /**
     * The options to use for this client
     */
    options: DeepRequired<ClientOptions>;
    /**
     * The client user
     */
    user: ClientUser | null;
    /**
     * The {@link Channel channels} that have been cached, mapped by their {@link Channel#id IDs}.
     */
    readonly channels: ChannelStore;
    /**
     * The collection of {@link Guild guilds} the client is currently handling, mapped by their {@link Guild#id IDs}
     */
    readonly guilds: GuildStore;
    /**
     * The {@link User users} that have been cached, mapped by their {@link User#id IDs}.
     */
    readonly users: UserStore;
    /**
     * The {@link DMChannel DM channels} that have been cached, mapped by their {@link Channel#id IDs}.
     */
    readonly dms: DMChannelStore;
    /**
     * The {@link Invite invites} that have been cached, mapped by their codes.
     */
    readonly invites: InviteStore;
    /**
     * The directory where the user files are at.
     */
    userBaseDirectory: string;
    /**
     * The Store registry.
     */
    readonly pieceStores: Cache<string, Store<Piece>>;
    /**
     * The event store.
     */
    readonly events: EventStore;
    /**
     * The action store.
     */
    readonly actions: ActionStore;
    /**
     * The number of plugins loaded.
     */
    private pluginLoadedCount;
    /**
     * @param options All of your preferences on how Klasa-Core should work for you
     */
    constructor(options?: Partial<ClientOptions>);
    /**
     * Returns a new Cache of all guild emojis.
     * @since 0.0.1
     */
    get emojis(): Cache<string, GuildEmoji>;
    /**
     * Sets the token to use for the api.
     * @since 0.0.1
     */
    set token(token: string);
    /**
     * Registers a custom store to the client
     * @since 0.0.1
     * @param store The store that pieces will be stored in
     * @chainable
     */
    registerStore<V extends Piece>(store: Store<V>): this;
    /**
     * Un-registers a custom store from the client
     * @since 0.0.1
     * @param store The store that pieces will be stored in
     * @chainable
     */
    unregisterStore<V extends Piece>(store: Store<V>): this;
    /**
     * Connects the client to the websocket
     */
    connect(): Promise<void>;
    /**
     * Destroys all timers and disconnects all shards from the websocket
     */
    destroy(): Promise<void>;
    /**
     * Loads all plugins to your Client/Extended Client
     */
    protected loadPlugins(): void;
    /**
     * Sweeps all text-based channels' messages and removes the ones older than the max message or command message lifetime.
     * If the message has been edited, the time of the edit is used rather than the time of the original message.
     * @since 0.5.0
     * @param lifetime Messages that are older than this (in milliseconds)
     * will be removed from the caches. The default is based on {@link ClientOptions#messageLifetime}
     */
    protected _sweepMessages(lifetime?: number): number;
    /**
     * The plugin symbol to be used in external packages
     */
    static readonly plugin: unique symbol;
    /**
     * The plugins to be used when creating a Client instance
     */
    private static readonly plugins;
    /**
     * Caches a plugin module to be used when creating a Client instance
     * @param mod The module of the plugin to use
     */
    static use(mod: typeof Plugin): typeof Client;
}
export declare abstract class Plugin {
    static [Client.plugin]: (this: Client) => void;
}
