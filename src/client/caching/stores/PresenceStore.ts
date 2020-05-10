import { DataStore } from './base/DataStore';
import { Presence } from '../structures/guilds/Presence';

import type { Client } from '../../Client';

export class PresenceStore extends DataStore<Presence, typeof Presence> {

	public constructor(client: Client) {
		super(client, Presence);
	}

}
