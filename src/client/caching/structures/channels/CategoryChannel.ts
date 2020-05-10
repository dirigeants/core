import { GuildChannel } from './GuildChannel';
import { ChannelType } from '@klasa/dapi-types';

/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
export class CategoryChannel extends GuildChannel {

	/**
	 * The type of channel.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/channel#channel-object-channel-types
	 */
	public readonly type = ChannelType.GuildCategory;

}
