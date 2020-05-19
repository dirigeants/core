import { Action } from '../lib/pieces/Action';

import type { GuildIntegrationsUpdateDispatch } from '@klasa/ws';
import type { Guild } from '../lib/caching/structures/guilds/Guild';

export default class CoreAction extends Action {

	public check(data: GuildIntegrationsUpdateDispatch): Guild | null {
		return this.client.guilds.get(data.d.guild_id) ?? null;
	}

	public build(): null {
		return null;
	}

	public cache(): void {
		// noop
	}

}
