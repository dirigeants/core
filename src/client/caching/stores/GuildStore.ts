import { DataStore } from './base/DataStore';
import { Guild } from '../structures/guilds/Guild';

import type { Client } from '../../Client';

export class GuildStore extends DataStore<Guild, typeof Guild> {

	public constructor(client: Client) {
		super(client, Guild);
	}

}
