import type { Client } from '../../client/Client';
import { ProxyCache } from '@klasa/cache';
import { Invite } from '../structures/Invite';
import { GuildChannel } from '../structures/channels/GuildChannel';
import { Guild } from '../structures/guilds/Guild';
import { RequestOptions, Routes } from '@klasa/rest';
import { APIInviteData } from '@klasa/dapi-types';
import { Channel } from '../structures/channels/Channel';
/**
 * The store for {@link Invite guild invites the channel has}.
 * @since 0.0.3
 */
export class GuildChannelInviteStore extends ProxyCache<string, Invite> {

	/**
	 * The {@link Client client} this store belongs to.
	 * @since 0.0.3
	 */
	public readonly client: Client;

	/**
	 * The {@link Invite guild invite} this store belongs to.
	 * @since 0.0.3
	 */
	public readonly invite: Invite;

	/**
	 * Builds the store.
	 * @since 0.0.3
	 * @param invite The {@link Invite guild invite} this store belongs to.
	 */
	public constructor(invite: Invite, keys: string[]) {
		super((invite.channel as GuildChannel).invites, keys);
		this.client = invite.client;
		this.invite = invite;
	}

	/**
	 * Creates an invite to the channel.
	 * @since 0.0.3
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/channel#create-channel-invite
	 */
	public async create(requestOptions: RequestOptions = {}): Promise<this> {
		await this.client.api.post(Routes.channelInvites(this.invite.channel.id), requestOptions);
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
		const entry = await this.client.api.delete(Routes.invite(code), requestOptions) as APIInviteData;
		this.set(entry.code);
		return this;
	}

	/**
	 * Returns a list of {@link Invite invite}s with their metadata.
	 * @since 0.0.3
	 * @see https://discord.com/developers/docs/resources/guild#get-guild-invites
	 */
	public async fetch(): Promise<this> {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const entries = await this.client.api.get(Routes.guildInvites(this.guild!.id)) as APIInviteData[];
		for (const entry of entries) {
			// eslint-disable-next-line dot-notation
			this.client.invites['_add'](entry);
			this.set(entry.code);
		}
		return this;
	}

	/**
	 * The {@link Guild guild} this store belongs to.
	 * @since 0.0.3
	 */
	public get guild(): Guild | null{
		return this.invite.guild;
	}

	/**
	 * The {@link Channel channel} this store belongs to.
	 * @since 0.0.3
	 */
	public get channel(): Channel | null{
		return this.invite.channel;
	}

}