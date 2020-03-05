import {
	APIChannelData,
	APIEmojiData,
	APIEmojiPartial,
	APIGuildData,
	APIGuildMemberData,
	APIGuildUnavailable,
	APIMessageData,
	APIPresenceUpdateData,
	APIRoleData,
	APIUserData,
	APIVoiceStateData,
	APIActivityData,
} from './DiscordAPI';
import { WSOptions } from '../../client/ws/WebSocketManager';

export const enum WebSocketManagerEvents {
	Debug = 'debug',
	ShardOnline = 'shardOnline',

	ClientWSDebug = 'wsDebug',
}

export const enum InternalActions {
	Debug = 'DEBUG',
	Dispatch = 'DISPATCH',
	Identify = 'IDENTIFY',
	UpdatePing = 'UPDATE_PING',
	ScheduleIdentify = 'SCHEDULE_IDENTIFY',
	GatewayStatus = 'GATEWAY_STATUS',
	CannotReconnect = 'CANNOT_RECONNECT',
}

export const enum WSCloseCodes {
	UnknownError = 4000,
	UnknownOpCode,
	DecodeError,
	NotAuthenticated,
	AuthenticationFailed,
	AlreadyAuthenticated,
	InvalidSeq = 4007,
	RateLimited,
	SessionTimeout,
	InvalidShard,
	ShardingRequired,
	InvalidVersion,
	InvalidIntents,
	DisallowedIntents,
}

export const enum OpCodes {
	DISPATCH = 0,
	HEARTBEAT = 1,
	IDENTIFY = 2,
	STATUS_UPDATE = 3,
	VOICE_STATE_UPDATE = 4,
	RESUME = 6,
	RECONNECT = 7,
	REQUEST_GUILD_MEMBERS = 8,
	INVALID_SESSION = 9,
	HELLO = 10,
	HEARTBEAT_ACK = 11.
}

export const enum WebSocketEvents {
	Ready                    = 'READY',
	Resumed                  = 'RESUMED',
	ChannelCreate            = 'CHANNEL_CREATE',
	ChannelUpdate            = 'CHANNEL_UPDATE',
	ChannelDelete            = 'CHANNEL_DELETE',
	ChannelPinsUpdate        = 'CHANNEL_PINS_UPDATE',
	GuildCreate              = 'GUILD_CREATE',
	GuildUpdate              = 'GUILD_UPDATE',
	GuildDelete              = 'GUILD_DELETE',
	GuildBanAdd              = 'GUILD_BAN_ADD',
	GuildBanRemove           = 'GUILD_BAN_REMOVE',
	GuildEmojisUpdate        = 'GUILD_EMOJIS_UPDATE',
	GuildIntegrationsUpdate  = 'GUILD_INTEGRATION_SUPDATE',
	GuildMemberAdd           = 'GUILD_MEMBER_ADD',
	GuildMemberRemove        = 'GUILD_MEMBER_REMOVE',
	GuildMemberUpdate        = 'GUILD_MEMBER_UPDATE',
	GuildMembersChunk        = 'GUILD_MEMBERS_CHUNK',
	GuildRoleCreate          = 'GUILD_ROLE_CREATE',
	GuildRoleUpdate          = 'GUILD_ROLE_UPDATE',
	GuildRoleDelete          = 'GUILD_ROLE_DELETE',
	MessageCreate            = 'MESSAGE_CREATE',
	MessageUpdate            = 'MESSAGE_UPDATE',
	MessageDelete            = 'MESSAGE_DELETE',
	MessageDeleteBulk        = 'MESSAGE_DELETE_BULK',
	MessageReactionAdd       = 'MESSAGE_REACTION_ADD',
	MessageReactionRemove    = 'MESSAGE_REACTION_REMOVE',
	MessageReactionRemoveAll = 'MESSAGE_REACTION_REMOVE_ALL',
	PresenceUpdate           = 'PRESENCE_UPDATE',
	TypingStart              = 'TYPING_START',
	UserUpdate               = 'USER_UPDATE',
	VoiceStateUpdate         = 'VOICE_STATE_UPDATE',
	VoiceServerUpdate        = 'VOICE_SERVER_UPDATE',
	WebhooksUpdate           = 'WEBHOOKS_UPDATE',
}

export type WSPayload = HelloPayload | Heartbeat | HeartbeatAck | InvalidSession | Reconnect | DispatchPayload;
export type SendPayload = WSHeartbeat | Identify | StatusUpdate | VoiceStateUpdate | Resume | RequestGuildMembers;

// #region Basic payloads
export interface HelloPayload extends BasePayload {
	op: OpCodes.HELLO;
	t: never;
	d: {
		heartbeat_interval: number;
	};
}

export interface Heartbeat extends BasePayload {
	op: OpCodes.HEARTBEAT;
	t: never;
	d: never;
}

export interface HeartbeatAck extends BasePayload {
	op: OpCodes.HEARTBEAT_ACK;
	t: never;
	d: never;
}

export interface InvalidSession extends BasePayload {
	op: OpCodes.INVALID_SESSION;
	t: never;
	d: boolean;
}

export interface Reconnect extends BasePayload {
	op: OpCodes.RECONNECT;
	t: never;
	d: never;
}
// #endregion Basic payloads

// #region Dispatch
type DispatchPayload =
	DataPayload<WebSocketEvents.Ready, {
		v: number;
		user_settings: {};
		user: APIUserData;
		session_id: string;
		relationships: [],
		private_channels: [];
		presences: [];
		guilds: APIGuildUnavailable[];
		shard?: [number, number];
	}>
	| DataPayload<WebSocketEvents.Resumed, never>
	| DataPayload<WebSocketEvents.ChannelCreate | WebSocketEvents.ChannelDelete | WebSocketEvents.ChannelUpdate, APIChannelData>
	| DataPayload<WebSocketEvents.ChannelPinsUpdate, {
		guild_id?: string;
		channel_id: string;
		last_pin_timestamp?: string;
	}>
	| DataPayload<WebSocketEvents.GuildCreate | WebSocketEvents.GuildUpdate, APIGuildData>
	| DataPayload<WebSocketEvents.GuildDelete, APIGuildUnavailable>
	| DataPayload<WebSocketEvents.GuildBanAdd | WebSocketEvents.GuildBanRemove, {
		guild_id: string;
		user: APIUserData;
	}>
	| DataPayload<WebSocketEvents.GuildEmojisUpdate, {
		guild_id: string;
		emojis: APIEmojiData[];
	}>
	| DataPayload<WebSocketEvents.GuildIntegrationsUpdate, { guild_id: string; }>
	| DataPayload<WebSocketEvents.GuildMemberAdd, APIGuildMemberData & { guild_id: string; }>
	| DataPayload<WebSocketEvents.GuildMemberRemove, {
		guild_id: string;
		user: APIUserData;
	}>
	| DataPayload<WebSocketEvents.GuildMemberUpdate, {
		guild_id: string;
		roles: string[];
		user: APIUserData;
		nick: string | null;
		premium_since: string | null;
	}>
	| DataPayload<WebSocketEvents.GuildMembersChunk, {
		guild_id: string;
		members: APIGuildMemberData[];
		not_found?: unknown[];
		presences?: APIPresenceUpdateData[];
	}>
	| DataPayload<WebSocketEvents.GuildRoleCreate | WebSocketEvents.GuildRoleUpdate, {
		guild_id: string;
		role: APIRoleData;
	}>
	| DataPayload<WebSocketEvents.GuildRoleDelete, {
		guild_id: string;
		role_id: string;
	}>
	| DataPayload<WebSocketEvents.MessageCreate, APIMessageData>
	| DataPayload<WebSocketEvents.MessageUpdate, { id: string; channel_id: string; } & Partial<APIMessageData>>
	| DataPayload<WebSocketEvents.MessageDelete, {
		id: string;
		channel_id: string;
		guild_id?: string;
	}>
	| DataPayload<WebSocketEvents.MessageDeleteBulk, {
		ids: string[];
		channel_id: string;
		guild_id?: string;
	}>
	| ReactionData<WebSocketEvents.MessageReactionAdd>
	| Omit<ReactionData<WebSocketEvents.MessageReactionRemove>, 'members'>
	| DataPayload<WebSocketEvents.MessageReactionRemoveAll, {
		channel_id: string;
		message_id: string;
		guild_id?: string;
	}>
	| DataPayload<WebSocketEvents.PresenceUpdate, APIPresenceUpdateData>
	| DataPayload<WebSocketEvents.TypingStart, {
		channel_id: string;
		guild_id?: string;
		user_id: string;
		timestamp: number;
		member?: APIGuildMemberData;
	}>
	| DataPayload<WebSocketEvents.UserUpdate, APIUserData>
	| DataPayload<WebSocketEvents.VoiceStateUpdate, APIVoiceStateData>
	| DataPayload<WebSocketEvents.VoiceServerUpdate, {
		token: string;
		guild_id: string;
		endpoint: string;
	}>
	| DataPayload<WebSocketEvents.WebhooksUpdate, {
		guild_id: string;
		channel_id: string;
	}>
;

// #endregion Dispatch

// #region Sendables
interface WSHeartbeat {
	op: OpCodes.HEARTBEAT;
	d: number;
}

interface Identify {
	op: OpCodes.IDENTIFY;
	d: {
		token: string;
		properties: {
			$os: string;
			$browser: string;
			device: string;
		};
		large_threshold?: number;
		shard?: [number, number];
		presence?: StatusUpdateData;
		intents?: number;
	};
}

interface Resume {
	op: OpCodes.RESUME;
	d: {
		token: string;
		session_id: string;
		seq: number;
	};
}

interface RequestGuildMembers {
	op: OpCodes.REQUEST_GUILD_MEMBERS;
	d: {
		guild_id: string | string[];
		query?: string;
		limit: number;
		presences?: boolean;
		user_ids?: string | string[];
	};
}

interface VoiceStateUpdate {
	op: OpCodes.VOICE_STATE_UPDATE;
	d: {
		guild_id: string;
		channel_id: string | null;
		self_mute: boolean;
		self_deaf: boolean;
	};
}

interface StatusUpdate {
	op: OpCodes.STATUS_UPDATE;
	d: StatusUpdateData;
}
// #endregion Sendables

// #region Misc
interface BasePayload {
	op: OpCodes;
	s: number;
	d?: unknown;
	t?: string;
}

interface DataPayload<Event extends WebSocketEvents, D = unknown> extends BasePayload {
	op: OpCodes.DISPATCH;
	t: Event;
	d: D;
	// Internal to Project Blue
	shard_id: number;
}

type ReactionData<E extends WebSocketEvents> = DataPayload<E, {
	user_id: string;
	channel_id: string;
	message_id: string;
	guild_id?: string;
	member?: APIGuildMemberData;
	emoji: APIEmojiPartial;
}>

interface StatusUpdateData {
	since: number | null;
	game: APIActivityData | null;
	status: 'online' | 'dnd' | 'idle' | 'invisible' | 'offline';
	afk: boolean;
}

interface WSIdentify {
	properties: {
		$os: string,
		$browser: string,
		device: string
	},
	large_threshold?: number,
	shard?: [number, number],
	presence?: StatusUpdateData,
	intents?: number
}
// #endregion Misc

// #region InternalWS
export type WorkerMasterMessages = {
	type: InternalActions.Debug;
	data: string;
} | {
	type: InternalActions.Dispatch;
	data: DispatchPayload;
} | {
	type: InternalActions.Identify;
} | {
	type: InternalActions.UpdatePing;
	data: number;
} | {
	type: InternalActions.ScheduleIdentify;
} | {
	type: InternalActions.GatewayStatus;
	data: GatewayStatus;
} | {
	type: InternalActions.CannotReconnect,
	data: {
		code: number;
		reason: string;
	};
};

export type MasterWorkerMessages = {
	type: InternalActions.Identify;
};

export interface WSWorkerData {
	gatewayURL: string;
	gatewayVersion: number;
	token: string;
	options: Required<WSOptions>;
}

export const enum GatewayStatus {
	Ready,
	InvalidSession,
}
// #endregion
