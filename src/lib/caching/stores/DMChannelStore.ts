import { RequestOptions, Routes } from '@klasa/rest';
import { DataStore } from './base/DataStore';
import { Channel } from '../structures/channels/Channel';
import { extender } from '../../util/Extender';

import type { APIChannelData } from '@klasa/dapi-types';
import type { Client } from '../../client/Client';
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
	 * Closes a channel from a {@link User user}.
	 * @since 0.0.1
	 * @param channelID The channel to remove.
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/channel#deleteclose-channel
	 */
	public async remove(channelID: string, requestOptions: RequestOptions = {}): Promise<DMChannel> {
		const channel = await this.client.api.delete(Routes.channel(channelID), requestOptions) as APIChannelData;
		return Channel.create(this.client, channel) as DMChannel;
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
