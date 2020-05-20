import { Permissions } from '../../../util/bitfields/Permissions';
import { Structure } from '../base/Structure';

import type { APIOverwriteData } from '@klasa/dapi-types';
import type { Client } from '../../../client/Client';
import type { GuildChannel } from '../channels/GuildChannel';

/**
 * @see https://discord.com/developers/docs/resources/channel#overwrite-object
 */
export class Overwrite extends Structure {

	/**
	 * A {@link Role} or {@link User} id.
	 * @since 0.0.1
	 */
	public readonly id: string;

	/**
	 * The {@link GuildChannel channel} this is for.
	 * @since 0.0.1
	 */
	public readonly channel: GuildChannel;

	/**
	 * Either "role" or "member".
	 * @since 0.0.1
	 */
	public type!: 'role' | 'member';

	/**
	 * The allowed permissions in this overwrite.
	 * @since 0.0.1
	 */
	public allow!: Readonly<Permissions>;

	/**
	 * The denied permissions in this overwrite.
	 * @since 0.0.1
	 */
	public deny!: Readonly<Permissions>;

	/**
	 * If the overwrite has been deleted
	 * @since 0.0.1
	 */
	public deleted = false;

	public constructor(client: Client, data: APIOverwriteData, channel: GuildChannel) {
		super(client);
		this.id = data.id;
		this.channel = channel;
		this._patch(data);
	}

	/**
	 * Deletes this overwrite
	 * @param reason The reason for deleting this overwrite
	 */
	public async delete(reason?: string): Promise<this> {
		await this.channel.permissionOverwrites.remove(this.id, { reason });
		return this;
	}

	protected _patch(data: APIOverwriteData): this {
		this.type = data.type;
		this.allow = new Permissions(data.allow).freeze();
		this.deny = new Permissions(data.deny).freeze();
		return this;
	}

}
