import { Action } from '../../../lib/structures/Action';

import type { GuildBanAddDispatch } from '@klasa/ws';
import type { Ban } from '../../../client/caching/structures/guilds/Ban';

export default class CoreAction extends Action {

	public check(data: GuildBanAddDispatch): Ban | null {
		const guild = this.client.guilds.get(data.d.guild_id);
		return guild?.bans.get(data.d.user.id) ?? null;
	}

	public build(): null {
		return null;
	}

	public cache(data: Ban): void {
		data.guild.bans.delete(data.id);
	}

}
