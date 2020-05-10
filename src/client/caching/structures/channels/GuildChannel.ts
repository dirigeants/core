import { Channel } from './Channel';
import { Cache } from '@klasa/cache';
import { PermissionOverwrites } from '../../../../lib/structures/PermissionOverwrites';

import type { APIChannelData } from '@klasa/dapi-types';

/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
export abstract class GuildChannel extends Channel {

	/**
	 * The name of the channel (2-100 characters).
	 * @since 0.0.1
	 */
	public name!: string;

	/**
	 * Sorting position of the channel.
	 * @since 0.0.1
	 */
	public position!: number;

	/**
	 * Id of the parent category for a channel (each parent category can contain up to 50 channels).
	 * @since 0.0.1
	 */
	public parentID!: string | null;

	/**
	 * Explicit permission overwrites for members and roles.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/channel#overwrite-object
	 */
	public permissionsOverwrites!: Cache<string, PermissionOverwrites>;

	protected _patch(data: APIChannelData): this {
		this.name = data.name as string;
		this.position = data.position as number;
		this.parentID = data.parent_id as string | null;
		this.permissionsOverwrites = new Cache();
		for (const overwrite of data.permission_overwrites ?? []) {
			this.permissionsOverwrites.set(overwrite.id, new PermissionOverwrites(overwrite));
		}

		return this;
	}

}
