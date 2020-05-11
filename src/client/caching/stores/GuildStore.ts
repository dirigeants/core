import { DataStore } from './base/DataStore';
import { extender } from '../../../util/Extender';

import type { Guild } from '../structures/guilds/Guild';
import type { Client } from '../../Client';

export class GuildStore extends DataStore<Guild> {

	public constructor(client: Client) {
		super(client, extender.get('Guild'));
	}

}
