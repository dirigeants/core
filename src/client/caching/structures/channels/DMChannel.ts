/* eslint-disable no-dupe-class-members */
import { APIChannelData, ChannelType, APIUserData, APIMessageData } from '@klasa/dapi-types';
import { Routes } from '@klasa/rest';
import { Channel } from './Channel';
import { MessageStore } from '../../stores/MessageStore';
import { MessageBuilder, MessageOptions, SplitOptions } from '../messages/MessageBuilder';
import { Message } from '../Message';

import type { User } from '../User';
import type { Client } from '../../../Client';

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

	public constructor(client: Client, data: APIChannelData) {
		super(client, data);
		this.messages = new MessageStore(client);
	}

	/**
	 * Sends a message to the channel.
	 * @param data The {@link MessageBuilder builder} to send.
	 * @param options The split options for the message.
	 * @since 0.0.1
	 */
	public async send(data: MessageOptions, options: SplitOptions): Promise<Message[]>
	public async send(data: (message: MessageBuilder) => MessageBuilder, options: SplitOptions): Promise<Message[]>
	public async send(data: MessageOptions | ((message: MessageBuilder) => MessageBuilder), options: SplitOptions): Promise<Message[]> {
		const split = (typeof data === 'function' ? data(new MessageBuilder()) : new MessageBuilder(data)).split(options);

		const endpoint = Routes.channelMessages(this.id);
		const responses = [];

		for (const message of split) responses.push(this.client.api.post(endpoint, message));

		const rawMessages = await Promise.all(responses);

		// eslint-disable-next-line dot-notation
		return rawMessages.map(msg => this.messages['_add'](msg as APIMessageData));
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
