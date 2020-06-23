import { Action, Channel, isGuildChannel, DMChannel } from '@klasa/core';

import type { ChannelCreateDispatch } from '@klasa/ws';

export default class CoreAction extends Action {

	public check(data: ChannelCreateDispatch): Channel | null {
		const guild = data.d.guild_id ? this.client.guilds.get(data.d.guild_id) : undefined;
		return (guild ? guild.channels.get(data.d.id) : this.client.dms.get(data.d.id)) ?? null;
	}

	public build(data: ChannelCreateDispatch): Channel | null {
		return Channel.create(this.client, data.d);
	}

	public cache(data: Channel): void {
		if (this.client.options.cache.enabled) {
			this.client.channels.set(data.id, data);
			if (isGuildChannel(data)) {
				if (data.guild) data.guild.channels.set(data.id, data);
			} else {
				this.client.dms.set(data.id, data as DMChannel);
			}
		}
	}

}
