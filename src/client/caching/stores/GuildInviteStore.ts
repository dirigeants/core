import { Routes } from '@klasa/rest';
import { DataStore } from './base/DataStore';
import { extender } from '../../../util/Extender';

import type { APIInviteData } from '@klasa/dapi-types';
import type { Invite } from '../structures/Invite';
import type { Guild } from '../structures/guilds/Guild';
import type { Client } from '../../Client';

export class GuildInviteStore extends DataStore<Invite> {

	public readonly guild: Guild;

	public constructor(client: Client, guild: Guild) {
		super(client, extender.get('Invite'));
		this.guild = guild;
	}

	/**
	 * Returns a list of {@link Invite invite}s with their metadata.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#get-guild-invites
	 */
	public async fetch(): Promise<this> {
		const endpoint = Routes.guildInvites(this.guild.id);
		const entries = await this.client.api.get(endpoint) as APIInviteData[];
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
	protected _add(data: APIInviteData, cache = true): Invite {
		const existing = this.get(data.code);
		// eslint-disable-next-line dot-notation
		if (existing) return existing['_patch'](data);

		const entry = new this.Holds(this.client, data, this.guild);
		if (cache) this.set(entry.id, entry);
		return entry;
	}

}
