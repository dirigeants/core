/* eslint-disable no-dupe-class-members */
import { URL } from 'url';
import { Routes, RequestOptions } from '@klasa/rest';
import { BanStore } from '../../stores/BanStore';
import { GuildChannelStore } from '../../stores/GuildChannelStore';
import { GuildEmojiStore } from '../../stores/GuildEmojiStore';
import { GuildInviteStore } from '../../stores/GuildInviteStore';
import { GuildMemberStore } from '../../stores/GuildMemberStore';
import { GuildWidget } from './GuildWidget';
import { IntegrationStore } from '../../stores/IntegrationStore';
import { Permissions } from '../../../../util/bitfields/Permissions';
import { PresenceStore } from '../../stores/PresenceStore';
import { RoleStore } from '../../stores/RoleStore';
import { Structure } from '../base/Structure';
import { VoiceStateStore } from '../../stores/VoiceStateStore';

import type { Client } from '../../../Client';
import type {
	APIGuildData,
	APIVoiceRegionData,
	GuildDefaultMessageNotifications,
	GuildExplicitContentFilterLevel,
	GuildFeatures,
	GuildMFALevel,
	GuildPremiumTier,
	GuildSystemChannelFlags,
	GuildVerificationLevel,
	APIGuildWidgetData,
	APIGuildPreviewData
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
	 * The guild's bans.
	 * @since 0.0.1
	 */
	public readonly bans: BanStore;

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
	 * The guild's store of invites.
	 * @since 0.0.1
	 */
	public readonly invites: GuildInviteStore;

	/**
	 * The guild's store of integrations.
	 * @since 0.0.1
	 */
	public readonly integrations: IntegrationStore;

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
	 * Whether or not the guild widget is enabled.
	 * @since 0.0.1
	 */
	public widgetEnabled!: boolean;

	/**
	 * The channel id for the guild widget.
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
	 * Whether or not this guild is unavailable.
	 * @since 0.0.1
	 */
	public unavailable: boolean;

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
	 * The guild's guild Boosting tier
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
	 * The preferred locale of a `PUBLIC` guild used in guild discovery and notices from Discord; defaults to "en-US".
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
		this.bans = new BanStore(client, this);
		this.roles = new RoleStore(client, this);
		this.emojis = new GuildEmojiStore(client);
		this.invites = new GuildInviteStore(client, this);
		this.integrations = new IntegrationStore(client, this);
		this.voiceStates = new VoiceStateStore(client, this);
		this.members = new GuildMemberStore(client, this);
		this.channels = new GuildChannelStore(client, this);
		this.presences = new PresenceStore(client, this);

		this.unavailable = data.unavailable ?? false;
		if (!this.unavailable) {
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

	/**
	 * Returns a PNG image URL representing the image widget of the guild.
	 * @since 0.0.1
	 * @param options The options for the widget image.
	 * @see https://discord.com/developers/docs/resources/guild#get-guild-widget-image
	 */
	public getWidgetImageURL(options?: WidgetImageOptions): string {
		const path = Routes.guildWidgetImage(this.id);
		// TODO(VladFrangu): I think we should move this to @klasa/rest
		const url = new URL(`https://discord.com/api${path}`);
		if (options) for (const [key, value] of Object.entries(options)) url.searchParams.append(key, value);
		return url.toString();
	}

	/**
	 * Returns the guild preview.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#get-guild-preview
	 */
	public fetchPreview(): Promise<APIGuildPreviewData> {
		return this.client.api.get(Routes.guildPreview(this.id)) as Promise<APIGuildPreviewData>;
	}

	/**
	 * Edit's a guild's settings.
	 * @since 0.0.1
	 * @param data The settings to be applied to the guild.
	 * @see https://discord.com/developers/docs/resources/guild#modify-guild
	 */
	public async edit(data: GuildEditOptions, requestOptions: RequestOptions = {}): Promise<unknown> {
		const result = await this.client.api.patch(Routes.guild(this.id), { ...requestOptions, data }) as APIGuildData;
		return this.clone<this>()._patch(result);
	}

	/**
	 * Delete the guild permanently.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#delete-guild
	 */
	public async delete(): Promise<unknown> {
		return this.client.api.delete(Routes.guild(this.id));
	}

	// TODO(kyranet): make dry a part of RequestOptions or insert it into GuildPrune
	/**
	 * Returns a number indicating the number of members that would be removed in a prune operation.
	 * @since 0.0.1
	 * @param options The number of days to count prune and the included roles.
	 * @param dry When set to `true`, a calculation of how many members would be pruned.
	 * @see https://discord.com/developers/docs/resources/guild#get-guild-prune-count
	 */
	public prune(options: GuildPruneDryOptions, dry: true): Promise<number>;
	/**
	 * Begins a prune operation.
	 * @since 0.0.1
	 * @param options The number of days to count prune and the included roles.
	 * @param dry When set to `false` or left undefined, this operation will kick users.
	 * @see https://discord.com/developers/docs/resources/guild#begin-guild-prune
	 */
	public prune(options: GuildPruneOptions, dry?: false): Promise<number | null>
	public async prune(options: GuildPruneDryOptions, dry?: boolean): Promise<number | null> {
		if (dry) {
			const result = await this.client.api.get(Routes.guildPrune(this.id), { query: options }) as { pruned: number };
			return result.pruned;
		}

		// eslint-disable-next-line @typescript-eslint/camelcase
		const result = await this.client.api.post(Routes.guildPrune(this.id), { query: options }) as { pruned: number | null };
		return result.pruned;
	}

	/**
	 * Returns a list of voice region objects for the guild.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#get-guild-voice-regions
	 */
	public async fetchRegions(): Promise<APIVoiceRegionData[]> {
		const results = await this.client.api.get(Routes.guildVoiceRegions(this.id)) as APIVoiceRegionData[];
		return results;
	}

	/**
	 * Returns the guild {@link GuildWidget widget}.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#get-guild-widget
	 */
	public async fetchWidget(): Promise<GuildWidget> {
		const entry = await this.client.api.get(Routes.guildWidget(this.id)) as APIGuildWidgetData;
		return new GuildWidget(entry, this);
	}

	/**
	 * Makes the client leave the guild.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/user#leave-guild
	 */
	public async leave(): Promise<this> {
		await this.client.api.delete(Routes.leaveGuild(this.id));
		return this;
	}

	/**
	 * Returns a partial {@link Invite invite} for guilds that have the feature enabled.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#get-guild-vanity-url
	 */
	public async fetchVanityURL(): Promise<GuildVanityURL> {
		return this.client.api.get(Routes.guildVanityURL(this.id)) as Promise<GuildVanityURL>;
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
			// eslint-disable-next-line dot-notation
			for (const role of data.roles) this.roles['_add'](role);
		}

		if (data.emojis) {
			this.emojis.clear();
			// eslint-disable-next-line dot-notation
			for (const emoji of data.emojis) this.emojis['_add'](emoji);
		}

		if (data.members) {
			this.members.clear();
			// eslint-disable-next-line dot-notation
			for (const member of data.members) this.members['_add'](member);
		}

		if (data.channels) {
			this.channels.clear();
			// eslint-disable-next-line dot-notation
			for (const channel of data.channels) this.channels['_add'](channel);
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

export interface Guild {
	client: Client;
}

/**
 * The options for {@link Guild#edit}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#modify-guild-json-params
 */
interface GuildEditOptions {
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
	icon?: string;

	/**
	 * The {@link User user} id to transfer guild ownership to (must be owner).
	 * @since 0.0.1
	 */
	owner_id?: string;

	/**
	 * The base64 16:9 png/jpeg image for the guild splash (when the guild has `INVITE_SPLASH` feature).
	 * @since 0.0.1
	 */
	splash?: string;

	/**
	 * The base64 16:9 png/jpeg image for the guild banner (when the guild has `BANNER` feature).
	 * @since 0.0.1
	 */
	banner?: string;

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
	days: number;

	/**
	 * The {@link Role role} IDs to include.
	 * @since 0.0.1
	 * @default []
	 */
	include_roles: string[];
}

/**
 * The options for a non-dry {@link Guild#prune}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#begin-guild-prune-query-string-params
 */
export interface GuildPruneOptions extends GuildPruneDryOptions {
	/**
	 * Whether 'pruned' is returned, discouraged for large guilds.
	 * @since 0.0.1
	 * @default true
	 */
	compute_prune_count: boolean;
}

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

/**
 * The options for the widget image.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#get-guild-widget-image-query-string-params
 */
export interface WidgetImageOptions {
	/**
	 * Style of the widget image returned.
	 * @since 0.0.1
	 * @default WidgetStyle.Shield
	 */
	style?: WidgetStyle;
}

/**
 * The widget style options.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#get-guild-widget-image-widget-style-options
 */
export enum WidgetStyle {
	/**
	 * shield style widget with Discord icon and guild members online count
	 * @since 0.0.1
	 * @see https://discord.com/api/guilds/81384788765712384/widget.png?style=shield
	 */
	Shield = 'shield',

	/**
	 * large image with guild icon, name and online count. "POWERED BY DISCORD" as the footer of the widget
	 * @since 0.0.1
	 * @see https://discord.com/api/guilds/81384788765712384/widget.png?style=banner1
	 */
	Banner1 = 'banner1',

	/**
	 * smaller widget style with guild icon, name and online count. Split on the right with Discord logo
	 * @since 0.0.1
	 * @see https://discord.com/api/guilds/81384788765712384/widget.png?style=banner2
	 */
	Banner2 = 'banner2',

	/**
	 * large image with guild icon, name and online count. In the footer, Discord logo on the left and "Chat Now" on the right
	 * @since 0.0.1
	 * @see https://discord.com/api/guilds/81384788765712384/widget.png?style=banner3
	 */
	Banner3 = 'banner3',

	/**
	 * large Discord logo at the top of the widget. Guild icon, name and online count in the middle portion of the widget and a "JOIN MY SERVER" button at the bottom
	 * @since 0.0.1
	 * @see https://discord.com/api/guilds/81384788765712384/widget.png?style=banner4
	 */
	Banner4 = 'banner4'
}
