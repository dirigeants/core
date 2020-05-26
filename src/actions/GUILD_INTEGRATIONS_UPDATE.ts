import { Action, Guild } from '@klasa/core';

import type { GuildIntegrationsUpdateDispatch } from '@klasa/ws';

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
