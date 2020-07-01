import { RequestOptions, Routes } from '@klasa/rest';
import { ProxyCache } from '@klasa/cache';

import type { APIMessageData } from '@klasa/dapi-types';
import type { Client } from '../../client/Client';
import type { Message } from '../structures/messages/Message';
import type { GuildTextChannel } from '../structures/channels/GuildTextChannel';
import type { DMChannel } from '../structures/channels/DMChannel';

/**
 * The store for the pins the channel has.
 * @since 0.0.4
 */
export class ChannelPinsStore extends ProxyCache<string, Message> {

	/**
	 * The {@link Client client} this store belongs to.
	 * @since 0.0.4
	 */
	public readonly client: Client;

	/**
	 * The {@link GuildTextChannel guild channel} or {@link DMChannel DM channel} this store belongs to.
	 * @since 0.0.4
	 */
	public readonly channel: GuildTextChannel | DMChannel;

	/**
	 * Builds the store.
	 * @since 0.0.4
	 * @param channel The {@link GuildTextChannel guild channel} or {@link DMChannel DM channel} this store belongs to.
	 */
	public constructor(channel: GuildTextChannel | DMChannel, keys: string[]) {
		super(channel.messages, keys);
		this.client = channel.client;
		this.channel = channel;
	}

	/**
	 * Pins a message to the channel.
	 * @since 0.0.4
	 * @param id The {@link Message#id message id} you want to pin
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/channel#add-pinned-channel-message
	 */
	public async add(id: string, requestOptions: RequestOptions = {}): Promise<this> {
		await this.client.api.put(Routes.channelPin(this.channel.id, id), { ...requestOptions });
		this.set(id);
		return this;
	}

	/**
	 * Removes a pin from the channel given the message ID.
	 * @since 0.0.4
	 * @param id The {@link Message#id message id}.
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/channel#delete-pinned-channel-message
	 */
	public async remove(id: string, requestOptions: RequestOptions = {}): Promise<this> {
		await this.client.api.delete(Routes.channelPin(this.channel.id, id), requestOptions);
		this.delete(id);
		return this;
	}

	/**
	 * Returns a list of {@link Message pinned messages}s with their metadata.
	 * @since 0.0.4
	 * @see https://discord.com/developers/docs/resources/guild#get-guild-invites
	 */
	public async fetch(): Promise<this> {
		const entries = await this.client.api.get(Routes.channelPins(this.channel.id)) as APIMessageData[];
		for (const entry of entries) {
			// eslint-disable-next-line dot-notation
			this.channel.messages['_add'](entry);
			this.set(entry.id);
		}
		return this;
	}

}
