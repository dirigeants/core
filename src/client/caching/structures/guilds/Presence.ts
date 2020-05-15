import { Structure } from '../base/Structure';

import type { APIPresenceUpdateData, PresenceUpdateStatus, APIActivityData, APIClientStatusData } from '@klasa/dapi-types';
import type { Client } from '../../../Client';
import type { Guild } from './Guild';

/**
 * @see https://discord.com/developers/docs/topics/gateway#presence
 */
export class Presence extends Structure {

	/**
	 * The member's ID this presence corresponds to.
	 * @since 0.0.1
	 */
	public readonly id: string;

	/**
	 * The member's status.
	 * @since 0.0.1
	 */
	public status!: PresenceUpdateStatus;

	/**
	 * The member's platform-dependent status.
	 * @since 0.0.1
	 */
	public clientStatus!: APIClientStatusData;

	/**
	 * The member's current activities.
	 * @since 0.0.1
	 */
	public activities!: APIActivityData[];

	/**
	 * The guild the presence belongs to.
	 * @since 0.0.1
	 */
	public readonly guild: Guild;

	public constructor(client: Client, data: APIPresenceUpdateData, guild: Guild) {
		super(client);
		this.id = data.user.id;
		this.guild = guild;
		this._patch(data);
	}

	protected _patch(data: APIPresenceUpdateData): this {
		this.status = data.status;
		this.clientStatus = data.client_status;
		this.activities = data.activities;
		return this;
	}

}
