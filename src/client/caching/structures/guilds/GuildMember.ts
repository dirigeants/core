import { Structure } from '../base/Structure';
import { ProxyCache } from '@klasa/cache';

import type { APIGuildMemberData, APIUserData } from '@klasa/dapi-types';
import type { Client } from '../../../Client';
import type { Guild } from './Guild';
import type { Role } from './Role';

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
	 * The {@link Guild} this member belongs to.
	 * @since 0.0.1
	 */
	public readonly guild: Guild;

	/**
	 * Whether or not the user is deafened in voice channels.
	 * @since 0.0.1
	 */
	public deaf!: boolean | null;

	/**
	 * When the user joined the guild.
	 * @since 0.0.1
	 */
	public joinedTimestamp!: number | null;

	/**
	 * Whether or not the user is muted in voice channels.
	 * @since 0.0.1
	 */
	public mute!: boolean | null;

	/**
	 * This user's guild nickname.
	 * @since 0.0.1
	 */
	public nick!: string | null;

	/**
	 * When the user started boosting the guild.
	 * @since 0.0.1
	 * @see https://support.discord.com/hc/en-us/articles/360028038352-Server-Boosting-
	 */
	public premiumSince!: number | null;

	/**
	 * The roles this member has.
	 * @since 0.0.1
	 */
	public roles!: ProxyCache<string, Role>;

	public constructor(client: Client, data: MemberData, guild: Guild) {
		super(client);

		this.id = (data.user as APIUserData).id;
		this.guild = guild;
		this._patch(data);
	}

	/**
	 * Defines toString behavior for members.
	 * @since 0.0.1
	 */
	public toString(): string {
		return this.nick ? `<@!${this.id}>` : `<@${this.id}>`;
	}

	protected _patch(data: MemberData): this {
		this.deaf = 'deaf' in data ? data.deaf : null;
		this.joinedTimestamp = 'joined_at' in data ? new Date(data.joined_at).getTime() : null;
		this.mute = 'mute' in data ? data.mute : null;
		this.nick = 'nick' in data ? data.nick : null;
		this.premiumSince = data.premium_since ? new Date(data.premium_since).getTime() : null;
		this.roles = new ProxyCache(this.guild.roles, data.roles);
		return this;
	}

}

export type MemberData = APIGuildMemberData | Omit<APIGuildMemberData, 'deaf' | 'mute' | 'nick' | 'joined_at'>;
