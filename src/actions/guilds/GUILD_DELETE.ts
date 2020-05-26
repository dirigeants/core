import { Action, Guild } from '@klasa/core';

import type { GuildDeleteDispatch } from '@klasa/ws';

export default class CoreAction extends Action {

	public check(data: GuildDeleteDispatch): Guild | null {
		return this.client.guilds.get(data.d.id) ?? null;
	}

	public build(): null {
		return null;
	}

	public cache(data: Guild): void {
		data.deleted = true;
		this.client.guilds.delete(data.id);
	}

}
