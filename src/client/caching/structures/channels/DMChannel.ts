import { APIChannelData, ChannelType, APIUserData } from '@klasa/dapi-types';
import { Channel } from './Channel';
import { MessageStore } from '../../stores/MessageStore';

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
	public recipients!: APIUserData[];

	/**
	 * The message store for this channel.
	 * @since 0.0.1
	 */
	public readonly messages: MessageStore;

	public constructor(client: Client, data: APIChannelData) {
		super(client, data);
		this.messages = new MessageStore(client);
	}

	protected _patch(data: APIChannelData): this {
		this.lastMessageID = data.last_message_id as string | null;
		this.recipients = data.recipients as APIUserData[];
		return this;
	}

}
