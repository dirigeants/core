import { Action, extender, Invite } from '@klasa/core';

import type { InviteCreateDispatch } from '@klasa/ws';

export default class CoreAction extends Action {

	public check(): null {
		return null;
	}

	public build(data: InviteCreateDispatch): Invite {
		const guild = data.d.guild_id ? this.client.guilds.get(data.d.guild_id) : null;
		const channel = this.client.channels.get(data.d.channel_id);
		return new (extender.get('Invite'))(this.client, data, channel, guild);
	}

	public cache(data: Invite): void {
		if (this.client.options.cache.enabled) {
			this.client.invites.set(data.id, data);
			if (data.guild) data.guild.invites.set(data.id, data);
		}
	}

}
