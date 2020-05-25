import { APIChannelData, ChannelType } from '@klasa/dapi-types';
import { RequestOptions } from '@klasa/rest';
import { Cache } from '@klasa/cache';
import { Channel } from './Channel';
import { MessageStore } from '../../stores/MessageStore';
import { MessageBuilder, MessageOptions, SplitOptions } from '../messages/MessageBuilder';
import { MessageCollectorOptions } from '../../../util/collectors/MessageCollector';
import { Typing } from '../Typing';
import type { User } from '../User';
import type { Client } from '../../../client/Client';
import type { Message } from '../Message';
/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
export declare class DMChannel extends Channel {
    /**
     * The typing handler for this channel.
     * @since 0.0.1
     */
    readonly typing: Typing;
    /**
     * The type of channel.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/channel#channel-object-channel-types
     */
    readonly type = ChannelType.DM;
    /**
     * The id of the last message sent in this channel (may not point to an existing or valid message).
     * @since 0.0.1
     */
    lastMessageID: string | null;
    /**
     * The recipients of the DM.
     * @since 0.0.1
     */
    recipients: User[];
    /**
     * The message store for this channel.
     * @since 0.0.1
     */
    readonly messages: MessageStore;
    /**
     * Whether the DM channel is deleted.
     * @since 0.0.1
     */
    deleted: boolean;
    constructor(client: Client, data: APIChannelData);
    /**
     * If the client can send message attachments in the channel.
     * @since 0.0.1
     */
    get attachable(): boolean;
    /**
     * If the client can send messages in the channel.
     * @since 0.0.1
     */
    get postable(): boolean;
    /**
     * If the client can send message embeds in the channel.
     * @since 0.0.1
     */
    get embedable(): boolean;
    /**
     * Awaits a group of messages.
     * @since 0.0.1
     * @param options The options to control what you receive
     */
    awaitMessages(options: MessageCollectorOptions): Promise<Cache<string, Message>>;
    /**
     * Closes the channel.
     * @since 0.0.1
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/channel#deleteclose-channel
     */
    delete(requestOptions?: RequestOptions): Promise<this>;
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
    send(data: MessageOptions, options?: SplitOptions): Promise<Message[]>;
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
    send(data: (message: MessageBuilder) => MessageBuilder | Promise<MessageBuilder>, options?: SplitOptions): Promise<Message[]>;
    protected _patch(data: APIChannelData): this;
}
