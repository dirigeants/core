import { DataStore } from './base/DataStore';
import { Channel } from '../structures/channels/Channel';
import { extender } from '../../../util/Extender';

import type { APIChannelData } from '@klasa/dapi-types';
import type { Client } from '../../Client';
import type { DMChannel } from '../structures/channels/DMChannel';

/**
 * The store for {@link DMChannel DM channels}.
 * @since 0.0.1
 */
export class DMChannelStore extends DataStore<DMChannel> {

	/**
	 * Builds the store.
	 * @since 0.0.1
	 * @param client The {@link Client client} this store belongs to.
	 */
	public constructor(client: Client) {
		super(client, extender.get('DMChannel'), client.options.cache.limits.dms);
	}

	/**
	 * Adds a new structure to this DataStore
	 * @param data The data packet to add
	 */
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	// @ts-ignore
	protected _add(data: APIChannelData): DMChannel | null {
		const existing = this.get(data.id);
		// eslint-disable-next-line dot-notation
		if (existing && existing.type === data.type) return existing['_patch'](data);

		const entry = Channel.create(this.client, data) as DMChannel;
		if (entry && this.client.options.cache.enabled) this.set(entry.id, entry);
		return entry;
	}

}
