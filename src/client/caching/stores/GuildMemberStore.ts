import { DataStore } from './base/DataStore';
import { extender } from '../../../util/Extender';

import type { APIUserData } from '@klasa/dapi-types';
import type { Client } from '../../Client';
import type { GuildMember, MemberData } from '../structures/guilds/GuildMember';
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
	 */
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	// @ts-ignore
	protected _add(data: MemberData): GuildMember {
		const existing = this.get((data.user as APIUserData).id);
		// eslint-disable-next-line dot-notation
		if (existing) return existing['_patch'](data);

		const entry = new this.Holds(this.client, data, this.guild);
		if (this.client.options.cache.enabled) this.set(entry.id, entry);
		return entry;
	}

}
