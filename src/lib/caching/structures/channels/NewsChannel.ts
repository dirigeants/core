import { ChannelType, APIMessageData } from '@klasa/dapi-types';
import { Routes, RequestOptions } from '@klasa/rest';
import { GuildTextChannel } from './GuildTextChannel';
import { Message } from '../Message';

import type { ChannelModifyOptions } from './GuildChannel';

/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
export class NewsChannel extends GuildTextChannel {

	/**
	 * The type of channel.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/channel#channel-object-channel-types
	 */
	public readonly type = ChannelType.GuildAnnouncement;

	/**
	 * Crossposts a Message in this channel.
	 * @param messageID The ID of the {@link Message message} that should be crossposted.
	 * @since 0.0.1
	 */
	public async crosspost(messageID: string): Promise<Message> {
		const messageData = await this.client.api.post(Routes.crosspostMessage(this.id, messageID)) as APIMessageData;
		const newMsg = new Message(this.client, messageData);
		this.messages.set(messageID, newMsg);
		return newMsg;
	}

	/**
	 * Modifies this channel.
	 * @param data The channel modify options.
	 * @param requestOptions The request options.
	 * @since 0.0.1
	 */
	public modify(options: NewsChannelModifyOptions, requestOptions: RequestOptions = {}): Promise<this> {
		return super.modify(options, requestOptions);
	}

}

export interface NewsChannelModifyOptions extends ChannelModifyOptions {
	type?: ChannelType.GuildAnnouncement | ChannelType.GuildText;
	topic?: string | null;
	nsfw?: boolean;
	parent_id?: string | null;
}
