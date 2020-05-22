import { Routes, RequestOptions } from '@klasa/rest';
import { Structure } from '../base/Structure';
import { GuildMemberRoleStore } from '../../stores/GuildMemberRoleStore';
import { Permissions } from '../../../util/bitfields/Permissions';

import type { APIGuildMemberData, APIUserData } from '@klasa/dapi-types';
import type { Client } from '../../../client/Client';
import type { Guild } from './Guild';
import type { User } from '../User';
import type { GuildChannel } from '../channels/GuildChannel';

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

	/**
	 * Whether the member was kicked.
	 * @since 0.0.1
	 */
	public deleted = false;

	public constructor(client: Client, data: MemberData, guild: Guild) {
		super(client);

		this.id = (data.user as APIUserData).id;
		this.guild = guild;
		this._patch(data);
	}

	/**
	 * The user for this member
	 * @since 0.0.1
	 */
	public get user(): User | null {
		return this.client.users.get(this.id) ?? null;
	}

	/**
	 * The calculated permissions from the member's {@link GuildMemberRoleStore roles}.
	 * @since 0.0.1
	 */
	public get permissions(): Permissions {
		if (this.id === this.guild.ownerID) return new Permissions(Permissions.ALL).freeze();
		return new Permissions(this.roles.map(role => role.permissions));
	}

	/**
	 * Whether or not the {@link ClientUser client user} can manage this member. This is based on:
	 * - The member is not the {@link Guild#owner guild owner}.
	 * - The member is not the {@link ClientUser client user} itself.
	 * - The {@link ClientUser client user} is the owner of the {@link Guild}.
	 * - The {@link ClientUser client user}'s {@link GuildMemberRoleStore#highest highest role} is higher than the member's.
	 * @since 0.0.1
	 * @returns `true` when any of the conditions are met, `null` when the {@link ClientUser client user}'s member is not
	 * cached (or when {@link Client#user} is null), or `false` otherwise.
	 */
	public get manageable(): boolean | null {
		// If the user is the owner, it is not manageable.
		if (this.id === this.guild.ownerID) return false;

		// If the client user is not cached, return null.
		const { user } = this.client;
		if (!user) return null;

		// If the user is the same as the client user, it is not manageable.
		if (this.id === user.id) return false;

		// If the client user's member instance is not cached, return null.
		const { me } = this.guild;
		if (!me) return null;

		// If the client user is the owner, or if the client user's highest
		// role is higher than the member's, return true.
		return user.id === this.guild.ownerID || me.roles.highest > this.roles.highest;
	}

	/**
	 * Whether or not the {@link ClientUser client user} can kick this member. This is based on:
	 * - {@link GuildMember#manageable}.
	 * - The {@link ClientUser client user} has `KICK_MEMBERS` permission.
	 * @since 0.0.1
	 * @returns `null` when the {@link ClientUser client user}'s member is not cached (or when {@link Client#user} is null),
	 * or a boolean specifying whether or not the conditions are met.
	 */
	public get kickable(): boolean | null {
		const { manageable } = this;
		if (manageable === null) return null;
		return manageable && (this.guild.me as GuildMember).permissions.has(Permissions.FLAGS.KICK_MEMBERS);
	}

	/**
	 * Whether or not the {@link ClientUser client user} can ban this member. This is based on:
	 * - {@link GuildMember#manageable}.
	 * - The {@link ClientUser client user} has `BAN_MEMBERS` permission.
	 * @since 0.0.1
	 * @returns `null` when the {@link ClientUser client user}'s member is not cached (or when {@link Client#user} is null),
	 * or a boolean specifying whether or not the conditions are met.
	 */
	public get bannable(): boolean | null {
		const { manageable } = this;
		if (manageable === null) return null;
		return manageable && (this.guild.me as GuildMember).permissions.has(Permissions.FLAGS.BAN_MEMBERS);
	}

	/**
	 * Modifies the settings for the member.
	 * @param data The settings to be set.
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/guild#modify-guild-member
	 */
	public async modify(data: GuildMemberModifyOptions, requestOptions: RequestOptions = {}): Promise<this> {
		await this.client.api.patch(Routes.guildMember(this.guild.id, this.id), { ...requestOptions, data });
		return this;
	}

	/**
	 * Checks permissions for this member in a given channel.
	 * @param channel The channel to check permissions in
	 */
	public permissionsIn(channel: GuildChannel): Readonly<Permissions> {
		if (this.id === this.guild.ownerID) return new Permissions(Permissions.ALL).freeze();

		const permissions = new Permissions(this.roles.map(role => role.permissions));

		if (permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return new Permissions(Permissions.ALL).freeze();

		const overwrites = channel.permissionOverwrites.for(this);

		return permissions
			.remove(overwrites.everyone ? overwrites.everyone.deny : 0)
			.add(overwrites.everyone ? overwrites.everyone.allow : 0)
			.remove(overwrites.roles.length > 0 ? overwrites.roles.map(role => role.deny) : 0)
			.add(overwrites.roles.length > 0 ? overwrites.roles.map(role => role.allow) : 0)
			.remove(overwrites.member ? overwrites.member.deny : 0)
			.add(overwrites.member ? overwrites.member.allow : 0)
			.freeze();
	}

	/**
	 * Kicks a member from the {@link Guild guild}.
	 * @since 0.0.1
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/guild#remove-guild-member
	 */
	public async kick(requestOptions: RequestOptions = {}): Promise<this> {
		await this.guild.members.remove(this.id, requestOptions);
		this.deleted = true;
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
		this.roles = new GuildMemberRoleStore(this, data.roles);
		return this;
	}

}

export type MemberData = APIGuildMemberData | Omit<APIGuildMemberData, 'deaf' | 'mute' | 'nick' | 'joined_at'>;

/**
 * The options for {@link GuildMember#modify}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#modify-guild-member-json-params
 */
export interface GuildMemberModifyOptions {
	/**
	 * Value to set {@link GuildMember user}'s nickname to.
	 * @since 0.0.1
	 */
	nick?: string;

	/**
	 * Array of {@link Role role} IDs the member is assigned.
	 * @since 0.0.1
	 */
	roles?: readonly string[];

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
