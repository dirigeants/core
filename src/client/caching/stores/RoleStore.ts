import { Routes, RequestOptions } from '@klasa/rest';
import { DataStore } from './base/DataStore';
import { extender } from '../../../util/Extender';

import type { APIRoleData } from '@klasa/dapi-types';
import type { Client } from '../../Client';
import type { Role } from '../structures/guilds/Role';
import type { Guild } from '../structures/guilds/Guild';

/**
 * The store for {@link Guild guild} {@link Role roles}.
 * @since 0.0.1
 */
export class RoleStore extends DataStore<Role> {

	/**
	 * The {@link Guild guild} this store belongs to.
	 * @since 0.0.1
	 */
	public readonly guild: Guild;

	/**
	 * Builds the store.
	 * @since 0.0.1
	 * @param client The {@link Client client} this store belongs to.
	 * @param guild The {@link Guild guild} this store belongs to.
	 */
	public constructor(client: Client, guild: Guild) {
		super(client, extender.get('Role'), client.options.cache.limits.roles);
		this.guild = guild;
	}

	/**
	 * Creates a new {@link Role role} for the {@link Guild guild}.
	 * @since 0.0.1
	 * @param data The role settings.
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/guild#create-guild-role
	 */
	public async add(data: RoleStoreAddOptions = {}, requestOptions: RequestOptions = {}): Promise<Role> {
		const role = await this.client.api.post(Routes.guildRoles(this.guild.id), { ...requestOptions, data }) as APIRoleData;
		return this._add(role);
	}

	/**
	 * Modifies the positions of the roles.
	 * @since 0.0.1
	 * @param data The set of roles and their positions for the {@link Guild guild}.
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/guild#modify-guild-role-positions
	 */
	public async modifyPositions(data: readonly RoleStorePositionData[], requestOptions: RequestOptions = {}): Promise<this> {
		await this.client.api.patch(Routes.guildRoles(this.guild.id), { ...requestOptions, data });
		return this;
	}

	/**
	 * Returns the list of {@link Role role}s as updated from Discord.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#get-guild-roles
	 */
	public async fetch(): Promise<this> {
		const roles = await this.client.api.get(Routes.guildRoles(this.guild.id)) as APIRoleData[];
		for (const role of roles) this._add(role);
		return this;
	}

	/**
	 * Adds a new structure to this DataStore
	 * @param data The data packet to add
	 */
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	// @ts-ignore
	protected _add(data: APIRoleData): Role {
		const existing = this.get(data.id);
		// eslint-disable-next-line dot-notation
		if (existing) return existing['_patch'](data);

		const entry = new this.Holds(this.client, data, this.guild);
		if (this.client.options.cache.enabled) this.set(entry.id, entry);
		return entry;
	}

}

/**
 * The options for {@link RoleStore#add}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#create-guild-role-json-params
 */
export interface RoleStoreAddOptions {
	/**
	 * name of the role.
	 * @since 0.0.1
	 * @default 'new role'
	 */
	name?: string;

	/**
	 * bitwise value of the enabled/disabled permissions.
	 * @since 0.0.1
	 * @default 'everyone permissions in guild'
	 */
	permissions?: number;

	/**
	 * RGB color value.
	 * @since 0.0.1
	 * @default 0
	 */
	color?: number;

	/**
	 * whether the role should be displayed separately in the sidebar.
	 * @since 0.0.1
	 * @default false
	 */
	hoist?: boolean;

	/**
	 * whether the role should be mentionable.
	 * @since 0.0.1
	 * @default false
	 */
	mentionable?: boolean;
}

/**
 * An entry for {@link RoleStore#modifyPositions}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#modify-guild-role-positions-json-params
 */
export interface RoleStorePositionData {
	/**
	 * The {@link Role role} ID.
	 * @since 0.0.1
	 */
	id: string;

	/**
	 * The sorting position of the {@link Role role}.
	 * @since 0.0.1
	 */
	position?: number | null;
}
