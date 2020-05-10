import { Constructor, DataStore } from './base/DataStore';
import { GuildChannel } from '../structures/channels/GuildChannel';

import type { Client } from '../../Client';

export class GuildChannelStore extends DataStore<GuildChannel> {

	public constructor(client: Client) {
		super(client, GuildChannel as Constructor<GuildChannel>);
	}

}
