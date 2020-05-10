import { DataStore } from './base/DataStore';
import { Client } from '../../Client';
import { Channel } from '../structures/channels/Channel';

export class ChannelStore extends DataStore<Channel, typeof Channel> {

	public constructor(client: Client) {
		super(client, Channel);
	}

}
