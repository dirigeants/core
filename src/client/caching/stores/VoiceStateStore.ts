import { DataStore } from './base/DataStore';
import { extender } from '../../../util/Extender';

import type { APIVoiceStatePartial } from '@klasa/dapi-types';
import type { Client } from '../../Client';
import type { VoiceState } from '../structures/guilds/VoiceState';
import type { Guild } from '../structures/guilds/Guild';


/**
 * The store for {@link VoiceState voice states}.
 * @since 0.0.1
 */
export class VoiceStateStore extends DataStore<VoiceState> {

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
		super(client, extender.get('VoiceState'), client.options.cache.limits.voiceStates);
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
		if (this.client.options.cache.enabled) this.set(entry.id, entry);
		return entry;
	}

}
