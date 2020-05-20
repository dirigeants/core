import { Channel } from './Channel';
import { OverwriteStore } from '../../stores/OverwriteStore';
import { Permissions } from '../../../util/bitfields/Permissions';
import { Routes, RequestOptions } from '@klasa/rest';

import type { APIChannelData, APIOverwriteData } from '@klasa/dapi-types';
import type { Client } from '../../../client/Client';
import type { Guild } from '../guilds/Guild';
import type { GuildMember } from '../guilds/GuildMember';
import type { CategoryChannel } from './CategoryChannel';

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
	public permissionOverwrites!: OverwriteStore;

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
	 * The parent {@type CategoryChannel channel} for this channel.
	 * @since 0.0.1
	 */
	public get parent(): CategoryChannel | null {
		return (this.parentID && this.guild.channels.get(this.parentID) as CategoryChannel) || null;
	}

	/**
	 * If the overwrites are synced to the parent channel.
	 */
	public get synced(): boolean | null {
		const { parent } = this;
		if (!parent) return null;
		if (this.permissionOverwrites.size !== parent.permissionOverwrites.size) return false;
		return this.permissionOverwrites.every((value, key) => {
			const overwrite = parent.permissionOverwrites.get(key);
			return overwrite !== undefined && overwrite.deny.equals(value.deny) && overwrite.allow.equals(value.allow);
		});
	}

	/**
	 * Syncs the permission overwrites with the parent channel.
	 * @param requestOptions The additional request options.
	 * @since 0.0.1
	 */
	public syncPermissions(requestOptions: RequestOptions = {}): Promise<this> {
		const { parent } = this;
		if (!parent) return Promise.reject(new Error('This channel does not have a parent channel to sync permissions from.'));
		const overwrites = parent.permissionOverwrites.map(({ id, type, allow, deny }) => ({ id, type, allow: allow.bitfield, deny: deny.bitfield }));
		// eslint-disable-next-line @typescript-eslint/camelcase
		return this.modify({ permission_overwrites: overwrites }, requestOptions);
	}

	/**
	 * Checks what permissions a {@link GuildMember member} has in this {@link GuildChannel channel}
	 * @param member The guild member you are checking permissions for
	 */
	public permissionsFor(member: GuildMember): Readonly<Permissions> | null {
		if (member.id === this.guild.ownerID) return new Permissions(Permissions.ALL).freeze();

		const permissions = new Permissions(member.roles.map(role => role.permissions));

		if (permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return new Permissions(Permissions.ALL).freeze();

		const overwrites = this.permissionOverwrites.for(member);

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
	 * Deletes the channel from the {@link Guild guild}.
	 * @since 0.0.1
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/channel#deleteclose-channel
	 */
	public async delete(requestOptions: RequestOptions = {}): Promise<this> {
		await this.guild.channels.remove(this.id, requestOptions);
		this.deleted = true;
		return this;
	}

	public async modify(data: ChannelModifyOptions, requestOptions: RequestOptions = {}): Promise<this> {
		const result = await this.client.api.patch(Routes.channel(this.id), { ...requestOptions, data }) as APIChannelData;
		return this._patch(result);
	}

	protected _patch(data: APIChannelData): this {
		this.name = data.name as string;
		this.position = data.position as number;
		this.parentID = data.parent_id as string | null;
		if (!this.permissionOverwrites) this.permissionOverwrites = new OverwriteStore(this.client, this);
		const overwrites = data.permission_overwrites ?? [];
		for (const overwrite of this.permissionOverwrites.values()) {
			const apiOverwrite = overwrites.find((ovr) => ovr.id === overwrite.id);

			if (typeof apiOverwrite === 'undefined') {
				overwrite.deleted = true;
				this.permissionOverwrites.delete(overwrite.id);
				continue;
			}
			// eslint-disable-next-line dot-notation
			this.permissionOverwrites['_add'](apiOverwrite);
		}

		return this;
	}

}

export interface ChannelModifyOptions {
	name?: string;
	position?: number | null;
	permission_overwrites?: APIOverwriteData[] | null;
}
