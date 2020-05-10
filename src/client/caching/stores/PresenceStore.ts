import { DataStore, Constructor } from './base/DataStore';
import { Presence } from '../structures/guilds/Presence';

import type { Client } from '../../Client';

export class PresenceStore extends DataStore<Presence> {

	public constructor(client: Client) {
		super(client, Presence as Constructor<Presence>);
	}

}
