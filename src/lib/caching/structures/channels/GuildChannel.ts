import { Cache } from '@klasa/cache';
import { Channel } from './Channel';
import { PermissionOverwrites } from '../PermissionOverwrites';

import type { APIChannelData } from '@klasa/dapi-types';
import type { Client } from '../../../client/Client';
import type { Guild } from '../guilds/Guild';
import { RequestOptions } from '@klasa/rest';

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

	/**
	 * The {@link Guild guild} this channel belongs to.
	 * @since 0.0.1
	 */
	public readonly guild: Guild;

	/**
	 * Whether the DM channel is deleted.
	 * @since 0.0.1
	 */
	public deleted = false;

	public constructor(client: Client, data: APIChannelData, guild: Guild | null = null) {
		super(client, data);
		this.guild = guild ?? client.guilds.get(data.guild_id as string) as Guild;
	}

	/**
	 * Removes the channel from the {@link Guild guild}.
	 * @since 0.0.1
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/channel#deleteclose-channel
	 */
	public async remove(requestOptions: RequestOptions = {}): Promise<this> {
		await this.guild.channels.remove(this.id, requestOptions);
		this.deleted = true;
		return this;
	}

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
