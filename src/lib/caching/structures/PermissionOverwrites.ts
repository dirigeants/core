import { Permissions } from '../../util/bitfields/Permissions';

import type { APIOverwriteData } from '@klasa/dapi-types';

/**
 * @see https://discord.com/developers/docs/resources/channel#overwrite-object
 */
export class PermissionOverwrites {

	/**
	 * A {@link Role} or {@link User} id.
	 * @since 0.0.1
	 */
	public readonly id: string;

	/**
	 * Either "role" or "member".
	 * @since 0.0.1
	 */
	public readonly type: 'role' | 'member';

	/**
	 * The allowed permissions in this overwrite.
	 * @since 0.0.1
	 */
	public readonly allow: Readonly<Permissions>;

	/**
	 * The denied permissions in this overwrite.
	 * @since 0.0.1
	 */
	public readonly deny: Readonly<Permissions>;

	public constructor(data: APIOverwriteData) {
		this.id = data.id;
		this.type = data.type;
		this.allow = new Permissions(data.allow).freeze();
		this.deny = new Permissions(data.deny).freeze();
	}

}
