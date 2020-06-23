import { Action, Channel, isGuildChannel, GuildBasedChannel, DMChannel } from '@klasa/core';

import type { ChannelCreateDispatch } from '@klasa/ws';

export default class CoreAction extends Action {

	public check(): null {
		return null;
	}

	public build(data: ChannelCreateDispatch): GuildBasedChannel | DMChannel | null {
		return Channel.create(this.client, data.d, data.d.guild_id && this.client.guilds.get(data.d.guild_id)) as GuildBasedChannel | DMChannel | null;
	}

	public cache(data: GuildBasedChannel | DMChannel): void {
		if (this.client.options.cache.enabled) {
			this.client.channels.set(data.id, data);
			if (isGuildChannel(data)) {
				if (data.guild) data.guild.channels.set(data.id, data);
			} else {
				this.client.dms.set(data.id, data);
			}
		}
	}

}
