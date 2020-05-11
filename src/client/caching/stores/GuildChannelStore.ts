import { DataStore } from './base/DataStore';
import { GuildChannel } from '../structures/channels/GuildChannel';
import { extender } from '../../../util/Extender';

import type { Client } from '../../Client';

export class GuildChannelStore extends DataStore<GuildChannel> {

	public constructor(client: Client) {
		super(client, extender.get('GuildChannel'));
	}

}
