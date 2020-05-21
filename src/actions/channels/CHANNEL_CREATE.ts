import { Action } from '../../lib/pieces/Action';
import { Channel } from '../../lib/caching/structures/channels/Channel';
import { isGuildChannel, GuildBasedChannel } from '../../lib/util/Util';

import type { ChannelCreateDispatch } from '@klasa/ws';
import type { DMChannel } from '../../lib/caching/structures/channels/DMChannel';

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
			if (isGuildChannel(data)) data.guild.channels.set(data.id, data);
			else this.client.dms.set(data.id, data);
		}
	}

}
