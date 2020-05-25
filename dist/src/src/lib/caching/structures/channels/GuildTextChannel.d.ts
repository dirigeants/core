import { Cache } from '@klasa/cache';
import { GuildChannel } from './GuildChannel';
import { MessageStore } from '../../stores/MessageStore';
import { MessageBuilder, MessageOptions, SplitOptions } from '../messages/MessageBuilder';
import { MessageCollectorOptions } from '../../../util/collectors/MessageCollector';
import { Typing } from '../Typing';
import type { APIChannelData } from '@klasa/dapi-types';
import type { Client } from '../../../client/Client';
import type { Guild } from '../guilds/Guild';
import type { Message } from '../Message';
export interface SendOptions {
    split?: SplitOptions;
    cache?: boolean;
}
/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
export declare abstract class GuildTextChannel extends GuildChannel {
    /**
     * The message store for this channel.
     * @since 0.0.1
     */
    readonly messages: MessageStore;
    /**
     * The typing handler for this channel.
     * @since 0.0.1
     */
    readonly typing: Typing;
    /**
     * The channel topic (0-1024 characters).
     * @since 0.0.1
     */
    topic: string | null;
    /**
     * Whether or not the channel is nsfw.
     * @since 0.0.1
     */
    nsfw: boolean;
    /**
     * The id of the last message sent in this channel (may not point to an existing or valid message).
     * @since 0.0.1
     */
    lastMessageID: string | null;
    /**
     * When the last pinned message was pinned.
     * @since 0.0.1
     */
    lastPinTimestamp: string | null;
    constructor(client: Client, data: APIChannelData, guild: Guild | null);
    /**
     * If the client can send message attachments in the channel.
     * @since 0.0.1
     */
    get attachable(): boolean | null;
    /**
     * If the client can send messages in the channel.
     * @since 0.0.1
     */
    get postable(): boolean | null;
    /**
     * If the client can send message embeds in the channel.
     * @since 0.0.1
     */
    get embedable(): boolean | null;
    /**
     * Awaits a group of messages.
     * @since 0.0.1
     * @param options The options to control what you receive
     */
    awaitMessages(options: MessageCollectorOptions): Promise<Cache<string, Message>>;
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
