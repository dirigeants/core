import { ChannelType, APIChannelData } from '@klasa/dapi-types';
import { GuildChannel } from './GuildChannel';

/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
export class VoiceChannel extends GuildChannel {

	/**
	 * The type of channel.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/channel#channel-object-channel-types
	 */
	public readonly type = ChannelType.GuildVoice;

	/**
	 * The bitrate (in bits) of the voice channel.
	 * @since 0.0.1
	 */
	public bitrate!: number;

	/**
	 * The user limit of the voice channel.
	 * @since 0.0.1
	 */
	public userLimit!: number;

	protected _patch(data: APIChannelData): this {
		this.bitrate = data.bitrate as number;
		this.userLimit = data.user_limit as number;
		return super._patch(data);
	}

}
