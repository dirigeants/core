import { Structure } from '../base/Structure';

import type { APIBanData } from '@klasa/dapi-types';
import type { Client } from '../../../Client';
import type { Guild } from './Guild';
import type { User } from '../User';

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

	/**
	 * The guild this ban is from.
	 * @since 0.0.1
	 */
	public readonly guild: Guild;

	public constructor(client: Client, data: APIBanData, guild: Guild) {
		super(client);
		// eslint-disable-next-line dot-notation
		this.id = this.client.users['_add'](data.user).id;
		this.reason = data.reason;
		this.guild = guild;
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
