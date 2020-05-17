/* eslint-disable no-dupe-class-members */
import { Cache } from '@klasa/cache';
import { Routes } from '@klasa/rest';
import { DataStore } from './base/DataStore';
import { extender } from '../../../util/Extender';

import type { APIMessageData } from '@klasa/dapi-types';
import type { Client } from '../../Client';
import type { Message } from '../structures/Message';
import type { TextBasedChannel } from '../../../util/Util';

export class MessageStore extends DataStore<Message> {

	public readonly channel: TextBasedChannel;

	public constructor(client: Client, channel: TextBasedChannel) {
		super(client, extender.get('Message'), client.options.cache.limits.messages);
		this.channel = channel;
	}

	/**
	 * Returns one or more messages from this channel.
	 * @since 0.0.1
	 * @param options The {@link MessageFetchOptions options} for the search.
	 * @see https://discord.com/developers/docs/resources/channel#get-channel-messages
	 */
	public fetch(options?: MessageFetchOptions): Promise<Cache<string, Message>>;

	/**
	 * Returns a specific message from this channel.
	 * @since 0.0.1
	 * @param messageID The {@link Message message} ID to fetch.
	 * @see https://discord.com/developers/docs/resources/channel#get-channel-message
	 */
	public fetch(messageID: string): Promise<Message>;
	public async fetch(idOrOptions?: string | MessageFetchOptions): Promise<Message | Cache<string, Message>> {
		if (typeof idOrOptions === 'string') {
			const endpoint = Routes.channelMessage(this.channel.id, idOrOptions);
			const entry = await this.client.api.get(endpoint) as APIMessageData;
			return this._add(entry);
		}

		const endpoint = Routes.channelMessages(this.channel.id);
		const entries = await this.client.api.get(endpoint, { query: idOrOptions }) as APIMessageData[];
		const cache = new Cache<string, Message>();
		for (const entry of entries) cache.set(entry.id, this._add(entry));
		return cache;
	}

}

/**
 * The options for {@link MessageStore#fetch}
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params
 */
export interface MessageFetchOptions {
	/**
	 * The messages to get around this ID.
	 * @since 0.0.1
	 */
	around?: string;

	/**
	 * The messages to get before this ID (not inclusive).
	 * @since 0.0.1
	 */
	before?: string;

	/**
	 * The messages to get after this ID (not inclusive).
	 * @since 0.0.1
	 */
	after?: string;

	/**
	 * The maximum number of messages to return (1-100).
	 * @since 0.0.1
	 */
	limit?: number;
}
