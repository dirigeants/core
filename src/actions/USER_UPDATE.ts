import { Action } from '../lib/pieces/Action';
import { extender } from '../lib/util/Extender';

import type { UserUpdateDispatch } from '@klasa/ws';
import type { User } from '../lib/caching/structures/User';

export default class CoreAction extends Action {

	public check(data: UserUpdateDispatch): User | null {
		return this.client.users.get(data.d.id) ?? null;
	}

	public build(data: UserUpdateDispatch): User {
		return new (extender.get('User'))(this.client, data.d);
	}

	public cache(data: User): void {
		if (this.client.options.cache.enabled) {
			this.client.users.set(data.id, data);
		}
	}

}
