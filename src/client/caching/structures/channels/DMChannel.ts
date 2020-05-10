import { Channel } from './Channel';

import { APIChannelData, ChannelType, APIUserData } from '@klasa/dapi-types';

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

	protected _patch(data: APIChannelData): this {
		this.lastMessageID = data.last_message_id as string | null;
		this.recipients = data.recipients as APIUserData[];
		return this;
	}

}
