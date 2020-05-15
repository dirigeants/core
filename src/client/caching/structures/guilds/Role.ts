import { Structure } from '../base/Structure';
import { Permissions } from '../../../../util/bitfields/Permissions';

import type { APIRoleData } from '@klasa/dapi-types';
import type { Client } from '../../../Client';
import type { Guild } from './Guild';

/**
 * @see https://discord.com/developers/docs/topics/permissions#role-object
 */
export class Role extends Structure {

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

	public readonly guild: Guild;

	public constructor(client: Client, data: APIRoleData, guild: Guild) {
		super(client);
		this.id = data.id;
		this.managed = data.managed;
		this.guild = guild;
		this._patch(data);
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
