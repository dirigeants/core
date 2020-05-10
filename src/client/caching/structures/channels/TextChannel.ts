import { GuildTextChannel } from './GuildTextChannel';
import { APIChannelData, ChannelType } from '@klasa/dapi-types';

/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
export class TextChannel extends GuildTextChannel {

	/**
	 * The type of channel.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/channel#channel-object-channel-types
	 */
	public readonly type = ChannelType.GuildText;

	/**
	 * Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the
	 * permission `MANAGE_MESSAGES` or `MANAGE_CHANNEL`, are unaffected.
	 * @since 0.0.1
	 */
	public rateLimitPerUser!: number;

	protected _patch(data: APIChannelData): this {
		this.rateLimitPerUser = data.rate_limit_per_user as number;
		return super._patch(data);
	}

}
