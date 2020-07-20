import { ProxyCache } from '@klasa/cache';
import { Routes, RequestOptions } from '@klasa/rest';

import type { GuildMember } from '../structures/guilds/GuildMember';
import type { Role } from '../structures/guilds/Role';
import type { Guild } from '../structures/guilds/Guild';
import type { Client } from '../../client/Client';

/**
 * The store for {@link Role member roles}.
 * @since 0.0.1
 */
export class GuildMemberRoleStore extends ProxyCache<string, Role> {

	/**
	 * The {@link Client client} this store belongs to.
	 * @since 0.0.1
	 */
	public readonly client: Client;

	/**
	 * The {@link GuildMember guild member} this store belongs to.
	 * @since 0.0.1
	 */
	public readonly member: GuildMember;

	/**
	 * Builds the store.
	 * @since 0.0.1
	 * @param member The {@link GuildMember guild member} this store belongs to.
	 */
	public constructor(member: GuildMember, keys: string[]) {
		super(member.guild.roles, keys);
		this.client = member.client;
		this.member = member;
	}

	/**
	 * Gets the highest role from this store.
	 * @since 0.0.1
	 */
	public get highest(): Role | undefined {
		return this.reduce((highest, role) => highest.position > role.position ? highest : role, this.firstValue as Role);
	}

	/**
	 * The {@link Guild guild} this store belongs to.
	 * @since 0.0.1
	 */
	public get guild(): Guild {
		return this.member.guild;
	}

	/**
	 * Adds a {@link Role role} to the {@link GuildMember member}.
	 * @since 0.0.1
	 * @param roleID The {@link Role role} ID to add.
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/guild#add-guild-member-role
	 */
	public async add(roleID: string, requestOptions: RequestOptions = {}): Promise<this> {
		await this.client.api.put(Routes.guildMemberRole(this.guild.id, this.member.id, roleID), requestOptions);
		this.set(roleID);
		return this;
	}

	/**
	 * Removes a {@link Role role} from the {@link GuildMember member}.
	 * @since 0.0.1
	 * @param roleID The {@link Role role} ID to remove.
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/guild#remove-guild-member-role
	 */
	public async remove(roleID: string, requestOptions: RequestOptions = {}): Promise<this> {
		await this.client.api.delete(Routes.guildMemberRole(this.guild.id, this.member.id, roleID), requestOptions);
		this.delete(roleID);
		return this;
	}

	/**
	 * Modifies all the roles for the {@link GuildMember member}.
	 * @since 0.0.1
	 * @param roles A collection of {@link Role role} IDs.
	 * @param requestOptions The additional request options.
	 */
	public async modify(roles: readonly string[], requestOptions: RequestOptions = {}): Promise<this> {
		await this.member.modify({ roles }, requestOptions);
		this.clear();
		for (const role of roles) this.set(role);
		return this;
	}

	/**
	 * The JSON representation of this object.
	 */
	public toJSON(): string[] {
		return [...this.keys()];
	}

}
