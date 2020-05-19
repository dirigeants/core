import { Action } from '../../../lib/pieces/Action';
import { extender } from '../../../lib/util/Extender';

import type { GuildMemberUpdateDispatch } from '@klasa/ws';
import type { GuildMember } from '../../../lib/caching/structures/guilds/GuildMember';

export default class CoreAction extends Action {

	public check(data: GuildMemberUpdateDispatch): GuildMember | null {
		const guild = this.client.guilds.get(data.d.guild_id);
		return guild?.members.get(data.d.user.id) ?? null;
	}

	public build(data: GuildMemberUpdateDispatch): GuildMember | null {
		const guild = this.client.guilds.get(data.d.guild_id);
		return guild ? new (extender.get('GuildMember'))(this.client, data.d, guild) : null;
	}

	public cache(): void {
		// noop
	}

}
