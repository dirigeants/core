import { ProxyCache } from '@klasa/cache';
import { Routes, RequestOptions } from '@klasa/rest';

import type { GuildMember } from '../structures/guilds/GuildMember';
import type { Role } from '../structures/guilds/Role';
import type { Guild } from '../structures/guilds/Guild';
import type { Client } from '../../Client';

export class GuildMemberRoleStore extends ProxyCache<string, Role> {

	public readonly member: GuildMember;

	public constructor(store: Map<string, Role>, keys: string[], member: GuildMember) {
		super(store, keys);
		this.member = member;
	}

	public get client(): Client {
		return this.member.client;
	}

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
		return this;
	}

}