import { Action } from '../../../lib/pieces/Action';

import type { GuildMemberRemoveDispatch } from '@klasa/ws';
import type { GuildMember } from '../../../lib/caching/structures/guilds/GuildMember';

export default class CoreAction extends Action {

	public check(data: GuildMemberRemoveDispatch): GuildMember | null {
		const guild = this.client.guilds.get(data.d.guild_id);
		if (!guild) return null;

		--guild.memberCount;
		return guild.members.get(data.d.user.id as string) ?? null;
	}

	public build(): GuildMember | null {
		return null;
	}

	public cache(data: GuildMember): void {
		data.deleted = true;
		data.guild.members.delete(data.id);
	}

}
