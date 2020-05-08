import { DataStore } from './base/DataStore';
import { Client } from '../../Client';
import { GuildChannel } from '../structures/channels/GuildChannel';

export class ChannelStore extends DataStore<GuildChannel, typeof GuildChannel> {

	public constructor(client: Client) {
		super(client, GuildChannel);
	}

}
