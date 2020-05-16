import { Action } from '../lib/structures/Action';
import { extender } from '../util/Extender';

import type { InviteCreateDispatch } from '@klasa/ws';
import type { Invite } from '../client/caching/structures/guilds/Invite';

export default class CoreAction extends Action {

	public check(): null {
		return null;
	}

	public build(data: InviteCreateDispatch): Invite {
		return new (extender.get('Invite'))(this.client, data.d);
	}

	public cache(): void {
		// noop
	}

}
