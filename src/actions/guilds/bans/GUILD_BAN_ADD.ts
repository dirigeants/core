import { Action, extender, Ban } from '@klasa/core';

import type { GuildBanAddDispatch } from '@klasa/ws';

export default class CoreAction extends Action {

	public check(): null {
		return null;
	}

	public build(data: GuildBanAddDispatch): Ban | null {
		const guild = this.client.guilds.get(data.d.guild_id);
		return guild ? new (extender.get('Ban'))(this.client, data.d, guild) : null;
	}

	public cache(data: Ban): void {
		if (this.client.options.cache.enabled) {
			if (data.guild) data.guild.bans.set(data.id, data);
		}
	}

}
