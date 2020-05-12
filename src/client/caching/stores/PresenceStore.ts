import { DataStore } from './base/DataStore';
import { extender } from '../../../util/Extender';

import type { Presence } from '../structures/guilds/Presence';
import type { Client } from '../../Client';

export class PresenceStore extends DataStore<Presence> {

	public constructor(client: Client) {
		super(client, extender.get('Presence'));
	}

}
