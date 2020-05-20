import { Channel } from './Channel';
import { OverwriteStore } from '../../stores/OverwriteStore';
import { Permissions } from '../../../util/bitfields/Permissions';

import type { APIChannelData } from '@klasa/dapi-types';
import type { Client } from '../../../client/Client';
import type { Guild } from '../guilds/Guild';
import type { RequestOptions } from '@klasa/rest';
import type { GuildMember } from '../guilds/GuildMember';

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
	public readonly permissionOverwrites: OverwriteStore;

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
		this.permissionOverwrites = new OverwriteStore(client, this);
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

	protected _patch(data: APIChannelData): this {
		this.name = data.name as string;
		this.position = data.position as number;
		this.parentID = data.parent_id as string | null;
		// eslint-disable-next-line dot-notation
		for (const overwrite of data.permission_overwrites ?? []) this.permissionOverwrites['_add'](overwrite);

		return this;
	}

}
