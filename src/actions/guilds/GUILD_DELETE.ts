import { Action } from '../../lib/structures/Action';

import type { GuildDeleteDispatch } from '@klasa/ws';
import type { Guild } from '../../client/caching/structures/guilds/Guild';

export default class CoreAction extends Action {

	public check(data: GuildDeleteDispatch): Guild | null {
		return this.client.guilds.get(data.d.id) ?? null;
	}

	public build(): null {
		return null;
	}

	public cache(data: Guild): void {
		this.client.guilds.delete(data.id);
	}

}
