import { ChannelType, APIChannelFollowResult } from '@klasa/dapi-types';
import { GuildTextChannel } from './GuildTextChannel';

import type { ChannelModifyOptions } from './GuildChannel';
import { RequestOptions, Routes } from '@klasa/rest';

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
	 * Follows this channel.
	 * @param webhookChannel
	 * @since 0.0.1
	 */
	public async follow(webhookChannel: GuildTextChannel): Promise<APIChannelFollowResult> {
		const reqData = {
			data: {
				webhook_channel_id: webhookChannel.id
			}
		};
		return this.client.api.post(Routes.followChannel(this.id), reqData) as unknown as APIChannelFollowResult;
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
