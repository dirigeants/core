import { DataStore } from './base/DataStore';
import { extender } from '../../../util/Extender';

import type { Guild } from '../structures/guilds/Guild';
import type { Client } from '../../Client';

/**
 * The store for {@link Guild guilds}.
 * @since 0.0.1
 */
export class GuildStore extends DataStore<Guild> {

	/**
	 * Builds the store.
	 * @since 0.0.1
	 * @param client The {@link Client client} this store belongs to.
	 */
	public constructor(client: Client) {
		super(client, extender.get('Guild'), client.options.cache.limits.guilds);
	}

}
