import { DataStore } from './base/DataStore';
import { extender } from '../../../util/Extender';

import type { User } from '../structures/User';
import type { Client } from '../../Client';

export class UserStore extends DataStore<User> {

	public constructor(client: Client) {
		super(client, extender.get('User'), client.options.cache.limits.users);
	}

}
