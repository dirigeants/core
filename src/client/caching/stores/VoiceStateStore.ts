import { DataStore } from './base/DataStore';
import { extender } from '../../../util/Extender';

import type { APIVoiceStatePartial } from '@klasa/dapi-types';
import type { Client } from '../../Client';
import type { VoiceState } from '../structures/guilds/VoiceState';
import type { Guild } from '../structures/guilds/Guild';

export class VoiceStateStore extends DataStore<VoiceState> {

	public readonly guild: Guild;

	public constructor(client: Client, guild: Guild) {
		super(client, extender.get('VoiceState'));
		this.guild = guild;
	}

	/**
	 * Adds a new structure to this DataStore
	 * @param data The data packet to add
	 */
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	// @ts-ignore
	protected _add(data: APIVoiceStatePartial): VoiceState {
		const existing = this.get(data.user_id);
		// eslint-disable-next-line dot-notation
		if (existing) return existing['_patch'](data);

		const entry = new this.Holds(this.client, data, this.guild);
		if (this.client.options.cache.caching) this.set(entry.id, entry);
		return entry;
	}

}
