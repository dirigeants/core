import { Action } from '../../lib/structures/Action';
import { Channel } from '../../client/caching/structures/channels/Channel';
import { isGuildChannel } from '../../util/Util';

import type { ChannelCreateDispatch } from '@klasa/ws';

export default class CoreAction extends Action {

	public check(data: ChannelCreateDispatch): Channel | null {
		const guild = data.d.guild_id ? this.client.guilds.get(data.d.guild_id) : undefined;
		return (guild ? guild.channels.get(data.d.id) : this.client.dms.get(data.d.id)) ?? null;
	}

	public build(): Channel | null {
		return null;
	}

	public cache(data: Channel): void {
		if (isGuildChannel(data)) data.guild.channels.delete(data.id);
		else this.client.dms.delete(data.id);
	}

}
