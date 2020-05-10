import { Structure } from '../base/Structure';

import type { APIEmojiData } from '@klasa/dapi-types';
import type { Client } from '../../../Client';

export class GuildEmoji extends Structure {

	public id: string;
	public animated!: boolean | null;
	public managed!: boolean | null;
	public name!: string | null;
	public requireColons!: boolean | null;
	public roleIDs!: string[];
	public userID!: string | null;

	public constructor(client: Client, data: APIEmojiData) {
		super(client);
		this.id = data.id as string;
		this._patch(data);
	}

	_patch(data: APIEmojiData): this {
		this.animated = data.animated ?? null;
		this.managed = data.managed ?? null;
		this.name = data.name;
		this.requireColons = data.require_colons ?? null;
		this.roleIDs = data.roles ?? [];
		this.userID = data.user?.id ?? null;
		return this;
	}

}
