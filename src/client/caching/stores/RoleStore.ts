import { DataStore, Constructor } from './base/DataStore';
import { Role } from '../structures/guilds/Role';

import type { Client } from '../../Client';

export class RoleStore extends DataStore<Role> {

	public constructor(client: Client) {
		super(client, Role as Constructor<Role>);
	}

}
