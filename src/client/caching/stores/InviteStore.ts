import { DataStore } from './base/DataStore';
import { extender } from '../../../util/Extender';

import type { Invite } from '../structures/guilds/Invite';
import type { Client } from '../../Client';

export class InviteStore extends DataStore<Invite> {

	public constructor(client: Client) {
		super(client, extender.get('Invite'));
	}

}
