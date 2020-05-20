import { RequestOptions, Routes } from '@klasa/rest';
import { DataStore } from './base/DataStore';
import { extender } from '../../util/Extender';

import type { APIOverwriteData } from '@klasa/dapi-types';
import type { Client } from '../../client/Client';
import type { Overwrite, OverwriteData } from '../structures/guilds/Overwrite';
import type { GuildChannel } from '../structures/channels/GuildChannel';
import type { GuildMember } from '../structures/guilds/GuildMember';

export interface OverwritesFor {
	everyone?: Overwrite;
	roles: Overwrite[];
	member?: Overwrite;
}

/**
 * The store for {@link Overwrite Overwrites}.
 * @since 0.0.1
 */
export class OverwriteStore extends DataStore<Overwrite> {

	/**
	 * The {@link GuildChannel channel} this store belongs to.
	 * @since 0.0.1
	 */
	public readonly channel: GuildChannel;

	/**
	 * Builds the store.
	 * @since 0.0.1
	 * @param client The {@link Client client} this store belongs to.
	 * @param client The {@link Client client} this store belongs to.
	 */
	public constructor(client: Client, channel: GuildChannel) {
		super(client, extender.get('Overwrite'), client.options.cache.limits.overwrites);
		this.channel = channel;
	}

	/**
	 * Creates a new {@link Overwrite overwrite} for the {@link GuildChannel channel}.
	 * @since 0.0.1
	 * @param id The id the overwrite is for
	 * @param data The overwrite data.
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/channel#edit-channel-permissions
	 */
	public async add(id: string, data: OverwriteData, requestOptions: RequestOptions = {}): Promise<Overwrite> {
		await this.client.api.put(Routes.channelPermissions(this.channel.id, id), { ...requestOptions, data });
		return this._add({ id, ...data });
	}

	/**
	 * Deletes a {@link Overwrite overwrite} from the {@link GuildChannel channel}.
	 * @since 0.0.1
	 * @param overwriteID The {@link Role role} ID to delete.
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/channel#delete-channel-permission
	 */
	public async remove(overwriteID: string, requestOptions: RequestOptions = {}): Promise<this> {
		await this.client.api.delete(Routes.channelPermissions(this.channel.id, overwriteID), requestOptions);
		return this;
	}

	/**
	 * Gets the overwrites for a given guild member.
	 * @param guildMember
	 */
	public for(guildMember: GuildMember): OverwritesFor {
		const everyone = this.get(this.channel.guild.id);
		const member = this.get(guildMember.id);
		const roles: Overwrite[] = [];

		for (const overwrite of this.values()) {
			if (guildMember.roles.has(overwrite.id)) roles.push(overwrite);
		}

		return { everyone, roles, member };
	}

	/**
	 * Adds a new structure to this DataStore
	 * @param data The data packet to add
	 */
	protected _add(data: APIOverwriteData): Overwrite {
		const existing = this.get(data.id);
		// eslint-disable-next-line dot-notation
		if (existing) return existing['_patch'](data);

		const entry = new this.Holds(this.client, data, this.channel);
		if (this.client.options.cache.enabled) this.set(entry.id, entry);
		return entry;
	}

}
