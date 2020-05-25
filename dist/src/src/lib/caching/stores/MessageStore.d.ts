import { Cache } from '@klasa/cache';
import { RequestOptions } from '@klasa/rest';
import { DataStore } from './base/DataStore';
import { MessageOptions, SplitOptions, MessageBuilder } from '../structures/messages/MessageBuilder';
import type { EventIteratorOptions } from '@klasa/event-iterator';
import type { Client } from '../../client/Client';
import type { Message } from '../structures/Message';
import type { TextBasedChannel } from '../../util/Util';
/**
 * The store for a {@link TextBasedChannel text-based channel} {@link Message messages}.
 * @since 0.0.1
 */
export declare class MessageStore extends DataStore<Message> {
    /**
     * The {@link TextBasedChannel text-based channel} this store belongs to.
     * @since 0.0.1
     */
    readonly channel: TextBasedChannel;
    /**
     * Builds the store.
     * @since 0.0.1
     * @param client The {@link Client client} this store belongs to.
     * @param channel The {@link TextBasedChannel text-based channel} this store belongs to.
     */
    constructor(client: Client, channel: TextBasedChannel);
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
    add(data: MessageOptions, options?: SplitOptions): Promise<Message[]>;
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
    add(data: (message: MessageBuilder) => MessageBuilder | Promise<MessageBuilder>, options?: SplitOptions): Promise<Message[]>;
    /**
     * Deletes a message.
     * @param requestOptions The additional request options.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/channel#delete-message
     */
    remove(messageID: string, requestOptions?: RequestOptions): Promise<this>;
    /**
     * Returns one or more messages from this channel.
     * @since 0.0.1
     * @param options The {@link MessageFetchOptions options} for the search.
     * @see https://discord.com/developers/docs/resources/channel#get-channel-messages
     */
    fetch(options?: MessageFetchOptions): Promise<Cache<string, Message>>;
    /**
     * Returns a specific message from this channel.
     * @since 0.0.1
     * @param messageID The {@link Message message} ID to fetch.
     * @see https://discord.com/developers/docs/resources/channel#get-channel-message
     */
    fetch(messageID: string): Promise<Message>;
    /**
     * Asynchronously iterator over received messages.
     * @since 0.0.1
     * @param options Any options to pass to the iterator.
     */
    iterate(options: EventIteratorOptions<Message>): AsyncIterableIterator<Message>;
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
