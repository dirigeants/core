/* eslint-disable no-dupe-class-members */
import { Cache } from '@klasa/cache';
import { Routes, RequestOptions } from '@klasa/rest';
import { DataStore } from './base/DataStore';
import { extender } from '../../util/Extender';
import { MessageOptions, SplitOptions, MessageBuilder } from '../structures/messages/MessageBuilder';
import { MessageIterator, MessageIteratorOptions } from '../../util/iterators/MessageIterator';

import type { APIMessageData } from '@klasa/dapi-types';
import type { Client } from '../../client/Client';
import type { Message } from '../structures/messages/Message';
import type { TextBasedChannel } from '../../util/Util';

/**
 * The store for a {@link TextBasedChannel text-based channel} {@link Message messages}.
 * @since 0.0.1
 */
export class MessageStore extends DataStore<Message> {

	/**
	 * The {@link TextBasedChannel text-based channel} this store belongs to.
	 * @since 0.0.1
	 */
	public readonly channel: TextBasedChannel;

	/**
	 * Builds the store.
	 * @since 0.0.1
	 * @param client The {@link Client client} this store belongs to.
	 * @param channel The {@link TextBasedChannel text-based channel} this store belongs to.
	 */
	public constructor(client: Client, channel: TextBasedChannel) {
		super(client, extender.get('Message'), client.options.cache.limits.messages);
		this.channel = channel;
	}

	/**
	 * Sends a message to the channel.
	 * @param data The {@link MessageBuilder builder} to send.
	 * @param options The split options for the message.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/channel#create-message
	 * @example
	 * channel.messages.add(new MessageBuilder()
	 *     .setContent('Ping!')
	 *     .setEmbed(new Embed().setDescription('From an embed!')));
	 */
	public add(data: MessageOptions, options?: SplitOptions): Promise<Message[]>;
	/**
	 * Sends a message to the channel.
	 * @param data A callback with a {@link MessageBuilder builder} as an argument.
	 * @param options The split options for the message.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/channel#create-message
	 * @example
	 * channel.messages.add(builder => builder
	 *     .setContent('Ping!')
	 *     .setEmbed(embed => embed.setDescription('From an embed!')));
	 */
	public add(data: (message: MessageBuilder) => MessageBuilder | Promise<MessageBuilder>, options?: SplitOptions): Promise<Message[]>;
	public async add(data: MessageOptions | ((message: MessageBuilder) => MessageBuilder | Promise<MessageBuilder>), options: SplitOptions = {}): Promise<Message[]> {
		const split = (typeof data === 'function' ? await data(new MessageBuilder()) : new MessageBuilder(data)).split(options);

		const endpoint = Routes.channelMessages(this.channel.id);
		const rawMessages = await Promise.all(split.map(message => this.client.api.post(endpoint, message)));
		return rawMessages.map(msg => this._add(msg as APIMessageData));
	}

	/**
	 * Deletes a message.
	 * @param messageID The message to delete via the api.
	 * @param requestOptions The additional request options.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/channel#delete-message
	 */
	public async remove(messageID: string, requestOptions: RequestOptions = {}): Promise<this> {
		await this.client.api.delete(Routes.channelMessage(this.channel.id, messageID), requestOptions);
		return this;
	}

	/**
	 * Deletes many messages.
	 * @param messages The messages to delete via the api.
	 * @param requestOptions The additional request options.
	 * @since 0.0.3
	 * @see https://discord.com/developers/docs/resources/channel#bulk-delete-messages
	 */
	public async bulkRemove(messages: string[], requestOptions: RequestOptions = {}): Promise<this> {
		await this.client.api.post(Routes.bulkDelete(this.channel.id), { ...requestOptions, data: { messages } });
		return this;
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
			const entry = await this.client.api.get(Routes.channelMessage(this.channel.id, idOrOptions)) as APIMessageData;
			return this._add(entry);
		}

		const entries = await this.client.api.get(Routes.channelMessages(this.channel.id), { query: idOrOptions && Object.entries(idOrOptions) }) as APIMessageData[];
		const cache = new Cache<string, Message>();
		for (const entry of entries) cache.set(entry.id, this._add(entry));
		return cache;
	}

	/**
	 * Asynchronously iterator over received messages.
	 * @since 0.0.1
	 * @param options Any options to pass to the iterator.
	 */
	public async *iterate(options?: MessageIteratorOptions): AsyncIterableIterator<[Message]> {
		yield* new MessageIterator(this.channel, options);
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
