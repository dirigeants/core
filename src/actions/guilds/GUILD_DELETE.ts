import { Action } from '../../lib/pieces/Action';

import type { GuildDeleteDispatch } from '@klasa/ws';
import type { Guild } from '../../lib/caching/structures/guilds/Guild';

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
