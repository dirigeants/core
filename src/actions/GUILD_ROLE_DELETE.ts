import { Action, Role } from '@klasa/core';

import type { GuildRoleDeleteDispatch } from '@klasa/ws';

export default class CoreAction extends Action {

	public check(data: GuildRoleDeleteDispatch): Role | null {
		return this.client.guilds.get(data.d.guild_id)?.roles.get(data.d.role_id) ?? null;
	}

	public build(): null {
		return null;
	}

	public cache(data: Role): void {
		data.deleted = true;
		data.guild.roles.delete(data.id);
	}

}
