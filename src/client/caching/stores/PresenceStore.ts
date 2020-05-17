import { DataStore } from './base/DataStore';
import { extender } from '../../../util/Extender';

import type { APIPresenceUpdateData } from '@klasa/dapi-types';
import type { Presence } from '../structures/guilds/Presence';
import type { Client } from '../../Client';
import type { Guild } from '../structures/guilds/Guild';

export class PresenceStore extends DataStore<Presence> {

	public readonly guild: Guild;

	public constructor(client: Client, guild: Guild) {
		super(client, extender.get('Presence'));
		this.guild = guild;
	}

	/**
	 * Adds a new structure to this DataStore
	 * @param data The data packet to add
	 */
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	// @ts-ignore
	protected _add(data: APIPresenceUpdateData): Presence {
		const existing = this.get(data.user.id);
		// eslint-disable-next-line dot-notation
		if (existing) return existing['_patch'](data);

		const entry = new this.Holds(this.client, data);
		if (this.client.options.caching) this.set(entry.id, entry);
		return entry;
	}

}
