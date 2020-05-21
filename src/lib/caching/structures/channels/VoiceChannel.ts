import { ChannelType, APIChannelData } from '@klasa/dapi-types';
import { GuildChannel, ChannelModifyOptions } from './GuildChannel';

import type { RequestOptions } from '@klasa/rest';
import { Permissions } from '../../../util/bitfields/Permissions';

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

	/**
	 * If the client can delete the channel.
	 * @since 0.0.1
	 */
	public get deletable(): boolean | null {
		return !this.deleted && this.manageable;
	}

	/**
	 * If the client can manage the channel.
	 * @since 0.0.1
	 */
	public get manageable(): boolean | null {
		const { me } = this.guild;
		if (!me) return null;
		return this.permissionsFor(me).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.MANAGE_CHANNELS]);
	}

	public modify(data: VoiceChannelModifyOptions, requestOptions: RequestOptions = {}): Promise<this> {
		return super.modify(data, requestOptions);
	}

	protected _patch(data: APIChannelData): this {
		this.bitrate = data.bitrate as number;
		this.userLimit = data.user_limit as number;
		return super._patch(data);
	}

}

export interface VoiceChannelModifyOptions extends ChannelModifyOptions {
	bitrate?: number | null;
	user_limit?: number | null;
	parent_id?: string | null;
}
