import { Routes, RequestOptions } from '@klasa/rest';
import { Structure } from '../base/Structure';
import { Permissions } from '../../../util/bitfields/Permissions';

import type { APIRoleData } from '@klasa/dapi-types';
import type { Client } from '../../../client/Client';
import type { Guild } from './Guild';

/**
 * @see https://discord.com/developers/docs/topics/permissions#role-object
 */
export class Role extends Structure {

	/**
	 * The {@link Guild guild} this role belongs to.
	 * @since 0.0.1
	 */
	public readonly guild: Guild;

	/**
	 * The role's ID.
	 * @since 0.0.1
	 */
	public readonly id: string;

	/**
	 * The role's name.
	 * @since 0.0.1
	 */
	public name!: string;

	/**
	 * The role's integer representation of hexadecimal color code.
	 * @since 0.0.1
	 */
	public color!: number;

	/**
	 * Whether or not the role is pinned in the user listing.
	 * @since 0.0.1
	 */
	public hoist!: boolean;

	/**
	 * The role's position.
	 * @since 0.0.1
	 */
	public position!: number;

	/**
	 * The role's permissions.
	 * @since 0.0.1
	 */
	public permissions!: Readonly<Permissions>;

	/**
	 * Whether or not the role is managed by an integration.
	 * @since 0.0.1
	 */
	public readonly managed!: boolean;

	/**
	 * Whether or not the role is mentionable.
	 * @since 0.0.1
	 */
	public mentionable!: boolean;

	/**
	 * Whether the role is deleted.
	 * @since 0.0.1
	 */
	public deleted = false;

	public constructor(client: Client, data: APIRoleData, guild: Guild) {
		super(client);
		this.id = data.id;
		this.managed = data.managed;
		this.guild = guild;
		this._patch(data);
	}

	/**
	 * Modifies the role's settings.
	 * @since 0.0.1
	 * @param data The new settings for the role.
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/guild#modify-guild-role
	 */
	public async modify(data: RoleModifyOptions, requestOptions: RequestOptions = {}): Promise<this> {
		const entry = await this.client.api.patch(Routes.guildRole(this.guild.id, this.id), { ...requestOptions, data }) as APIRoleData;
		return this.clone<this>()._patch(entry);
	}

	/**
	 * Deletes the role from the {@link Guild guild}.
	 * @since 0.0.1
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/guild#delete-guild-role
	 */
	public async delete(requestOptions: RequestOptions = {}): Promise<this> {
		await this.guild.roles.remove(this.id, requestOptions);
		this.deleted = true;
		return this;
	}

	protected _patch(data: APIRoleData): this {
		this.name = data.name;
		this.color = data.color;
		this.hoist = data.hoist;
		this.position = data.position;
		this.permissions = new Permissions(data.permissions).freeze();
		this.mentionable = data.mentionable;
		return this;
	}

}

/**
 * The options for {@link Role#modify}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#modify-guild-role-json-params
 */
export interface RoleModifyOptions {
	/**
	 * Name of the role.
	 * @since 0.0.1
	 */
	name?: string | null;

	/**
	 * Bitwise value of the enabled/disabled permissions.
	 * @since 0.0.1
	 */
	permissions?: number | null;

	/**
	 * RGB color value
	 * @since 0.0.1
	 */
	color?: number | null;

	/**
	 * Whether the role should be displayed separately in the sidebar
	 * @since 0.0.1
	 */
	hoist?: boolean | null;

	/**
	 * Whether the role should be mentionable
	 * @since 0.0.1
	 */
	mentionable?: boolean | null;
}
