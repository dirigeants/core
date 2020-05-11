import { Structure } from '../base/Structure';

import type { APIBanData } from '@klasa/dapi-types';
import type { Client } from '../../../Client';
import { User } from '../User';

/**
 * @see https://discord.com/developers/docs/resources/guild#ban-object
 */
export class Ban extends Structure {

	/**
	 * The user's ID that got banned.
	 * @since 0.0.1
	 */
	public readonly id: string;

	/**
	 * The reason for the ban.
	 * @since 0.0.1
	 */
	public readonly reason: string | null;

	public constructor(client: Client, data: APIBanData) {
		super(client);
		// eslint-disable-next-line dot-notation
		this.id = this.client.users['_add'](data.user).id;
		this.reason = data.reason;
	}

	/**
	 * The user.
	 * @since 0.0.1
	 */
	public get user(): User | null {
		return this.client.users.get(this.id) ?? null;
	}

	protected _patch(): this {
		return this;
	}

}

export interface Ban {
	client: Client;
}
