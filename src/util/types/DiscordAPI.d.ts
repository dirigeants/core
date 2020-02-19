// #region API Payloads
// (prefixed with API, suffix is Data for full payloads or Partial)

// #region Activity

/**
 * https://discordapp.com/developers/docs/topics/gateway#activity-object
 */
export interface APIActivityData {
	name: string;
	type: ActivityType;
	url?: string | null;
	created_at: number;
	timestamps?: APIActivityDataTimestamps[];
	application_id?: string;
	details?: string | null;
	state?: string | null;
	emoji?: APIActivityDataEmoji | null;
	party?: APIActivityDataParty;
	assets?: APIActivityDataAssets;
	secrets?: APIActivityDataSecrets;
	instance?: boolean;
	flags?: ActivityFlags;
}

/**
 * https://discordapp.com/developers/docs/topics/gateway#activity-object-activity-timestamps
 */
export interface APIActivityDataTimestamps {
	start?: number;
	end?: number;
}

/**
 * https://discordapp.com/developers/docs/topics/gateway#activity-object-activity-emoji
 */
export interface APIActivityDataEmoji {
	name: string;
	id?: string;
	animated?: boolean;
}

/**
 * https://discordapp.com/developers/docs/topics/gateway#activity-object-activity-party
 */
export interface APIActivityDataParty {
	id?: string;
	size?: [number, number];
}

/**
 * https://discordapp.com/developers/docs/topics/gateway#activity-object-activity-assets
 */
export interface APIActivityDataAssets {
	large_image?: string;
	large_text?: string;
	small_image?: string;
	small_text?: string;
}

/**
 * https://discordapp.com/developers/docs/topics/gateway#activity-object-activity-secrets
 */
export interface APIActivityDataSecrets {
	join?: string;
	spectate?: string;
	match?: string;
}

// #endregion Activity

// #region Audit Logs

/**
 * https://discordapp.com/developers/docs/resources/audit-log#audit-log-object
 */
export interface APIAuditLogData {
	webhooks: APIWebhookData[];
	users: APIUserData[];
	audit_log_entries: APIAuditLogEntryData[];
	integrations: Partial<APIIntegrationData>[];
}

/**
 * https://discordapp.com/developers/docs/resources/audit-log#audit-log-entry-object
 */
export interface APIAuditLogEntryData {
	target_id: string | null;
	changes?: APIAuditLogChangeData[];
	user_id: string;
	id: string;
	action_type: AuditLogEvent;
	options?: APIAuditLogOptionsData;
	reason?: string;
}

/**
 * https://discordapp.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-structure
 */
export interface APIAuditLogChangeData {
	new_value?: unknown;
	old_value?: unknown;
	key: string;
}

/**
 * https://discordapp.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info
 */
export interface APIAuditLogOptionsData {
	delete_member_days?: string;
	members_removed?: string;
	channel_id?: string;
	message_id?: string;
	count?: string;
	id?: string;
	type?: 'member' | 'role';
	role_name?: string;
}

// #endregion Audit Logs

// #region Bans

/**
 * https://discordapp.com/developers/docs/resources/guild#ban-object-ban-structure
 */
export interface APIBanData {
	reason: string | null;
	user: APIUserData;
}

// #endregion Bans

// #region Channels

/**
 * Not Documented, but partial only includes id, name, and type
 */
export interface APIChannelPartial {
	id: string;
	type: ChannelType;
	name?: string;
}

/**
 * https://discordapp.com/developers/docs/resources/channel#channel-object
 */
export interface APIChannelData extends APIChannelPartial {
	guild_id?: string;
	position?: number;
	permission_overwrites?: APIOverwriteData[];
	topic?: string | null;
	nsfw?: boolean;
	last_message_id?: string | null;
	bitrate?: number;
	user_limit?: number;
	rate_limit_per_user?: number;
	recipients?: APIUserData[];
	icon?: string | null;
	owner_id?: string;
	application_id?: string;
	parent_id?: string | null;
	last_pin_timestamp?: string;
}

// #endregion Channels

// #region Connections

/**
 * https://discordapp.com/developers/docs/resources/user#connection-object-connection-structure
 */
export interface APIConnectionData {
	id: string;
	name: string;
	type: string;
	revoked: boolean;
	integrations: APIIntegrationData[];
	verified: boolean;
	friend_sync: boolean;
	show_activity: boolean;
	visibility: ConnectionVisibility;
}

// #endregion Connections

// #region Embeds

/**
 * https://discordapp.com/developers/docs/resources/channel#embed-object
 */
export interface APIEmbedData {
	title?: string;
	type?: EmbedType;
	description?: string;
	url?: string;
	timestamp?: string;
	color?: number;
	footer?: APIEmbedFooterData;
	image?: APIEmbedImageData;
	thumbnail?: APIEmbedThumbnailData;
	video?: APIEmbedVideoData;
	provider?: APIEmbedProviderData;
	author?: APIEmbedAuthorData;
	fields?: APIEmbedFieldData[];
}

/**
 * https://discordapp.com/developers/docs/resources/channel#embed-object-embed-footer-structure
 */
export interface APIEmbedFooterData {
	text: string;
	icon_url?: string;
	proxy_icon_url?: string;
}

/**
 * https://discordapp.com/developers/docs/resources/channel#embed-object-embed-image-structure
 */
export interface APIEmbedImageData {
	url?: string;
	proxy_url?: string;
	height?: number;
	width?: number;
}

/**
 * https://discordapp.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure
 */
export interface APIEmbedThumbnailData {
	url?: string;
	proxy_url?: string;
	height?: number;
	width?: number;
}

/**
 * https://discordapp.com/developers/docs/resources/channel#embed-object-embed-video-structure
 */
export interface APIEmbedVideoData {
	url?: string;
	height?: number;
	width?: number;
}

/**
 * https://discordapp.com/developers/docs/resources/channel#embed-object-embed-provider-structure
 */
export interface APIEmbedProviderData {
	name?: string;
	url?: string;
}

/**
 * https://discordapp.com/developers/docs/resources/channel#embed-object-embed-author-structure
 */
export interface APIEmbedAuthorData {
	name?: string;
	url?: string;
	icon_url?: string;
	proxy_icon_url?: string;
}

/**
 * https://discordapp.com/developers/docs/resources/channel#embed-object-embed-field-structure
 */
export interface APIEmbedFieldData {
	name: string;
	value: string;
	inline?: boolean;
}

// #endregion Embeds

// #region Emojis

/**
 * Not Documented, but partial doesn't include roles, users, require_colons, or managed
 */
export interface APIEmojiPartial {
	id: string | null;
	name: string | null;
	animated?: boolean;
}

/**
 * https://discordapp.com/developers/docs/resources/emoji#emoji-object-emoji-structure
 */
export interface APIEmojiData extends APIEmojiPartial {
	roles?: string[];
	user?: APIUserData;
	require_colons?: boolean;
	managed?: boolean;
}

// #endregion Emojis

// #region Guilds

/**
 * Not Documented, but partial only includes id, name, icon, and splash
 */
export interface APIGuildPartial {
	id: string;
	name: string;
	icon: string | null;
	splash: string | null;
}

/**
 * https://discordapp.com/developers/docs/resources/guild#guild-object-guild-structure
 */
export interface APIGuildData extends APIGuildPartial {
	discovery_splash: string | null;
	owner?: boolean;
	owner_id: string;
	permissions?: number;
	region: string;
	afk_channel_id: string | null;
	afk_timeout: number;
	embed_enabled?: boolean;
	embed_channel_id?: string;
	verification_level: GuildVerificationLevel;
	default_message_notifications: GuildDefaultMessageNotifications;
	explicit_content_filter: GuildExplicitContentFilterLevel;
	roles: APIRoleData[];
	emojis: APIEmojiData[];
	features: string[];
	mfa_level: GuildMFALevel;
	application_id: string | null;
	widget_enabled?: boolean;
	widget_channel_id?: boolean;
	system_channel_id: string | null;
	system_channel_flags: GuildSystemChannelFlags;
	rules_channel_id: string | null;
	joined_at?: string;
	large?: boolean;
	unavailable?: boolean;
	member_count?: number;
	voice_states?: APIVoiceStatePartial[];
	members?: APIGuildMemberData[];
	channels?: APIChannelData[];
	presences?: APIPresenceUpdateData[];
	max_presences?: number | null;
	max_members?: number;
	vanity_url_code: string | null;
	description: string | null;
	banner: string | null;
	premium_tier: GuildPremiumTier;
	premium_subscription_count?: number;
	preferred_locale: string;
	public_updates_channel_id: string | null;
}

/**
 * https://discordapp.com/developers/docs/resources/guild#guild-embed-object-guild-embed-structure
 */
export interface APIGuildEmbedData {
	enabled: boolean;
	channel_id: string | null;
}

// #endregion Guilds

// #region Integrations

/**
 * https://discordapp.com/developers/docs/resources/guild#integration-object-integration-structure
 */
export interface APIIntegrationData {
	id: string;
	name: string;
	type: string;
	enabled: boolean;
	syncing: boolean;
	role_id: string;
	expire_behavior: number;
	expire_grace_period: number;
	user: APIUserData;
	account: APIIntegrationAccountData;
	synced_at: string;
}

/**
 * https://discordapp.com/developers/docs/resources/guild#integration-account-object
 */
export interface APIIntegrationAccountData {
	id: string;
	name: string;
}

// #endregion Integrations

// #region Invites

/**
 * https://discordapp.com/developers/docs/resources/invite#invite-object-invite-structure
 */
export interface APIInviteData {
	code: string;
	guild?: APIGuildPartial;
	channel: APIChannelPartial;
	inviter?: APIUserData;
	target_user?: APIUserData;
	target_user_type?: number;
	approximate_presence_count?: number;
	approximate_member_count?: number;
}

/**
 * https://discordapp.com/developers/docs/resources/invite#invite-metadata-object-invite-metadata-structure
 */
export interface APIInviteMetadataData {
	uses: number;
	max_uses: number;
	max_age: number;
	temporary: boolean;
	created_at: string;
}

// #endregion Invites

// #region Members

/**
 * Not Documented, but Partial packets only exclude the user property
 */
export interface APIGuildMemberPartial {
	nick?: string;
	roles: string[];
	joined_at: string;
	premium_since?: string | null;
	deaf: boolean;
	mute: boolean;
}

/**
 * https://discordapp.com/developers/docs/resources/guild#guild-member-object-guild-member-structure
 */
export interface APIGuildMemberData extends APIGuildMemberPartial {
	user: APIUserData;
}

// #endregion Members

// #region Messages

/**
 * https://discordapp.com/developers/docs/resources/channel#message-object-message-structure
 */
export interface APIMessageData {
	id: string;
	channel_id: string;
	guild_id?: string;
	author: APIUserData;
	member?: APIGuildMemberPartial;
	content: string;
	timestamp: string;
	edited_timestamp: string | null;
	tts: boolean;
	mention_everyone: boolean;
	mentions: (APIUserData | (APIUserData & APIGuildMemberPartial))[];
	mention_roles: string[];
	mention_channels: APIMessageMentionChannelData[];
	attachments: APIMessageAttachmentData[];
	embeds: APIEmbedData[];
	reactions?: APIReactionData[];
	nonce?: string | null;
	pinned: boolean;
	webhook_id?: string;
	type: MessageType;
	activity?: APIMessageActivityData;
	application?: APIMessageApplicationData;
	message_reference?: APIMessageReferenceData;
	flags?: MessageFlags;
}

/**
 * https://discordapp.com/developers/docs/resources/channel#attachment-object
 */
export interface APIMessageAttachmentData {
	id: string;
	filename: string;
	size: number;
	url: string;
	proxy_url: string;
	height: number | null;
	width: number | null;
}

/**
 * https://discordapp.com/developers/docs/resources/channel#message-object-message-activity-structure
 */
export interface APIMessageActivityData {
	type: MessageActivityType;
	party_id?: string;
}

/**
 * https://discordapp.com/developers/docs/resources/channel#message-object-message-application-structure
 */
export interface APIMessageApplicationData {
	id: string;
	cover_image?: string;
	description: string;
	icon: string | null;
	name: string;
}

/**
 * https://discordapp.com/developers/docs/resources/channel#message-object-message-reference-structure
 */
export interface APIMessageReferenceData {
	message_id?: string;
	channel_id: string;
	guild_id?: string;
}

/**
 * https://discordapp.com/developers/docs/resources/channel#channel-mention-object
 */
export interface APIMessageMentionChannelData {
	id: string;
	guild_id: string;
	type: ChannelType;
	name: string;
}

// #endregion Messages

// #region PermissionOverwrites

/**
 * https://discordapp.com/developers/docs/resources/channel#overwrite-object
 */
export interface APIOverwriteData {
	id: string;
	type: 'role' | 'member';
	allow: number;
	deny: number;
}

// #endregion PermissionOverwrites

// #region Presence

/**
 * https://discordapp.com/developers/docs/topics/gateway#presence-update
 */
export interface APIPresenceUpdateData {
	user: APIUserData;
	roles: string[];
	game: APIActivityData | null;
	guild_id: string;
	status: PresenceUpdateStatus;
	activities: APIActivityData[];
	client_status: APIClientStatusData;
	premium_since?: string | null;
	nick?: string | null;
}

/**
 * https://discordapp.com/developers/docs/topics/gateway#client-status-object
 */
export type APIClientStatusData = Partial<Record<'desktop' | 'mobile' | 'web', PresenceUpdateStatus>>

// #endregion Presence

// #region Reactions

/**
 * https://discordapp.com/developers/docs/resources/channel#reaction-object
 */
export interface APIReactionData {
	count: number;
	me: boolean;
	emoji: APIEmojiPartial;
}

// #endregion Reactions

// #region Roles

/**
 * https://discordapp.com/developers/docs/topics/permissions#role-object
 */
export interface APIRoleData {
	id: string;
	name: string;
	color: number;
	hoist: boolean;
	position: number;
	permissions: number;
	managed: boolean;
	mentionable: boolean;
}

// #endregion Roles

// #region Users

/**
 * https://discordapp.com/developers/docs/resources/user#user-object
 */
export interface APIUserData {
	id: string;
	username: string;
	discriminator: string;
	avatar: string | null;
	bot?: boolean;
	system?: boolean;
	mfa_enabled?: boolean;
	locale?: string;
	verified?: boolean;
	email?: string;
	flags?: UserFlags;
	premium_type?: PremiumType;
}

// #endregion Users

// #region Voice

/**
 * Not Documented, but partial doesn't include guild_id or member
 */
export interface APIVoiceStatePartial {
	channel_id: string | null;
	user_id: string;
	session_id: string;
	deaf: boolean;
	mute: boolean;
	self_deaf: boolean;
	self_mute: boolean;
	self_stream?: boolean;
	suppress: boolean;
}

/**
 * https://discordapp.com/developers/docs/resources/voice#voice-state-object
 */
export interface APIVoiceStateData extends APIVoiceStatePartial {
	guild_id?: string;
	member?: APIGuildMemberData;
}

/**
 * https://discordapp.com/developers/docs/resources/voice#voice-region-object-voice-region-structure
 */
export interface APIVoiceRegionData {
	id: string;
	name: string;
	vip: boolean;
	optional: boolean;
	deprecated: boolean;
	custom: boolean;
}

// #endregion Voice

// #region Webhooks

/**
 * https://discordapp.com/developers/docs/resources/webhook#webhook-object-webhook-structure
 */
export interface APIWebhookData {
	id: string;
	type: WebhookType;
	guild_id?: string;
	channel_id: string;
	user?: APIUserData;
	name: string | null;
	avatar: string | null;
	token?: string;
}

// #endregion Webhooks

// #endregion API Payloads

// #region Enums

/**
 * https://discordapp.com/developers/docs/topics/gateway#activity-object-activity-flags
 */
export const enum ActivityFlags {
	Instance = 1 << 0,
	Join = 1 << 1,
	Spectate = 1 << 2,
	JoinRequest = 1 << 3,
	Sync = 1 << 4,
	Play = 1 << 5
}

/**
 * https://discordapp.com/developers/docs/resources/user#connection-object-visibility-types
 */
export const enum ConnectionVisibility {
	None,
	Everyone
}

/**
 * https://discordapp.com/developers/docs/resources/channel#message-object-message-types
 */
export const enum MessageType {
	Default,
	RecipientAdd,
	RecipientRemove,
	Call,
	ChannelNameChange,
	ChannelIconChange,
	ChannelPinnedMessage,
	GuildMemberJoin,
	UserPremiumGuildSubscription,
	UserPremiumGuildSubscriptionTier1,
	UserPremiumGuildSubscriptionTier2,
	UserPremiumGuildSubscriptionTier3,
	ChannelFollowAdd
}

/**
 * https://discordapp.com/developers/docs/resources/channel#message-object-message-activity-types
 */
export const enum MessageActivityType {
	Join = 1,
	Spectate,
	Listen,
	JoinRequest
}

/**
 * https://discordapp.com/developers/docs/resources/channel#message-object-message-flags
 */
export const enum MessageFlags {
	Crossposted = 1 << 0,
	IsCrosspost = 1 << 1,
	SuppressEmbeds = 1 << 2,
	SourceMessageDeleted = 1 << 3,
	Urgent = 1 << 4
}

/**
 * https://discordapp.com/developers/docs/resources/guild#guild-object-default-message-notification-level
 */
export const enum GuildDefaultMessageNotifications {
	AllMessages,
	OnlyMentions
}

/**
 * https://discordapp.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level
 */
export const enum GuildExplicitContentFilterLevel {
	Disabled,
	MembersWithoutRoles,
	AllMembers
}

/**
 * https://discordapp.com/developers/docs/resources/guild#guild-object-mfa-level
 */
export const enum GuildMFALevel {
	None,
	Elevated
}

/**
 * https://discordapp.com/developers/docs/resources/guild#guild-object-verification-level
 */
export const enum GuildVerificationLevel {
	None,
	Low,
	Medium,
	High,
	VeryHigh
}

/**
 * https://discordapp.com/developers/docs/resources/guild#guild-object-system-channel-flags
 */
export const enum GuildSystemChannelFlags {
	SuppressJoinNotifications = 1 << 0,
	SuppressPremiumSubscriptions = 1 << 1
}

/**
 * https://discordapp.com/developers/docs/resources/guild#guild-object-premium-tier
 */
export const enum GuildPremiumTier {
	None,
	Tier1,
	Tier2,
	Tier3
}

/**
 * https://discordapp.com/developers/docs/resources/channel#channel-object-channel-types
 */
export const enum ChannelType {
	GuildText,
	DM,
	GuildVoice,
	GroupDM,
	GuildCategory,
	// According to Discords Dev Docs it's GUILD_NEWS, but according to the client it's Announcement Channels
	GuildAnnouncement,
	GuildStore,
}

/**
 * https://discordapp.com/developers/docs/topics/gateway#activity-object-activity-types
 */
export const enum PresenceUpdateStatus {
	Idle = 'idle',
	DnD = 'dnd',
	Online = 'online',
	Offline = 'offline'
}

/**
 * https://discordapp.com/developers/docs/topics/gateway#activity-object-activity-types
 */
export const enum ActivityType {
	Game,
	Streaming,
	Listening,
	CustomStatus = 4
}

/**
 * https://discordapp.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events
 */
export const enum AuditLogEvent {
	GuildUpdate = 1,
	ChannelCreate = 10,
	ChannelUpdate = 11,
	ChannelDelete = 12,
	ChannelOverwriteCreate = 13,
	ChannelOverwriteUpdate = 14,
	ChannelOverwriteDelete = 15,
	MemberKick = 20,
	MemberPrune = 21,
	MemberBanAdd = 22,
	MemberBanRemove = 23,
	MemberUpdate = 24,
	MemberRoleUpdate = 25,
	MemberMode = 26,
	MemberDisconnect = 27,
	BotAdd = 28,
	RoleCreate = 30,
	RoleUpdate = 31,
	RoleDelete = 32,
	InviteCreate = 40,
	InviteUpdate = 41,
	InviteDelete = 42,
	WebhookCreate = 50,
	WebhookUpdate = 51,
	WebhookDelete = 52,
	EmojiCreate = 60,
	EmojiUpdate = 61,
	EmojiDelete = 62,
	MessageDelete = 72,
	MessageBulkDelete = 73,
	MessagePin = 74,
	MessageUnPin = 75,
	IntegrationCreate = 80,
	IntegrationUpdate = 81,
	IntegrationDelete = 82
}

/**
 * https://discordapp.com/developers/docs/resources/user#user-object-user-flags
 */
export const enum UserFlags {
	Employee = 1 << 0,
	Partner = 1 << 1,
	HypeSquadEvents = 1 << 2,
	BugHunterLevel1 = 1 << 3,
	HypeSquadHouseBravery = 1 << 6,
	HypeSquadHouseBrilliance = 1 << 7,
	HypeSquadHouseBalance = 1 << 8,
	EarlySupporter = 1 << 9,
	TeamUser = 1 << 10,
	System = 1 << 12,
	BugHunterTier2 = 1 << 14
}

/**
 * https://discordapp.com/developers/docs/resources/user#user-object-premium-types
 */
export const enum PremiumType {
	NitroClassic = 1,
	Nitro
}

/**
 * https://discordapp.com/developers/docs/resources/webhook#webhook-object-webhook-types
 */
export const enum WebhookType {
	Incoming = 1,
	ChannelFollower
}

// #endregion Enums

// #region Types
export type EmbedType = 'link' | 'rich' | 'image' | 'video' | 'gifv' | 'article' | 'application_news';
// #endregion Types
