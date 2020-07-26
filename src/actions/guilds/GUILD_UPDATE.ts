import { Action, extender, Guild } from '@klasa/core';

import type { GuildCreateDispatch } from '@klasa/ws';

export default class CoreAction extends Action {

	public check(data: GuildCreateDispatch): Guild | null {
		return this.client.guilds.get(data.d.id) ?? null;
	}

	public build(data: GuildCreateDispatch): Guild {
		// eslint-disable-next-line camelcase
		return new (extender.get('Guild'))(this.client, data.d, data.shard_id);
	}

	public cache(data: Guild): void {
		if (this.client.options.cache.enabled) {
			this.client.guilds.set(data.id, data);
		}
	}

}
