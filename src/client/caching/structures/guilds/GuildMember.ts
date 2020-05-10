import { Structure } from '../base/Structure';

import type { APIGuildMemberData, APIUserData } from '@klasa/dapi-types';
import type { Client } from '../../../Client';

export class GuildMember extends Structure {

	public id: string;
	public deaf!: boolean;
	public joinedTimestamp!: number | null;
	public mute!: boolean;
	public nick!: string | null;
	public premiumSince!: number | null;
	public roleIDs!: string[];

	public constructor(client: Client, data: APIGuildMemberData) {
		super(client);

		this.id = (data.user as APIUserData).id;
		this._patch(data);
	}

	_patch(data: APIGuildMemberData): this {
		this.deaf = data.deaf;
		this.joinedTimestamp = new Date(data.joined_at).getTime();
		this.mute = data.mute;
		this.nick = data.nick;
		this.premiumSince = data.premium_since ? new Date(data.premium_since).getTime() : null;
		this.roleIDs = data.roles;
		return this;
	}

}
