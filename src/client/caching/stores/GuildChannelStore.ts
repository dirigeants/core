import { DataStore } from './base/DataStore';
import { GuildChannel } from '../structures/channels/GuildChannel';
import { Channel } from '../structures/channels/Channel';
import { extender } from '../../../util/Extender';

import type { APIChannelData } from '@klasa/dapi-types';
import type { Client } from '../../Client';
import type { Guild } from '../structures/guilds/Guild';

export class GuildChannelStore extends DataStore<GuildChannel> {

	public readonly guild: Guild;

	public constructor(client: Client, guild: Guild) {
		super(client, extender.get('GuildChannel'));
		this.guild = guild;
	}

	/**
	 * Adds a new structure to this DataStore
	 * @param data The data packet to add
	 */
	protected _add(data: APIChannelData): GuildChannel {
		const existing = this.get(data.id);
		// eslint-disable-next-line dot-notation
		if (existing) return existing['_patch'](data);

		const entry = Channel.create(this.client, data, this.guild) as GuildChannel;
		if (this.client.options.cache.enabled) this.set(entry.id, entry);
		return entry;
	}

}
