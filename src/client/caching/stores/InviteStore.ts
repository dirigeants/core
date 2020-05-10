import { DataStore } from './base/DataStore';
import { Invite } from '../structures/guilds/Invite';

import type { Client } from '../../Client';

export class InviteStore extends DataStore<Invite, typeof Invite> {

	public constructor(client: Client) {
		super(client, Invite);
	}

}
