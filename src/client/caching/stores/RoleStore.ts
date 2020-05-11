import { DataStore } from './base/DataStore';
import { extender } from '../../../util/Extender';

import type { Role } from '../structures/guilds/Role';
import type { Client } from '../../Client';

export class RoleStore extends DataStore<Role> {

	public constructor(client: Client) {
		super(client, extender.get('Role'));
	}

}
