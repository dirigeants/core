import { DataStore } from './base/DataStore';
import { Client } from '../../Client';
import { Guild } from '../structures/Guild';

export class GuildStore extends DataStore<Guild, typeof Guild> {

	public constructor(client: Client) {
		super(client, Guild);
	}

}
