import { Structure } from './base/Structure';
import { APIGuildData, GuildVerificationLevel,
	GuildDefaultMessageNotifications, GuildExplicitContentFilterLevel,
	APIGuildMemberData, APIEmojiData, APIRoleData, GuildMFALevel } from '@klasa/dapi-types';
import { Client } from '../../Client';
import { ChannelStore } from '../stores/ChannelStore';
import { Routes } from '@klasa/rest';

export class Guild extends Structure {

	/**
	 * The guild ID
	 */
	public id: string;

	/**
	 * Whether this guild is available
	 */
	public available: boolean;

	/**
	 * The guild's name
	 */
	public name?: string | null;

	/**
	 * The guild's owner
	 */
	public owner?: string | null;

	/**
	 * The guild's region
	 */
	public region?: string | null;

	/**
	 * The guild's icon hash
	 */
	public icon?: string | null;

	/**
	 * The guild's splash hash
	 */
	public splash?: string | null;

	/**
	 * The guild's discovery splash hash
	 */
	public discoverySplash?: string | null;

	/**
	 * The AFK channel of the guild
	 */
	public afkChannel?: string | null;

	/**
	 * The guild's verification level
	 */
	public verificationLevel?: GuildVerificationLevel | null;

	/**
	 * The default message notification setting for the guild
	 */
	public defaultMessageNotification?: GuildDefaultMessageNotifications | null;

	/**
	 * The explicit content filter setting for the guild
	 */
	public explicitContentFilter?: GuildExplicitContentFilterLevel | null;

	// TODO: Storeify the following 3 properties (enkiel)
	/**
	 * A store of the roles that belong in this guild
	 */
	public roles?: APIRoleData[] | null;

	/**
	 * A store of the emojis that belong in this guild
	 */
	public emojis?: APIEmojiData[] | null;

	/**
	 * A store of members that belong in this guild
	 */
	public members?: APIGuildMemberData[] | null;

	/**
	 * A store of channels that belong in this guild
	 */
	public channels?: ChannelStore | null;

	/**
	 * An array of guild features
	 * @see https://discord.com/developers/docs/resources/guild#guild-object-guild-features
	*/
	public features?: string[] | null;

	/**
	 * The Multi-Factor Authentication level for this guild
	 */
	public mfaLevel?: GuildMFALevel | null;

	/**
	 * Whether the guild's widget is enabled
	 */
	public widgetEnabled?: boolean | null;

	/**
	 * The channel ID the widget's invite leads to
	 */
	public widgetChannelId?: string | null;

	/**
	 * The system channel
	 */
	public systemChannel?: string | null;

	/**
	 * The system channel flags
	 * @see https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags
	 */
	public systemChannelFlags?: string | null;

	/**
	 * The rules channel. Only available to guild with the `PUBLIC`flag.
	 */
	public rulesChannel?: string | null;

	/**
	 * The time the client user joined the guild
	 */
	public joinedAt?: string | null;

	/**
	 * Whether this guild is considered large by the Discord API
	 */
	public large?: boolean | null;

	/**
	 * The vanity invite code for the guild
	 */
	public vanityUrlCode?: string | null;

	/**
	 * The guild's description
	 */
	public description?: string | null;

	/**
	 * The guild's banner hash
	 */
	public banner?: string | null;

	/**
	 * The guild's Server Boosting tier
	 */
	public premiumTier?: number | null;

	/**
	 * The amount of server boosts a guild has
	 */
	public premiumSubscriptionCount?: number | null;

	/**
	 * The preferred locale of a `PUBLIC` guild used in server discovery and notices from Discord; defaults to "en-US"
	 */
	public preferredLocale?: string | null;

	/**
	 * The preferred locale of a `PUBLIC` guild used in server discovery and notices from Discord; defaults to "en-US"
	 */
	public publicUpdatesChannel?: string | null;

	/**
	 * The approximate number of members in this guild
	 */
	public approxMemberCount?: number | null;

	constructor(client: Client, data: APIGuildData) {
		super(client);

		this.id = data.id;

		if (data.unavailable) {
			this.available = false;
		} else {
			this.available = true;
			this._patch(data);
		}
	}

	public async modify(data: GuildModifyOptions): Promise<unknown> {
		return this.client.api.patch(`${Routes.guild(this.id)}/modify`, { data });
	}

	public async delete(): Promise<unknown> {
		return this.client.api.delete(`${Routes.guild(this.id)}`);
	}

	public async prune(options: GuildPruneOptions): Promise<unknown> {
		// eslint-disable-next-line @typescript-eslint/camelcase
		const data = { ...options, compute_prune_count: this.large };
		return this.client.api.post(`${Routes.guild(this.id)}/prune`, { data });
	}

	public async leave(): Promise<unknown> {
		return this.client.api.delete(`${Routes.leaveGuild(this.id)}`);
	}

	protected _patch(data: APIGuildData): this {
		this.name = data.name;
		// TODO: fetch user
		this.owner = data.owner_id;
		this.region = data.name;
		this.icon = data.icon;
		this.splash = data.splash;
		this.discoverySplash = data.discovery_splash;
		this.afkChannel = data.afk_channel_id;
		this.verificationLevel = data.verification_level;
		this.defaultMessageNotification = data.default_message_notifications;
		this.explicitContentFilter = data.explicit_content_filter;
		this.roles = data.roles;
		this.emojis = data.emojis;
		this.members = data.members;
		this.channels = typeof data.channels !== 'undefined' ? new ChannelStore(this.client as Client) : undefined;
		this.features = data.features;
		this.mfaLevel = data.mfa_level;
		this.widgetEnabled = data.widget_enabled;
		// TODO(enkiel): When dapi-types is updated, uncomment below
		// this.widgetChannelId = data.widget_channel_id;
		this.systemChannel = data.system_channel_id;
		this.systemChannelFlags = data.system_channel_id;
		this.rulesChannel = data.rules_channel_id;
		this.joinedAt = data.joined_at;
		this.large = Boolean('large' in data ? data.large : this.large);
		this.vanityUrlCode = data.vanity_url_code;
		this.banner = data.banner;
		this.premiumTier = data.premium_tier;
		this.premiumSubscriptionCount = data.premium_subscription_count;
		this.preferredLocale = data.preferred_locale;
		this.description = data.description;
		this.publicUpdatesChannel = data.public_updates_channel_id;
		// TODO(enkiel): When dapi-types is updated, uncomment below
		// this.approxMemberCount = data.approximate_member_count ? data.approximate_member_count : null;

		return this;
	}

}

interface GuildModifyOptions {
	name?: string;
	region?: string;
	verification_level?: string;
	default_message_notifications?: GuildDefaultMessageNotifications;
	explicit_content_filter?: GuildExplicitContentFilterLevel;
	afk_channel_id?: string;
	afk_timeout?: number;
	icon?: string;
	owner_id?: string;
	splash?: string;
	banner?: string;
	system_channel_id?: string;
	rules_channel_id?: string;
	public_updates_channel_id?: string;
	preferred_locale?: string;
}

interface GuildPruneOptions {
	days?: number;
	compute_prune_count?: boolean;
}
