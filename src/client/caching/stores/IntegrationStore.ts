import { Routes } from '@klasa/rest';
import { DataStore } from './base/DataStore';
import { extender } from '../../../util/Extender';

import type { APIIntegrationData } from '@klasa/dapi-types';
import type { Client } from '../../Client';
import type { Guild } from '../structures/guilds/Guild';
import type { Integration } from '../structures/guilds/Integration';

export class IntegrationStore extends DataStore<Integration> {

	public readonly guild: Guild;

	public constructor(client: Client, guild: Guild) {
		super(client, extender.get('Integration'), client.options.cache.limits.integrations);
		this.guild = guild;
	}

	public async add(data: IntegrationStoreAddData): Promise<this> {
		const endpoint = Routes.guildIntegrations(this.guild.id);
		await this.client.api.post(endpoint, { data });
		return this;
	}

	/**
	 * Returns a collection of {@link Integration integration}s.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#get-guild-integrations
	 */
	public async fetch(): Promise<this> {
		const endpoint = Routes.guildIntegrations(this.guild.id);
		const entries = await this.client.api.get(endpoint) as APIIntegrationData[];
		for (const entry of entries) this._add(entry);
		return this;
	}

	/**
	 * Adds a new structure to this DataStore
	 * @param data The data packet to add
	 * @param cache If the data should be cached
	 */
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	// @ts-ignore
	protected _add(data: APIIntegrationData, cache = true): Integration {
		const existing = this.get(data.id);
		// eslint-disable-next-line dot-notation
		if (existing) return existing['_patch'](data);

		const entry = new this.Holds(this.client, data, this.guild);
		if (cache) this.set(entry.id, entry);
		return entry;
	}

}

/**
 * The data for {@link IntegrationStore#add}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#create-guild-integration-json-params
 */
export interface IntegrationStoreAddData {
	/**
	 * The {@link Integration integration} ID.
	 * @since 0.0.1
	 */
	id: string;

	/**
	 * The {@link Integration integration} type.
	 * @since 0.0.1
	 */
	type: string;
}
