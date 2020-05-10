import { DataStore, Constructor } from './base/DataStore';
import { Ban } from '../structures/guilds/Ban';

import type { Client } from '../../Client';

export class BanStore extends DataStore<Ban> {

	public constructor(client: Client) {
		super(client, Ban as Constructor<Ban>);
	}

}
