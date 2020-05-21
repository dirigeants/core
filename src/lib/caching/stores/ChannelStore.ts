import { Routes, RequestOptions } from '@klasa/rest';
import { Channel } from '../structures/channels/Channel';
import { DataStore } from './base/DataStore';
import { extender, Constructor } from '../../util/Extender';
import { Structure } from '../structures/base/Structure';

import type { APIChannelData } from '@klasa/dapi-types';
import type { Client } from '../../client/Client';
import { GuildChannel } from '../structures/channels/GuildChannel';
import { DMChannel } from '../structures/channels/DMChannel';

/**
 * The store for {@link GuildBasedChannel guild based channels}.
 * @since 0.0.1
 */
export class ChannelStore extends DataStore<Channel> {

	/**
	 * Builds the store.
	 * @since 0.0.1
	 * @param client The {@link Client client} this store belongs to.
	 * @param guild The {@link Guild guild} this store belongs to.
	 */
	public constructor(client: Client) {
		super(client, extender.get('Channel') as Constructor<Channel>, client.options.cache.limits.channels);
	}

	/**
	 * Removes a channel from the {@link Guild guild}.
	 * @since 0.0.1
	 * @param channelID The channel to remove.
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/channel#deleteclose-channel
	 */
	public async remove(channelID: string, requestOptions: RequestOptions = {}): Promise<Channel> {
		const channel = await this.client.api.delete(Routes.channel(channelID), requestOptions) as APIChannelData;
		const newChannel = Channel.create(this.client, channel) as Channel;
		newChannel.deleted = true;
		return newChannel;
	}

	/**
	 * Returns the list of channels as updated from Discord.
	 * @param id The id for the channel you want to fetch
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/channel#get-channel
	 */
	public async fetch(id: string): Promise<this> {
		const channel = await this.client.api.get(Routes.channel(id)) as APIChannelData;
		this._add(channel);
		return this;
	}

	/**
	 * Adds a new structure to this DataStore
	 * @param data The data packet to add
	 */
	protected _add(data: APIChannelData): DMChannel | GuildChannel {
		let entry: DMChannel | GuildChannel;
		// eslint-disable-next-line dot-notation, @typescript-eslint/no-non-null-assertion
		if (data.guild_id) entry = this.client.guilds.get(data.guild_id)!.channels['_add'](data);
		// eslint-disable-next-line dot-notation
		else entry = this.client.dms['_add'](data);
		if (this.client.options.cache.enabled) this.set(entry.id, entry);
		return entry;
	}

}
