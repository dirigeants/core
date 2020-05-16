import { Routes } from '@klasa/rest';
import { GuildChannel } from './GuildChannel';
import { MessageStore } from '../../../caching/stores/MessageStore';

import type { APIChannelData } from '@klasa/dapi-types';
import type { MessageBuilder } from '../messages/MessageBuilder';
import type { Guild } from '../guilds/Guild';
import type { Client } from '../../../Client';

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
		this.messages = new MessageStore(client);
	}

	/**
	 * Sends a message to the channel.
	 * @param content The {@link MessageBuilder builder} to send.
	 * @since 0.0.1
	 */
	public async send(content: MessageBuilder): Promise<this> {
		const data = await this.client.api.post(Routes.channelMessages(this.id), content);
		// eslint-disable-next-line dot-notation
		return new this.guild.channels['Holds'](this.client, data, this.guild) as this;
	}

	protected _patch(data: APIChannelData): this {
		this.topic = data.topic ?? null;
		this.nsfw = data.nsfw as boolean;
		this.lastMessageID = data.last_message_id ?? null;
		this.lastPinTimestamp = data.last_pin_timestamp ?? null;
		return super._patch(data);
	}

}
