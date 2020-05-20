import { ChannelType, APIChannelData } from '@klasa/dapi-types';
import { GuildChannel, ChannelModfiyOptions } from './GuildChannel';

import type { RequestOptions } from '@klasa/rest';

/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
export class StoreChannel extends GuildChannel {

	/**
	 * The type of channel.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/channel#channel-object-channel-types
	 */
	public readonly type = ChannelType.GuildStore;

	/**
	 * Whether or not the channel is nsfw.
	 * @since 0.0.1
	 */
	public nsfw!: boolean;

	public modify(options: StoreChannelModifyOptions, requestOptions: RequestOptions = {}): Promise<this> {
		return super.modify(options, requestOptions);
	}

	protected _patch(data: APIChannelData): this {
		this.nsfw = data.nsfw as boolean;
		return super._patch(data);
	}

}

interface StoreChannelModifyOptions extends ChannelModfiyOptions {
	nsfw?: boolean | null;
	parent_id?: string | null;
}