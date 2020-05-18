/* eslint-disable no-dupe-class-members */
import { APIChannelData, ChannelType, APIUserData } from '@klasa/dapi-types';
import { Channel } from './Channel';
import { MessageStore } from '../../stores/MessageStore';
import { MessageBuilder, MessageOptions, SplitOptions } from '../messages/MessageBuilder';

import type { User } from '../User';
import type { Client } from '../../../Client';
import type { Message } from '../Message';
import { RequestOptions } from '@klasa/rest';
import { EventIteratorOptions } from '@klasa/event-iterator';
import { MessageIterator } from '../../../../lib/structures/MessageIterator';

/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
export class DMChannel extends Channel {

	/**
	 * The type of channel.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/channel#channel-object-channel-types
	 */
	public readonly type = ChannelType.DM;

	/**
	 * The id of the last message sent in this channel (may not point to an existing or valid message).
	 * @since 0.0.1
	 */
	public lastMessageID!: string | null;

	/**
	 * The recipients of the DM.
	 * @since 0.0.1
	 */
	public recipients!: User[];

	/**
	 * The message store for this channel.
	 * @since 0.0.1
	 */
	public readonly messages: MessageStore;

	/**
	 * Whether the DM channel is deleted.
	 * @since 0.0.1
	 */
	public deleted = false;

	public constructor(client: Client, data: APIChannelData) {
		super(client, data);
		this.messages = new MessageStore(client, this);
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

	/**
	 * Closes the channel.
	 * @since 0.0.1
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/channel#deleteclose-channel
	 */
	public async remove(requestOptions: RequestOptions = {}): Promise<this> {
		await this.client.dms.remove(this.id, requestOptions);
		this.deleted = true;
		return this;
	}

	public createMessageIterator(limit: number, options: EventIteratorOptions<Message> = {}): MessageIterator {
		return new MessageIterator(this, limit, options);
	}

	protected _patch(data: APIChannelData): this {
		// eslint-disable-next-line dot-notation
		this.recipients = (data.recipients as APIUserData[]).map(user => this.client.users['_add'](user));
		this.lastMessageID = data.last_message_id as string | null;
		return this;
	}

}

export interface DMChannel {
	client: Client;
}
