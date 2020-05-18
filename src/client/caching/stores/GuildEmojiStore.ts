import { DataStore } from './base/DataStore';
import { extender } from '../../../util/Extender';

import type { APIEmojiData } from '@klasa/dapi-types';
import type { Client } from '../../Client';
import type { GuildEmoji } from '../structures/guilds/GuildEmoji';

/**
 * The store for {@link GuildEmoji guild emojis}.
 * @since 0.0.1
 */
export class GuildEmojiStore extends DataStore<GuildEmoji> {

	/**
	 * Builds the store.
	 * @since 0.0.1
	 * @param client The {@link Client client} this store belongs to.
	 */
	public constructor(client: Client) {
		super(client, extender.get('GuildEmoji'), client.options.cache.limits.emojis);
	}

	/**
	 * Adds a new structure to this DataStore
	 * @param data The data packet to add
	 */
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	// @ts-ignore
	protected _add(data: APIEmojiData): GuildEmoji {
		const existing = this.get(data.id as string);
		// eslint-disable-next-line dot-notation
		if (existing) return existing['_patch'](data);

		const entry = new this.Holds(this.client, data);
		if (this.client.options.cache.enabled) this.set(entry.id, entry);
		return entry;
	}

}
