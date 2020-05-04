import { Structure } from './base/Structure';
import { APIGuildData, GuildVerificationLevel,
	GuildDefaultMessageNotifications, GuildExplicitContentFilterLevel,
	APIGuildMemberData, APIEmojiData, APIRoleData, GuildMFALevel, GuildFeatures } from '@klasa/dapi-types';
import { Client } from '../../Client';
import { ChannelStore } from '../stores/ChannelStore';
import { Routes } from '@klasa/rest';

export class Guild extends Structure {

	public id: string

	public available: boolean

	public name!: string | null

	public owner!: string | null

	public region!: string | null

	public icon!: string | null

	public splash!: string | null

	public discoverySplash!: string | null

	public afkChannel!: string | null

	public verificationLevel!: GuildVerificationLevel | null

	public defaultMessageNotification!: GuildDefaultMessageNotifications | null

	public explicitContentFilter!: GuildExplicitContentFilterLevel | null

	// TODO: Storeify the following 3 properties (enkiel)
	public roles!: APIRoleData[] | null

	public emojis!: APIEmojiData[] | null

	public members!: APIGuildMemberData[] | null

	public channels!: ChannelStore | null

	public features!: GuildFeatures[] | null

	public mfaLevel!: GuildMFALevel | null

	public widgetEnabled!: boolean | null

	public widgetChannelId!: string | null

	public systemChannel!: string | null

	public systemFlags!: string | null

	public rulesChannel!: string | null

	public joinedAt!: string | null

	public large!: boolean | null

	public vanityUrlCode!: string | null

	public banner!: string | null

	public premiumTier!: number | null

	public premiumSubscriptionCount!: number | null

	public preferredLocale!: string | null

	public publicUpdatesChannel!: string | null

	public approxMemberCount!: number | null

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
		this.members = data.members ? data.members : null;
		this.channels = data.channels ? new ChannelStore(this.client as Client) : null;
		this.features = data.features ? data.features : null;
		this.mfaLevel = data.mfa_level;
		this.widgetEnabled = data.widget_enabled ? data.widget_enabled : null;
		this.widgetChannelId = data.widget_channel_id ? data.widget_channel_id : null;
		this.systemChannel = data.system_channel_id;
		this.systemFlags = data.system_channel_id ? data.system_channel_id : null;
		this.rulesChannel = data.rules_channel_id;
		this.joinedAt = data.joined_at ? data.joined_at : null;
		this.large = Boolean('large' in data ? data.large : this.large);
		this.vanityUrlCode = data.vanity_url_code;
		this.banner = data.banner;
		this.premiumTier = data.premium_tier;
		this.premiumSubscriptionCount = data.premium_subscription_count ? data.premium_subscription_count : null;
		this.preferredLocale = data.preferred_locale ? data.preferred_locale : null;
		this.publicUpdatesChannel = data.public_updates_channel_id ? data.public_updates_channel_id : null;
		this.approxMemberCount = data.approximate_member_count ? data.approximate_member_count : null;

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
