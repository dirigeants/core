import { DataStore } from './base/DataStore';
import { Channel } from '../structures/channels/Channel';
import { extender } from '../../../util/Extender';

import type { APIChannelData } from '@klasa/dapi-types';
import type { Client } from '../../Client';

export class DMChannelStore extends DataStore<Channel> {

	public constructor(client: Client) {
		super(client, extender.get('DMChannel'));
	}

	/**
	 * Adds a new structure to this DataStore
	 * @param data The data packet to add
	 */
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	// @ts-ignore
	protected _add(data: APIChannelData): Channel | null {
		const existing = this.get(data.id);
		// eslint-disable-next-line dot-notation
		if (existing && existing.type === data.type) return existing['_patch'](data);

		const entry = Channel.create(this.client, data);
		if (entry && this.client.options.cache.caching) this.set(entry.id, entry);
		return entry;
	}

}
