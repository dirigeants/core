import { Routes, RequestOptions } from '@klasa/rest';
import { Structure } from '../base/Structure';

import type { APIIntegrationData, APIIntegrationAccountData } from '@klasa/dapi-types';
import type { Client } from '../../../Client';
import type { Guild } from './Guild';
import type { Role } from './Role';
import type { User } from '../User';
import { isSet } from '../../../../util/Util';

/**
 * @see https://discord.com/developers/docs/resources/guild#integration-object
 */
export class Integration extends Structure {

	/**
	 * The integration id.
	 * @since 0.0.1
	 */
	public readonly id: string;

	/**
	 * The integration name.
	 * @since 0.0.1
	 */
	public readonly name: string;

	/**
	 * The integration type (twitch, youtube, etc).
	 * @since 0.0.1
	 */
	public readonly type: string;

	/**
	 * Whether this integration is enabled.
	 * @since 0.0.1
	 */
	public readonly enabled: boolean;

	/**
	 * Whether this integration is syncing.
	 * @since 0.0.1
	 */
	public readonly syncing: boolean;

	/**
	 * The {@link Role role} ID that this integration uses for "subscribers".
	 * @since 0.0.1
	 */
	public readonly roleID: string;

	/**
	 * The {@link User user} ID for this integration.
	 * @since 0.0.1
	 */
	public readonly userID: string;

	/**
	 * The integration account information.
	 * @since 0.0.1
	 */
	public readonly account: APIIntegrationAccountData;

	/**
	 * Whether emoticons should be synced for this integration (twitch only currently).
	 * @since 0.0.1
	 */
	public enableEmoticons!: boolean | null;

	/**
	 * The behavior of expiring subscribers.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors
	 */
	public expireBehavior!: number;

	/**
	 * The grace period (in days) before expiring subscribers.
	 * @since 0.0.1
	 */
	public expireGracePeriod!: number;

	/**
	 * When this integration was last synced.
	 * @since 0.0.1
	 */
	public syncedTimestamp!: number;

	public readonly guild: Guild;

	public constructor(client: Client, data: APIIntegrationData, guild: Guild) {
		super(client);
		this.id = data.id;
		this.name = data.name;
		this.type = data.type;
		this.enabled = data.enabled;
		this.syncing = data.syncing;
		this.roleID = data.role_id;
		this.account = data.account;
		// eslint-disable-next-line dot-notation
		this.userID = this.client.users['_add'](data.user).id;

		this.guild = guild;
	}

	public get user(): User | null {
		return this.client.users.get(this.userID) ?? null;
	}

	public get role(): Role | null {
		return this.guild.roles.get(this.roleID) ?? null;
	}

	/**
	 * Modifies the behaviour and settings of the integration.
	 * @since 0.0.1
	 * @param options The settings to modify in the integration.
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/guild#modify-guild-integration
	 */
	public async edit(options: IntegrationEditOptions, requestOptions: RequestOptions = {}): Promise<this> {
		await this.client.api.patch(Routes.guildIntegration(this.guild.id, this.id), { ...requestOptions, data: options });
		return this;
	}

	/**
	 * Deletes the integration.
	 * @since 0.0.1
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/guild#delete-guild-integration
	 */
	public async delete(requestOptions: RequestOptions = {}): Promise<this> {
		await this.client.api.delete(Routes.guildIntegration(this.guild.id, this.id), requestOptions);
		return this;
	}

	/**
	 * Synchronizes the integration.
	 * @since 0.0.1
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/guild#sync-guild-integration
	 */
	public async sync(requestOptions: RequestOptions = {}): Promise<this> {
		await this.client.api.post(Routes.guildIntegrationSync(this.guild.id, this.id), requestOptions);
		return this;
	}

	protected _patch(data: APIIntegrationData): this {
		if (isSet(data, 'expire_behavior')) this.expireBehavior = data.expire_behavior;
		if (isSet(data, 'expire_grace_period')) this.expireGracePeriod = data.expire_grace_period;
		if (isSet(data, 'enable_emoticons')) this.enableEmoticons = data.enable_emoticons ?? null;
		this.syncedTimestamp = new Date(data.synced_at).getTime();
		return this;
	}

}

export interface Integration {
	client: Client;
}

/**
 * The options for {@link Integration#edit}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#modify-guild-integration-json-params
 */
export interface IntegrationEditOptions {
	/**
	 * The behavior when an integration subscription lapses (see the integration expire behaviors documentation).
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors
	 */
	expire_behavior?: number | null;

	/**
	 * Period (in days) where the integration will ignore lapsed subscriptions.
	 * @since 0.0.1
	 */
	expire_grace_period?: number | null;

	/**
	 * Whether emoticons should be synced for this integration (twitch only currently).
	 * @since 0.0.1
	 */
	enable_emoticons?: boolean | null;
}
