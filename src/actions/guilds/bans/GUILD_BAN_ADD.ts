import { Action } from '../../../lib/pieces/Action';
import { extender } from '../../../lib/util/Extender';

import type { GuildBanAddDispatch } from '@klasa/ws';
import type { Ban } from '../../../lib/caching/structures/guilds/Ban';

export default class CoreAction extends Action {

	public check(): null {
		return null;
	}

	public build(data: GuildBanAddDispatch): Ban | null {
		const guild = this.client.guilds.get(data.d.guild_id);
		return guild ? new (extender.get('Ban'))(this.client, data.d, guild) : null;
	}

	public cache(data: Ban): void {
		data.guild.bans.set(data.id, data);
	}

}
