import { Action } from '../../lib/pieces/Action';
import { extender } from '../../lib/util/Extender';

import type { GuildCreateDispatch } from '@klasa/ws';
import type { Guild } from '../../lib/caching/structures/guilds/Guild';

export default class CoreAction extends Action {

	public check(data: GuildCreateDispatch): Guild | null {
		return this.client.guilds.get(data.d.id) ?? null;
	}

	public build(data: GuildCreateDispatch): Guild {
		return new (extender.get('Guild'))(this.client, data.d);
	}

	public cache(data: Guild): void {
		if (this.client.options.cache.enabled) {
			this.client.guilds.set(data.id, data);
		}
	}

}
