import { RequestOptions, Routes } from '@klasa/rest';
import { ProxyCache } from '@klasa/cache';

import type { Client } from '../../client/Client';
import type { Invite } from '../structures/Invite';
import type { GuildChannel } from '../structures/channels/GuildChannel';
import type { APIInviteData, InviteTargetUserType } from '@klasa/dapi-types';
import type { Channel } from '../structures/channels/Channel';
import type { TextChannel } from '../structures/channels/TextChannel';

/**
 * The store for {@link Invite guild invites} the channel has.
 * @since 0.0.3
 */
export class GuildChannelInviteStore extends ProxyCache<string, Invite> {

	/**
	 * The {@link Client client} this store belongs to.
	 * @since 0.0.3
	 */
	public readonly client: Client;

	/**
	 * The {@link Channel channel} this store belongs to.
	 * @since 0.0.3
	 */
	public readonly channel: Channel;

	/**
	 * Builds the store.
	 * @since 0.0.3
	 * @param channel The {@link GuildChannel guild channel} this store belongs to.
	 */
	public constructor(channel: GuildChannel, keys: string[]) {
		super(channel.client.invites, keys);
		this.client = channel.client;
		this.channel = channel;
	}

	/**
	 * Creates an invite to the channel.
	 * @since 0.0.3
	 * @param data The invite options
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/channel#create-channel-invite
	 */
	public async add(data: GuildChannelInviteStoreAddData, requestOptions: RequestOptions = {}): Promise<Invite> {
		const entry = await this.client.api.post(Routes.channelInvites(this.channel.id), { ...requestOptions, data }) as APIInviteData;
		this.set(entry.code);

		// eslint-disable-next-line dot-notation
		return this.client.invites['_add'](entry);
	}

	/**
	 * Deletes an invite given its code.
	 * @since 0.0.3
	 * @param code The {@link Invite#code invite code}.
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/invite#delete-invite
	 */
	public async remove(code: string, requestOptions: RequestOptions = {}): Promise<this> {
		await this.client.api.delete(Routes.invite(code), requestOptions);
		return this;
	}

	/**
	 * Returns a list of {@link Invite invite}s with their metadata.
	 * @since 0.0.3
	 * @see https://discord.com/developers/docs/resources/guild#get-guild-invites
	 */
	public async fetch(): Promise<this> {
		const entries = await this.client.api.get(Routes.channelInvites(this.channel.id)) as APIInviteData[];
		for (const entry of entries) {
			// eslint-disable-next-line dot-notation
			this.client.invites['_add'](entry);
			this.set(entry.code);
		}
		return this;
	}

}

/**
 * The data for {@link GuildChannelInviteStore#add}.
 * @since 0.0.3
 * @see https://discord.com/developers/docs/resources/channel#create-channel-invite-json-params
 */
export interface GuildChannelInviteStoreAddData {
	/**
	 * Duration of the invite (0 for it to never expire).
	 * @since 0.0.3
	 * @default 86400 (24 hours)
	 */
	max_age?: number;

	/**
	 * Max number of uses (0 for unlimited).
	 * @since 0.0.3
	 * @default 0
	 */
	max_uses?: number;

	/**
	 * Whether this invite only grants temporary membership.
	 * @since 0.0.3
	 * @default false
	 */
	temporary?: boolean;

	/**
	 * If true, don't try to reuse a similar invite (useful for creating many unique one time use invites).
	 * @since 0.0.3
	 * @default false
	 */
	unique?: boolean;

	/**
	 * the target user id for this invite.
	 * @since 0.0.3
	 */
	target_user?: string;

	/**
	 * The type of target user for this invite.
	 * @since 0.0.3
	 * @see https://discord.com/developers/docs/resources/invite#invite-object-target-user-types
	 */
	target_user_type?: InviteTargetUserType;
}
