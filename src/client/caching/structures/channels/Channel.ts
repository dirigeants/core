import { APIChannelPartial, ChannelType, APIChannelData } from '@klasa/dapi-types';
import { Structure } from '../base/Structure';
import { extender, ExtenderStructures } from '../../../../util/Extender';
import { ClientEvents } from '../../../../util/types/Util';

import type { Client } from '../../../Client';

/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
export abstract class Channel extends Structure {

	/**
	 * The ID of this channel.
	 * @since 0.0.1
	 */
	public readonly id: string;

	/**
	 * The type of channel.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/channel#channel-object-channel-types
	 */
	public readonly abstract type: ChannelType;

	public constructor(client: Client, data: APIChannelPartial) {
		super(client);
		this.id = data.id;
		this._patch(data);
	}

	public static create(client: Client, data: APIChannelData): Channel | null {
		const name = Channel.types.get(data.type);
		if (name) return new (extender.get(name))(client, data) as Channel;

		client.emit(ClientEvents.Debug, `[Channels] Received data with unknown type '${data.type}'.\n\tPayload: ${JSON.stringify(data)}`);
		return null;
	}

	private static readonly types = new Map<ChannelType, keyof ExtenderStructures>([
		[ChannelType.GuildText, 'TextChannel'],
		[ChannelType.DM, 'DMChannel'],
		[ChannelType.GuildVoice, 'VoiceChannel'],
		[ChannelType.GroupDM, 'Channel'],
		[ChannelType.GuildCategory, 'CategoryChannel'],
		[ChannelType.GuildAnnouncement, 'NewsChannel'],
		[ChannelType.GuildStore, 'StoreChannel']
	]);

}
