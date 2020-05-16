import { Action } from '../../../lib/structures/Action';
import { extender } from '../../../util/Extender';

import type { GuildBanAddDispatch } from '@klasa/ws';
import type { Ban } from '../../../client/caching/structures/guilds/Ban';

export default class CoreAction extends Action {

	public check(): null {
		return null;
	}

	public build(data: GuildBanAddDispatch): Ban | null {
		const guild = this.client.guilds.get(data.d.guild_id);
		return guild ? new (extender.get('Ban'))(this.client, data.d, guild) : null;
	}

	public cache(data: Ban): void {
		data.guild.bans.delete(data.id);
	}

}
