import { WebSocketShard } from '@klasa/ws';
import { RequestOptions } from '@klasa/rest';
import { BanStore } from '../../stores/BanStore';
import { GuildChannelStore } from '../../stores/GuildChannelStore';
import { GuildEmojiStore } from '../../stores/GuildEmojiStore';
import { GuildInviteStore } from '../../stores/GuildInviteStore';
import { GuildMemberStore } from '../../stores/GuildMemberStore';
import { GuildWidget } from './GuildWidget';
import { IntegrationStore } from '../../stores/IntegrationStore';
import { Permissions } from '../../../util/bitfields/Permissions';
import { PresenceStore } from '../../stores/PresenceStore';
import { RoleStore } from '../../stores/RoleStore';
import { Structure } from '../base/Structure';
import { VoiceStateStore } from '../../stores/VoiceStateStore';
import { ImageBufferResolvable } from '../../../util/ImageUtil';
import type { APIGuildData, APIVoiceRegionData, GuildDefaultMessageNotifications, GuildExplicitContentFilterLevel, GuildFeatures, GuildMFALevel, GuildPremiumTier, GuildSystemChannelFlags, GuildVerificationLevel, APIGuildPreviewData } from '@klasa/dapi-types';
import type { Client } from '../../../client/Client';
import type { GuildMember } from './GuildMember';
/**
 * @see https://discord.com/developers/docs/resources/guild#guild-object
 */
export declare class Guild extends Structure {
    /**
     * The guild ID.
     * @since 0.0.1
     */
    readonly id: string;
    /**
     * The guild's name (2-100 characters).
     * @since 0.0.1
     */
    name: string;
    /**
     * The guild's icon hash.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/reference#image-formatting
     */
    icon: string | null;
    /**
     * The guild's splash hash.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/reference#image-formatting
     */
    splash: string | null;
    /**
     * The guild's discovery splash hash.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/reference#image-formatting
     */
    discoverySplash: string | null;
    /**
     * The guild's owner ID.
     * @since 0.0.1
     */
    ownerID: string;
    /**
     * The guild's total permissions for the user in the guild (does not include channel overrides).
     * @since 0.0.1
     */
    permissions: Permissions | null;
    /**
     * The guild's voice region id for the guild.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/voice#voice-region-object
     */
    region: string;
    /**
     * The guild's id of AFK channel.
     * @since 0.0.1
     */
    afkChannelID: string | null;
    /**
     * The guild's AFK timeout in seconds.
     * @since 0.0.1
     */
    afkTimeout: number;
    /**
     * The guild's required verification level.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#guild-object-verification-level
     */
    verificationLevel: GuildVerificationLevel;
    /**
     * The guild's default message notifications level.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level
     */
    defaultMessageNotification: GuildDefaultMessageNotifications;
    /**
     * The guild's explicit content filter level.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level
     */
    explicitContentFilter: GuildExplicitContentFilterLevel;
    /**
     * The guild's bans.
     * @since 0.0.1
     */
    readonly bans: BanStore;
    /**
     * The guild's store of roles.
     * @since 0.0.1
     */
    readonly roles: RoleStore;
    /**
     * The guild's store of custom emojis.
     * @since 0.0.1
     */
    readonly emojis: GuildEmojiStore;
    /**
     * The guild's store of invites.
     * @since 0.0.1
     */
    readonly invites: GuildInviteStore;
    /**
     * The guild's store of integrations.
     * @since 0.0.1
     */
    readonly integrations: IntegrationStore;
    /**
     * The guild's store of integrations.
     * @since 0.0.4
     */
    readonly shard: WebSocketShard;
    /**
     * The guild's enabled features.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#guild-object-guild-features
    */
    features: GuildFeatures[];
    /**
     * The guild's required Multi-Factor Authentication level.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#guild-object-mfa-level
     */
    mfaLevel: GuildMFALevel | null;
    /**
     * The guild's application id of the guild creator if it is bot-created.
     */
    applicationID: string | null;
    /**
     * Whether or not the guild widget is enabled.
     * @since 0.0.1
     */
    widgetEnabled: boolean;
    /**
     * The channel id for the guild widget.
     * @since 0.0.1
     */
    widgetChannelID: string | null;
    /**
     * The system channel ID.
     * @since 0.0.1
     */
    systemChannelID: string | null;
    /**
     * The system channel flags.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags
     */
    systemChannelFlags: GuildSystemChannelFlags;
    /**
     * The id of the channel where "PUBLIC" guilds display rules and/or guidelines.
     * @since 0.0.1
     */
    rulesChannelID: string | null;
    /**
     * When this guild was joined at.
     * @since 0.0.1
     */
    joinedTimestamp: number | null;
    /**
     * Whether this is considered a large guild.
     * @since 0.0.1
     */
    large: boolean | null;
    /**
     * Whether or not this guild is unavailable.
     * @since 0.0.1
     */
    unavailable: boolean;
    /**
     * Total number of members in this guild.
     * @since 0.0.1
     */
    memberCount: number;
    /**
     * A store of voice states for this guild.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/voice#voice-state-object
     */
    readonly voiceStates: VoiceStateStore;
    /**
     * A store of members for this guild.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#guild-member-object
     */
    readonly members: GuildMemberStore;
    /**
     * A store of channels for this guild.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/channel#channel-object
     */
    readonly channels: GuildChannelStore;
    /**
     * A store of presences for this guild.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/topics/gateway#presence-update
     */
    readonly presences: PresenceStore;
    /**
     * The maximum amount of presences for the guild (the default value, currently 25000, is in effect when null is returned).
     * @since 0.0.1
     */
    maxPresences?: number | null;
    /**
     * The maximum amount of members for the guild.
     * @since 0.0.1
     */
    maxMembers?: number;
    /**
     * The vanity invite code for the guild.
     * @since 0.0.1
     */
    vanityUrlCode: string | null;
    /**
     * The guild's description.
     * @since 0.0.1
     */
    description: string | null;
    /**
     * The guild's banner hash.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/reference#image-formatting
     */
    banner: string | null;
    /**
     * The guild's guild Boosting tier
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#guild-object-premium-tier
     */
    premiumTier: GuildPremiumTier | null;
    /**
     * The number of boosts this guild currently has.
     * @since 0.0.1
     */
    premiumSubscriptionCount: number | null;
    /**
     * The preferred locale of a `PUBLIC` guild used in guild discovery and notices from Discord; defaults to "en-US".
     * @since 0.0.1
     */
    preferredLocale: string;
    /**
     * The id of the channel where admins and moderators of "PUBLIC" guilds receive notices from Discord.
     * @since 0.0.1
     */
    publicUpdatesChannel: string | null;
    /**
     * The approximate number of members in this guild, returned from the `GET /guild/<id>` endpoint when `with_counts` is `true`.
     * @since 0.0.1
     */
    approximateMemberCount?: number;
    /**
     * The approximate number of online members in this guild, returned from the `GET /guild/<id>` endpoint when `with_counts` is `true`.
     * @since 0.0.1
     */
    approximatePresenceCount?: number;
    /**
     * The widget for this guild.
     * @since 0.0.1
     */
    widget: GuildWidget;
    /**
     * Whether the guild is deleted.
     * @since 0.0.1
     */
    deleted: boolean;
    constructor(client: Client, data: APIGuildData, shardID: number);
    /**
     * When this guild was joined at, as a Date.
     * @since 0.0.1
     */
    get joinedAt(): Date | null;
    /**
     * The Client's member of this guild.
     * @since 0.0.1
     */
    get me(): GuildMember | null;
    /**
     * The owner of this guild.
     * @since 0.0.1
     */
    get owner(): GuildMember | null;
    /**
     * Returns the guild preview.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#get-guild-preview
     */
    fetchPreview(): Promise<APIGuildPreviewData>;
    /**
     * Modifies the guild's settings.
     * @since 0.0.1
     * @param data The settings to be applied to the guild.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild
     */
    modify({ icon, splash, banner, ...options }: GuildModifyOptions, requestOptions?: RequestOptions): Promise<this>;
    /**
     * Deletes the guild permanently.
     * @since 0.0.1
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#delete-guild
     */
    delete(requestOptions?: RequestOptions): Promise<this>;
    /**
     * Returns a number indicating the number of members that would be removed in a prune operation.
     * @since 0.0.1
     * @param options The number of days to count prune and the included roles.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-prune-count
     */
    prune(options: GuildPruneDryOptions, requestOptions?: RequestOptions): Promise<number>;
    /**
     * Begins a prune operation.
     * @since 0.0.1
     * @param options The number of days to count prune and the included roles.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#begin-guild-prune
     */
    prune(options: GuildPruneNonDryOptions, requestOptions?: RequestOptions): Promise<number | null>;
    /**
     * Returns a list of voice region objects for the guild.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#get-guild-voice-regions
     */
    fetchRegions(): Promise<APIVoiceRegionData[]>;
    /**
     * Makes the client leave the guild.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/user#leave-guild
     */
    leave(): Promise<this>;
    /**
     * Returns a partial {@link Invite invite} for guilds that have the feature enabled.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#get-guild-vanity-url
     */
    fetchVanityURL(): Promise<GuildVanityURL>;
    /**
     * Defines the toString behavior of this structure.
     * @since 0.0.4
     */
    toString(): string;
    protected _patch(data: APIGuildData): this;
}
/**
 * The options for {@link Guild#modify}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#modify-guild-json-params
 */
export interface GuildModifyOptions {
    /**
     * The {@link Guild guild} name.
     * @since 0.0.1
     */
    name?: string;
    /**
     * The guild voice region id.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/voice#voice-region-object
     */
    region?: string;
    /**
     * The verification level.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#guild-object-verification-level
     */
    verification_level?: string;
    /**
     * The default message notification level.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level
     */
    default_message_notifications?: GuildDefaultMessageNotifications;
    /**
     * The explicit content filter level.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level
     */
    explicit_content_filter?: GuildExplicitContentFilterLevel;
    /**
     * The id for afk {@link VoiceChannel channel}.
     * @since 0.0.1
     */
    afk_channel_id?: string;
    /**
     * The afk timeout in seconds.
     * @since 0.0.1
     */
    afk_timeout?: number;
    /**
     * The base64 1024x1024 png/jpeg/gif image for the guild icon (can be animated gif when the guild has `ANIMATED_ICON` feature).
     * @since 0.0.1
     */
    icon?: ImageBufferResolvable;
    /**
     * The {@link User user} id to transfer guild ownership to (must be owner).
     * @since 0.0.1
     */
    owner_id?: string;
    /**
     * The base64 16:9 png/jpeg image for the guild splash (when the guild has `INVITE_SPLASH` feature).
     * @since 0.0.1
     */
    splash?: ImageBufferResolvable;
    /**
     * The base64 16:9 png/jpeg image for the guild banner (when the guild has `BANNER` feature).
     * @since 0.0.1
     */
    banner?: ImageBufferResolvable;
    /**
     * The id of the {@link TextChannel channel} where guild notices such as welcome messages and boost events are posted.
     * @since 0.0.1
     */
    system_channel_id?: string;
    /**
     * The id of the channel where guilds display rules and/or guidelines (when the guild has `PUBLIC` feature).
     * @since 0.0.1
     */
    rules_channel_id?: string;
    /**
     * The id of the channel where admins and moderators of guilds receive notices from Discord (when the guild has `PUBLIC` feature).
     * @since 0.0.1
     */
    public_updates_channel_id?: string;
    /**
     * The preferred locale of a guild used in server discovery and notices from Discord; defaults to "en-US" (when the guild has `PUBLIC` feature).
     * @since 0.0.1
     */
    preferred_locale?: string;
}
/**
 * The options for a dry {@link Guild#prune}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#get-guild-prune-count-query-string-params
 */
export interface GuildPruneDryOptions {
    /**
     * The number of days to count prune for (1 or more).
     * @since 0.0.1
     * @default 7
     */
    days?: number;
    /**
     * The {@link Role role} IDs to include.
     * @since 0.0.1
     * @default []
     */
    includeRoles?: string[];
    /**
     * Whether or not this operation should fetch instead of starting a prune.
     * @since 0.0.1
     * @default false
     */
    dry: true;
}
/**
 * The options for a non-dry {@link Guild#prune}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#begin-guild-prune-query-string-params
 */
export interface GuildPruneNonDryOptions extends Omit<GuildPruneDryOptions, 'dry'> {
    /**
     * Whether 'pruned' is returned, discouraged for large guilds.
     * @since 0.0.1
     * @default true
     */
    computePruneCount?: boolean;
    /**
     * Whether or not this operation should fetch instead of starting a prune.
     * @since 0.0.1
     * @default false
     */
    dry?: false;
}
export declare type GuildPruneOptions = GuildPruneDryOptions | GuildPruneNonDryOptions;
/**
 * The vanity URL retrieved from {@link Guild#fetchVanityURL}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#get-guild-vanity-url-example-partial-invite-object
 */
export interface GuildVanityURL {
    /**
     * The code of this invite.
     * @since 0.0.1
     * @example "discord"
     */
    code: string;
    /**
     * The amount of uses this invite has.
     * @since 0.0.1
     * @example 42
     */
    uses: number;
}
