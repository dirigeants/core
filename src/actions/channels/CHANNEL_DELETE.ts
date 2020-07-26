import { Action, isGuildChannel, GuildBasedChannel, DMChannel } from '@klasa/core';

import type { ChannelCreateDispatch } from '@klasa/ws';

export default class CoreAction extends Action {

	public check(data: ChannelCreateDispatch): GuildBasedChannel | DMChannel | null {
		const guild = data.d.guild_id ? this.client.guilds.get(data.d.guild_id) : undefined;
		return (guild ? guild.channels.get(data.d.id) : this.client.dms.get(data.d.id)) ?? null;
	}

	public build(): null {
		return null;
	}

	public cache(data: GuildBasedChannel | DMChannel): void {
		data.deleted = true;
		this.client.channels.delete(data.id);
		if (isGuildChannel(data)) {
			if (data.guild) data.guild.channels.delete(data.id);
		} else {
			this.client.dms.delete(data.id);
		}
	}

}
