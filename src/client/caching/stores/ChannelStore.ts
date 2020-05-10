import { DataStore, Constructor } from './base/DataStore';
import { Client } from '../../Client';
import { Channel } from '../structures/channels/Channel';

export class ChannelStore extends DataStore<Channel> {

	public constructor(client: Client) {
		super(client, Channel as Constructor<Channel>);
	}

}
