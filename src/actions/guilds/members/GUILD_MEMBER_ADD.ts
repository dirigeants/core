import { Action, extender, GuildMember } from '@klasa/core';

import type { GuildMemberAddDispatch } from '@klasa/ws';

export default class CoreAction extends Action {

	public check(): null {
		return null;
	}

	public build(data: GuildMemberAddDispatch): GuildMember | null {
		const guild = this.client.guilds.get(data.d.guild_id);
		return guild ? new (extender.get('GuildMember'))(this.client, data.d, guild) : null;
	}

	public cache(data: GuildMember): void {
		if (data.guild) {
			data.guild.members.set(data.id, data);
			if (data.guild.memberCount !== null) ++data.guild.memberCount;
		}
	}

}
