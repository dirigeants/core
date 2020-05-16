import { APIChannelData, ChannelType, APIUserData } from '@klasa/dapi-types';
import { Routes } from '@klasa/rest';
import { Channel } from './Channel';
import { MessageStore } from '../../stores/MessageStore';

import type { MessageBuilder } from '../messages/MessageBuilder';
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
	 * @param content The {@link MessageBuilder builder} to send.
	 * @since 0.0.1
	 */
	public async send(content: MessageBuilder): Promise<this> {
		const data = await this.client.api.post(Routes.channelMessages(this.id), content);
		// eslint-disable-next-line dot-notation
		return new this.client.dms['Holds'](this.client, data) as this;
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
