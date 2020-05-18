import { Action } from '../../lib/structures/Action';
import { isGuildChannel, GuildBasedChannel } from '../../util/Util';

import type { ChannelCreateDispatch } from '@klasa/ws';
import type { DMChannel } from '../../client/caching/structures/channels/DMChannel';

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
		if (isGuildChannel(data)) data.guild.channels.delete(data.id);
		else this.client.dms.delete(data.id);
	}

}
