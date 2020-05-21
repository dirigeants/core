import { Action } from '../lib/pieces/Action';
import { extender } from '../lib/util/Extender';

import type { InviteDeleteDispatch } from '@klasa/ws';
import type { Invite } from '../lib/caching/structures/Invite';

export default class CoreAction extends Action {

	public check(): null {
		return null;
	}

	public build(data: InviteDeleteDispatch): Invite | null {
		const guild = data.d.guild_id ? this.client.guilds.get(data.d.guild_id) : null;
		const channel = (guild ? guild.channels.get(data.d.channel_id) : this.client.dms.get(data.d.channel_id)) ?? { id: data.d.channel_id };
		return new (extender.get('Invite'))(this.client, { ...data, guild, channel });
	}

	public cache(data: Invite): void {
		this.client.invites.delete(data.id);
		if (data.guild) data.guild.invites.delete(data.id);
	}

}
