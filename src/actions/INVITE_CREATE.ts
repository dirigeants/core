import { Action } from '../lib/pieces/Action';
import { extender } from '../lib/util/Extender';

import type { InviteCreateDispatch } from '@klasa/ws';
import type { Invite } from '../lib/caching/structures/Invite';

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
