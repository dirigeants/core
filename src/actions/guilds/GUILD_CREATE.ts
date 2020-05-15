import { Action } from '../../lib/structures/Action';
import { extender } from '../../util/Extender';

import type { GuildCreateDispatch } from '@klasa/ws';
import type { Guild } from '../../client/caching/structures/guilds/Guild';

export default class CoreAction extends Action {

	public check(): null {
		return null;
	}

	public build(data: GuildCreateDispatch): Guild {
		return new (extender.get('Guild'))(this.client, data.d);
	}

	public cache(data: Guild): void {
		this.client.guilds.set(data.id, data);
	}

}
