import { Action } from '../../../lib/structures/Action';
import { extender } from '../../../util/Extender';

import type { GuildMemberAddDispatch } from '@klasa/ws';
import type { GuildMember } from '../../../client/caching/structures/guilds/GuildMember';

export default class CoreAction extends Action {

	public check(): null {
		return null;
	}

	public build(data: GuildMemberAddDispatch): GuildMember | null {
		const guild = this.client.guilds.get(data.d.guild_id);
		return guild ? new (extender.get('GuildMember'))(this.client, data.d, guild) : null;
	}

	public cache(data: GuildMember): void {
		data.guild.members.set(data.id, data);
		++data.guild.memberCount;
	}

}
