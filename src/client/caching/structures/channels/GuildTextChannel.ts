/* eslint-disable no-dupe-class-members */
import { GuildChannel } from './GuildChannel';
import { Cache } from '@klasa/cache';
import { MessageStore } from '../../../caching/stores/MessageStore';
import { MessageBuilder, MessageOptions, SplitOptions } from '../messages/MessageBuilder';

import type { APIChannelData } from '@klasa/dapi-types';
import type { Client } from '../../../Client';
import type { Guild } from '../guilds/Guild';
import type { TextBasedChannel } from '../../../../util/Util';
import type { Message } from '../Message';

export interface SendOptions {
	split?: SplitOptions;
	cache?: boolean;
}

export interface AwaitMessagesOptions {
	idle?: number;
	filter?: (message: Message, collected: Cache<string, Message>) => boolean;
}

/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
export abstract class GuildTextChannel extends GuildChannel {

	/**
	 * The message store for this channel.
	 * @since 0.0.1
	 */
	public readonly messages: MessageStore;

	/**
	 * The channel topic (0-1024 characters).
	 * @since 0.0.1
	 */
	public topic!: string | null;

	/**
	 * Whether or not the channel is nsfw.
	 * @since 0.0.1
	 */
	public nsfw!: boolean;

	/**
	 * The id of the last message sent in this channel (may not point to an existing or valid message).
	 * @since 0.0.1
	 */
	public lastMessageID!: string | null;

	/**
	 * When the last pinned message was pinned.
	 * @since 0.0.1
	 */
	public lastPinTimestamp!: string | null;

	public constructor(client: Client, data: APIChannelData, guild: Guild | null) {
		super(client, data, guild);
		this.messages = new MessageStore(client, this as TextBasedChannel);
	}

	/**
	 * Awaits a group of messages
	 * @param limit The limit of filtered messages to await
	 * @param options The options to control what you receive
	 */
	public async awaitMessages(limit: number, options: AwaitMessagesOptions = {}): Promise<Cache<string, Message>> {
		const { idle, filter = (): boolean => true } = options;
		const collected = new Cache<string, Message>();
		for await (const message of this.messages.iterate(limit, { idle, filter: (msg) => filter(msg, collected) })) collected.set(message.id, message);
		return collected;
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
	public send(data: MessageOptions, options: SplitOptions): Promise<Message[]>;
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
	public send(data: (message: MessageBuilder) => MessageBuilder, options: SplitOptions): Promise<Message[]>;
	public async send(data: MessageOptions | ((message: MessageBuilder) => MessageBuilder), options: SplitOptions): Promise<Message[]> {
		// @ts-expect-error
		return this.messages.add(data, options);
	}

	protected _patch(data: APIChannelData): this {
		this.topic = data.topic ?? null;
		this.nsfw = data.nsfw as boolean;
		this.lastMessageID = data.last_message_id ?? null;
		this.lastPinTimestamp = data.last_pin_timestamp ?? null;
		return super._patch(data);
	}

}
