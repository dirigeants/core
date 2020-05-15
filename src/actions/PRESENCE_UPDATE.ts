import { Action } from '../lib/structures/Action';
import { extender } from '../util/Extender';

import type { PresenceUpdateDispatch } from '@klasa/ws';
import type { Presence } from '../client/caching/structures/guilds/Presence';

export default class CoreAction extends Action {

	public check(data: PresenceUpdateDispatch): Presence | null {
		return this.client.guilds.get(data.d.guild_id)?.presences.get(data.d.user.id) ?? null;
	}

	public build(data: PresenceUpdateDispatch): Presence | null {
		const guild = this.client.guilds.get(data.d.guild_id);
		return guild ? new (extender.get('Presence'))(this.client, data.d, guild) : null;
	}

	public cache(data: Presence): void {
		data.guild.presences.set(data.id, data);
	}

}
