import { Action } from '../lib/structures/Action';
import { extender } from '../util/Extender';

import type { UserUpdateDispatch } from '@klasa/ws';
import type { User } from '../client/caching/structures/User';

export default class CoreAction extends Action {

	public check(data: UserUpdateDispatch): User | null {
		return this.client.users.get(data.d.id) ?? null;
	}

	public build(data: UserUpdateDispatch): User {
		return new (extender.get('User'))(this.client, data.d);
	}

	public cache(data: User): void {
		this.client.users.set(data.id, data);
	}

}
