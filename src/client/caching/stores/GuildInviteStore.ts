import { Routes, RequestOptions } from '@klasa/rest';
import { DataStore } from './base/DataStore';
import { extender } from '../../../util/Extender';

import type { APIInviteData } from '@klasa/dapi-types';
import type { Invite } from '../structures/Invite';
import type { Guild } from '../structures/guilds/Guild';
import type { Client } from '../../Client';

/**
 * The store for {@link Invite guild invites}.
 * @since 0.0.1
 */
export class GuildInviteStore extends DataStore<Invite> {

	/**
	 * The {@link Guild guild} this store belongs to.
	 * @since 0.0.1
	 */
	public readonly guild: Guild;

	/**
	 * Builds the store.
	 * @since 0.0.1
	 * @param client The {@link Client client} this store belongs to.
	 * @param guild The {@link Guild guild} this store belongs to.
	 */
	public constructor(client: Client, guild: Guild) {
		super(client, extender.get('Invite'), client.options.cache.limits.invites);
		this.guild = guild;
	}

	/**
	 * Deletes an invite given its code.
	 * @since 0.0.1
	 * @param code The {@link Invite#code invite code}.
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/invite#delete-invite
	 */
	public async remove(code: string, requestOptions: RequestOptions = {}): Promise<Invite> {
		const entry = this.client.api.delete(Routes.invite(code), requestOptions);
		return new this.Holds(this.client, entry, this.guild);
	}

	/**
	 * Returns a list of {@link Invite invite}s with their metadata.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#get-guild-invites
	 */
	public async fetch(): Promise<this> {
		const entries = await this.client.api.get(Routes.guildInvites(this.guild.id)) as APIInviteData[];
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
	protected _add(data: APIInviteData): Invite {
		const existing = this.get(data.code);
		// eslint-disable-next-line dot-notation
		if (existing) return existing['_patch'](data);

		const entry = new this.Holds(this.client, data, this.guild);
		if (this.client.options.cache.enabled) this.set(entry.id, entry);
		return entry;
	}

}
