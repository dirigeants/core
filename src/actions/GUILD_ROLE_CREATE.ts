import { Action, extender, Role } from '@klasa/core';

import type { GuildRoleCreateDispatch } from '@klasa/ws';

export default class CoreAction extends Action {

	public check(): null {
		return null;
	}

	public build(data: GuildRoleCreateDispatch): Role | null {
		const guild = this.client.guilds.get(data.d.guild_id);
		if (!guild) return null;

		return new (extender.get('Role'))(this.client, data.d.role, guild);
	}

	public cache(data: Role): void {
		if (this.client.options.cache.enabled) {
			if (data.guild) data.guild.roles.set(data.id, data);
		}
	}

}
