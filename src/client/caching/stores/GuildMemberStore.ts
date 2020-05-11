import { DataStore } from './base/DataStore';
import { extender } from '../../../util/Extender';

import type { APIGuildMemberData, APIUserData } from '@klasa/dapi-types';
import type { Client } from '../../Client';
import type { GuildMember } from '../structures/guilds/GuildMember';
import type { Guild } from '../structures/guilds/Guild';

export class GuildMemberStore extends DataStore<GuildMember> {

	public readonly guild: Guild;

	public constructor(client: Client, guild: Guild) {
		super(client, extender.get('GuildMember'));
		this.guild = guild;
	}

	/**
	 * Adds a new structure to this DataStore
	 * @param data The data packet to add
	 * @param cache If the data should be cached
	 */
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	// @ts-ignore
	public add(data: APIGuildMemberData, cache = true): GuildMember {
		const existing = this.get((data.user as APIUserData).id);
		// eslint-disable-next-line dot-notation
		if (existing) return existing['_patch'](data);

		const entry = new this.Holds(this.client, data, this.guild);
		if (cache) this.set(entry.id, entry);
		return entry;
	}

}
