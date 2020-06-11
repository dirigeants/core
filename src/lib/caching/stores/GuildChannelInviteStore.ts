import type { Client } from '../../client/Client';
import { ProxyCache } from '@klasa/cache';
import { Invite } from '../structures/Invite';
import { GuildChannel } from '../structures/channels/GuildChannel';
import { RequestOptions, Routes } from '@klasa/rest';
import { APIInviteData } from '@klasa/dapi-types';
import { Channel } from '../structures/channels/Channel';
import { TextChannel } from '../structures/channels/TextChannel';
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
		super(channel.invites, keys);
		this.client = channel.client;
		this.channel = channel;
	}

	/**
	 * Creates an invite to the channel.
	 * @since 0.0.3
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/channel#create-channel-invite
	 */
	public async create(requestOptions: RequestOptions = {}): Promise<this> {
		const entry = await this.client.api.post(Routes.channelInvites(this.channel.id), requestOptions) as APIInviteData;
		this.set(entry.code);
		return this;
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
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const entries = await this.client.api.get(Routes.channelInvites((this.channel as TextChannel).id)) as APIInviteData[];
		for (const entry of entries) {
			// eslint-disable-next-line dot-notation
			this.client.invites['_add'](entry);
			this.set(entry.code);
		}
		return this;
	}

}
