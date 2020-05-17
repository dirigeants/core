import { Routes } from '@klasa/rest';
import { Structure } from '../base/Structure';
import { GuildMemberRoleStore } from '../../stores/GuildMemberRoleStore';

import type { APIGuildMemberData, APIUserData } from '@klasa/dapi-types';
import type { Client } from '../../../Client';
import type { Guild } from './Guild';

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
	public roles!: GuildMemberRoleStore;

	public constructor(client: Client, data: MemberData, guild: Guild) {
		super(client);

		this.id = (data.user as APIUserData).id;
		this.guild = guild;
		this._patch(data);
	}

	/**
	 * Modifies the settings for the member.
	 * @param data The settings to be added.
	 * @see https://discord.com/developers/docs/resources/guild#modify-guild-member
	 */
	public async edit(data: GuildMemberEditOptions): Promise<this> {
		const endpoint = Routes.guildMember(this.guild.id, this.id);
		await this.client.api.patch(endpoint, { data });
		return this;
	}

	/**
	 * Kicks a member from the {@link Guild guild}.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#remove-guild-member
	 */
	public async kick(): Promise<this> {
		const endpoint = Routes.guildMember(this.guild.id, this.id);
		await this.client.api.delete(endpoint);
		return this;
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
		this.roles = new GuildMemberRoleStore(this.guild.roles, data.roles, this);
		return this;
	}

}

export interface GuildMember {
	client: Client;
}

export type MemberData = APIGuildMemberData | Omit<APIGuildMemberData, 'deaf' | 'mute' | 'nick' | 'joined_at'>;

/**
 * The options for {@link GuildMember#edit}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#modify-guild-member-json-params
 */
export interface GuildMemberEditOptions {
	/**
	 * Value to set {@link GuildMember user}'s nickname to.
	 * @since 0.0.1
	 */
	nick?: string;

	/**
	 * Array of {@link Role role} IDs the member is assigned.
	 * @since 0.0.1
	 */
	roles?: string[];

	/**
	 * Whether the user is muted in voice channels, will throw an error if the user is not in a {@link VoiceChannel voice channel}.
	 * @since 0.0.1
	 */
	mute?: boolean;

	/**
	 * Whether the user is deafened in voice channels, will throw an error if the user is not in a {@link VoiceChannel voice channel}.
	 * @since 0.0.1
	 */
	deaf?: boolean;

	/**
	 * Id of channel to move user to (if they are connected to a {@link VoiceChannel voice channel}).
	 * @since 0.0.1
	 */
	channel_id?: string | null;
}
