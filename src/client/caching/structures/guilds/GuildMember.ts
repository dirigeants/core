import { Structure } from '../base/Structure';

import type { APIGuildMemberData, APIUserData } from '@klasa/dapi-types';
import type { Client } from '../../../Client';

/**
 * @see https://discord.com/developers/docs/resources/guild#guild-member-object
 */
export class GuildMember extends Structure {

	/**
	 * The member's ID.
	 * @since 0.0.1
	 */
	public readonly id: string;

	/**
	 * Whether or not the user is deafened in voice channels.
	 * @since 0.0.1
	 */
	public deaf!: boolean;

	/**
	 * When the user joined the guild.
	 * @since 0.0.1
	 */
	public joinedTimestamp!: number | null;

	/**
	 * Whether or not the user is muted in voice channels.
	 * @since 0.0.1
	 */
	public mute!: boolean;

	/**
	 * This user's guild nickname.
	 * @since 0.0.1
	 */
	public nick!: string | null;

	/**
	 * When the user started boosting the guild.
	 * @since 0.0.1
	 * @see https://support.discordapp.com/hc/en-us/articles/360028038352-Server-Boosting-
	 */
	public premiumSince!: number | null;

	/**
	 * Array of role object ids.
	 * @since 0.0.1
	 */
	public roleIDs!: string[];

	public constructor(client: Client, data: APIGuildMemberData) {
		super(client);

		this.id = (data.user as APIUserData).id;
		this._patch(data);
	}

	protected _patch(data: APIGuildMemberData): this {
		this.deaf = data.deaf;
		this.joinedTimestamp = new Date(data.joined_at).getTime();
		this.mute = data.mute;
		this.nick = data.nick;
		this.premiumSince = data.premium_since ? new Date(data.premium_since).getTime() : null;
		this.roleIDs = data.roles;
		return this;
	}

}
