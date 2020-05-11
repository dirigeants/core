import { ChannelType, APIChannelData } from '@klasa/dapi-types';
import { GuildChannel } from './GuildChannel';

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

	protected _patch(data: APIChannelData): this {
		this.nsfw = data.nsfw as boolean;
		return this._patch(data);
	}

}
