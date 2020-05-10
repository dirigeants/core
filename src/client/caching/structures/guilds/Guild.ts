import { Structure } from '../base/Structure';
import { ChannelStore } from '../../stores/ChannelStore';
import { Routes } from '@klasa/rest';
import { Permissions } from '../../../../util/bitfields/Permissions';
import { GuildChannelStore } from '../../stores/GuildChannelStore';
import { GuildMemberStore } from '../../stores/GuildMemberStore';
import { PresenceStore } from '../../stores/PresenceStore';
import { VoiceStateStore } from '../../stores/VoiceStateStore';
import { RoleStore } from '../../stores/RoleStore';
import { GuildEmojiStore } from '../../stores/GuildEmojiStore';
import type { Client } from '../../../Client';
import type {
	APIGuildData,
	GuildDefaultMessageNotifications,
	GuildExplicitContentFilterLevel,
	GuildFeatures,
	GuildMFALevel,
	GuildPremiumTier,
	GuildSystemChannelFlags,
	GuildVerificationLevel
} from '@klasa/dapi-types';

/**
 * @see https://discord.com/developers/docs/resources/guild#guild-object
 */
export class Guild extends Structure {

	/**
	 * The guild ID.
	 * @since 0.0.1
	 */
	public readonly id: string;

	/**
	 * The guild's name (2-100 characters).
	 * @since 0.0.1
	 */
	public name!: string;

	/**
	 * The guild's icon hash.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/reference#image-formatting
	 */
	public icon!: string | null;

	/**
	 * The guild's splash hash.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/reference#image-formatting
	 */
	public splash!: string | null;

	/**
	 * The guild's discovery splash hash.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/reference#image-formatting
	 */
	public discoverySplash!: string | null;

	/**
	 * The guild's owner ID.
	 * @since 0.0.1
	 */
	public ownerID!: string;

	/**
	 * The guild's total permissions for the user in the guild (does not include channel overrides).
	 * @since 0.0.1
	 */
	public permissions!: Permissions | null;

	/**
	 * The guild's voice region id for the guild.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/voice#voice-region-object
	 */
	public region!: string;

	/**
	 * The guild's id of AFK channel.
	 * @since 0.0.1
	 */
	public afkChannelID!: string | null;

	/**
	 * The guild's AFK timeout in seconds.
	 * @since 0.0.1
	 */
	public afkTimeout!: number;

	/**
	 * The guild's required verification level.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#guild-object-verification-level
	 */
	public verificationLevel!: GuildVerificationLevel;

	/**
	 * The guild's default message notifications level.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level
	 */
	public defaultMessageNotification!: GuildDefaultMessageNotifications;

	/**
	 * The guild's explicit content filter level.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level
	 */
	public explicitContentFilter!: GuildExplicitContentFilterLevel;

	/**
	 * The guild's store of roles.
	 * @since 0.0.1
	 */
	public readonly roles: RoleStore;

	/**
	 * The guild's store of custom emojis.
	 * @since 0.0.1
	 */
	public readonly emojis: GuildEmojiStore;

	/**
	 * The guild's enabled features.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#guild-object-guild-features
	*/
	public features!: GuildFeatures[];

	/**
	 * The guild's required Multi-Factor Authentication level.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#guild-object-mfa-level
	 */
	public mfaLevel!: GuildMFALevel | null;

	/**
	 * The guild's application id of the guild creator if it is bot-created.
	 */
	public applicationID!: string | null;

	/**
	 * Whether or not the server widget is enabled.
	 * @since 0.0.1
	 */
	public widgetEnabled!: boolean;

	/**
	 * The channel id for the server widget.
	 * @since 0.0.1
	 */
	public widgetChannelID!: string | null;

	/**
	 * The system channel ID.
	 * @since 0.0.1
	 */
	public systemChannelID!: string | null;

	/**
	 * The system channel flags.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags
	 */
	public systemChannelFlags!: GuildSystemChannelFlags;

	/**
	 * The id of the channel where "PUBLIC" guilds display rules and/or guidelines.
	 * @since 0.0.1
	 */
	public rulesChannelID!: string | null;

	/**
	 * When this guild was joined at.
	 * @since 0.0.1
	 */
	public joinedTimestamp!: number | null;

	/**
	 * Whether this is considered a large guild.
	 * @since 0.0.1
	 */
	public large!: boolean | null;

	/**
	 * Whether or not this guild is available.
	 * @since 0.0.1
	 */
	public available: boolean;

	/**
	 * Total number of members in this guild.
	 * @since 0.0.1
	 */
	public memberCount!: number;

	/**
	 * A store of voice states for this guild.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/voice#voice-state-object
	 */
	public readonly voiceStates: VoiceStateStore;

	/**
	 * A store of members for this guild.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#guild-member-object
	 */
	public readonly members: GuildMemberStore;

	/**
	 * A store of channels for this guild.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/channel#channel-object
	 */
	public readonly channels: GuildChannelStore;

	/**
	 * A store of presences for this guild.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/topics/gateway#presence-update
	 */
	public readonly presences: PresenceStore;

	/**
	 * The maximum amount of presences for the guild (the default value, currently 25000, is in effect when null is returned).
	 * @since 0.0.1
	 */
	public maxPresences?: number | null;

	/**
	 * The maximum amount of members for the guild.
	 * @since 0.0.1
	 */
	public maxMembers?: number;

	/**
	 * The vanity invite code for the guild.
	 * @since 0.0.1
	 */
	public vanityUrlCode!: string | null;

	/**
	 * The guild's description.
	 * @since 0.0.1
	 */
	public description!: string | null;

	/**
	 * The guild's banner hash.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/reference#image-formatting
	 */
	public banner!: string | null;

	/**
	 * The guild's Server Boosting tier
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#guild-object-premium-tier
	 */
	public premiumTier!: GuildPremiumTier | null;

	/**
	 * The number of boosts this guild currently has.
	 * @since 0.0.1
	 */
	public premiumSubscriptionCount!: number | null;

	/**
	 * The preferred locale of a `PUBLIC` guild used in server discovery and notices from Discord; defaults to "en-US".
	 * @since 0.0.1
	 */
	public preferredLocale!: string;

	/**
	 * The id of the channel where admins and moderators of "PUBLIC" guilds receive notices from Discord.
	 * @since 0.0.1
	 */
	public publicUpdatesChannel!: string | null;

	/**
	 * The approximate number of members in this guild, returned from the `GET /guild/<id>` endpoint when `with_counts` is `true`.
	 * @since 0.0.1
	 */
	public approximateMemberCount?: number;

	/**
	 * The approximate number of online members in this guild, returned from the `GET /guild/<id>` endpoint when `with_counts` is `true`.
	 */
	public approximatePresenceCount?: number;

	public constructor(client: Client, data: APIGuildData) {
		super(client);

		this.id = data.id;
		this.roles = new RoleStore(client);
		this.emojis = new GuildEmojiStore(client);
		this.voiceStates = new VoiceStateStore(client);
		this.members = new GuildMemberStore(client);
		this.channels = new ChannelStore(client);
		this.presences = new PresenceStore(client);

		if (data.unavailable) {
			this.available = false;
		} else {
			this.available = true;
			this._patch(data);
		}
	}

	/**
	 * When this guild was joined at, as a Date.
	 * @since 0.0.1
	 */
	public get joinedAt(): Date | null {
		return this.joinedTimestamp === null ? null : new Date(this.joinedTimestamp);
	}

	public async edit(data: GuildEditOptions): Promise<unknown> {
		return this.client.api.patch(Routes.guild(this.id), { data });
	}

	public async delete(): Promise<unknown> {
		return this.client.api.delete(Routes.guild(this.id));
	}

	public async prune(options: GuildPruneOptions): Promise<unknown> {
		// eslint-disable-next-line @typescript-eslint/camelcase
		const data = { ...options, compute_prune_count: this.large };
		return this.client.api.post(`${Routes.guild(this.id)}/prune`, { data });
	}

	public async leave(): Promise<unknown> {
		return this.client.api.delete(Routes.leaveGuild(this.id));
	}

	protected _patch(data: APIGuildData): this {
		this.name = data.name;
		this.ownerID = data.owner_id;
		this.region = data.name;
		this.icon = data.icon;
		this.splash = data.splash;
		this.discoverySplash = data.discovery_splash;
		this.afkChannelID = data.afk_channel_id;
		this.verificationLevel = data.verification_level;
		this.defaultMessageNotification = data.default_message_notifications;
		this.explicitContentFilter = data.explicit_content_filter;

		if (data.roles) {
			this.roles.clear();
			for (const role of data.roles) this.roles.add(role);
		}

		if (data.emojis) {
			this.emojis.clear();
			for (const emoji of data.emojis) this.emojis.add(emoji);
		}

		if (data.members) {
			this.members.clear();
			for (const member of data.members) this.members.add(member);
		}

		if (data.channels) {
			this.channels.clear();
			for (const channel of data.channels) this.channels.add(channel);
		}

		this.features = data.features;
		this.mfaLevel = data.mfa_level;
		this.widgetEnabled = data.widget_enabled ?? false;
		this.widgetChannelID = data.widget_channel_id ?? null;
		this.systemChannelID = data.system_channel_id;
		this.systemChannelFlags = data.system_channel_flags;
		this.rulesChannelID = data.rules_channel_id;
		this.joinedTimestamp = data.joined_at ? new Date(data.joined_at).getTime() : null;
		this.large = Boolean('large' in data ? data.large : this.large);
		this.vanityUrlCode = data.vanity_url_code;
		this.banner = data.banner;
		this.premiumTier = data.premium_tier;
		this.premiumSubscriptionCount = data.premium_subscription_count ?? null;
		this.preferredLocale = data.preferred_locale;
		this.description = data.description;
		this.publicUpdatesChannel = data.public_updates_channel_id;
		this.approximateMemberCount = data.approximate_member_count;
		this.approximatePresenceCount = data.approximate_presence_status;

		return this;
	}

}

interface GuildEditOptions {
	name: string;
	region: string;
	verification_level: string;
	default_message_notifications: GuildDefaultMessageNotifications;
	explicit_content_filter: GuildExplicitContentFilterLevel;
	afk_channel_id: string;
	afk_timeout: number;
	icon: string;
	owner_id: string;
	splash: string;
	banner: string;
	system_channel_id: string;
	rules_channel_id: string;
	public_updates_channel_id: string;
	preferred_locale: string;
}

interface GuildPruneOptions {
	days: number;
	compute_prune_count: boolean;
}
