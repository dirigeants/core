import { Routes } from '@klasa/rest';
import { Structure } from '../base/Structure';

import type { APIIntegrationData, APIIntegrationAccountData } from '@klasa/dapi-types';
import type { Client } from '../../../Client';
import type { Guild } from './Guild';
import type { Role } from './Role';
import type { User } from '../User';

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
	 * @see https://discord.com/developers/docs/resources/guild#modify-guild-integration
	 */
	public async edit(options: IntegrationEditOptions): Promise<this> {
		const endpoint = Routes.guildIntegration(this.guild.id, this.id);
		await this.client.api.patch(endpoint, { data: options });
		return this;
	}

	/**
	 * Deletes the integration.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#delete-guild-integration
	 */
	public async delete(): Promise<this> {
		const endpoint = Routes.guildIntegration(this.guild.id, this.id);
		await this.client.api.delete(endpoint);
		return this;
	}

	/**
	 * Synchronizes the integration.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#sync-guild-integration
	 */
	public async sync(): Promise<this> {
		const endpoint = Routes.guildIntegrationSync(this.guild.id, this.id);
		await this.client.api.post(endpoint);
		return this;
	}

	protected _patch(data: APIIntegrationData): this {
		if (Reflect.has(data, 'expire_behavior')) this.expireBehavior = data.expire_behavior;
		if (Reflect.has(data, 'expire_grace_period')) this.expireGracePeriod = data.expire_grace_period;
		// TODO(kyranet): add this once Vlad adds this missing field
		// if (Reflect.has(data, 'enable_emoticons')) this.enableEmoticons = data.enable_emoticons;
		this.enableEmoticons = null;
		this.syncedTimestamp = new Date(data.synced_at).getTime();
		throw new Error('Method not implemented.');
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
