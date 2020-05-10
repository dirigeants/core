import { Structure } from '../base/Structure';

import type { APIChannelPartial, ChannelType } from '@klasa/dapi-types';
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

}
