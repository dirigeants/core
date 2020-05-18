import { Routes, RequestOptions } from '@klasa/rest';
import { Channel } from '../structures/channels/Channel';
import { DataStore } from './base/DataStore';
import { extender, Constructor } from '../../../util/Extender';

import type { APIChannelData, APIOverwriteData, ChannelType } from '@klasa/dapi-types';
import type { Client } from '../../Client';
import type { Guild } from '../structures/guilds/Guild';
import type { GuildBasedChannel } from '../../../util/Util';
import { Structure } from '../structures/base/Structure';

export class GuildChannelStore extends DataStore<GuildBasedChannel> {

	public readonly guild: Guild;

	public constructor(client: Client, guild: Guild) {
		super(client, extender.get('GuildChannel') as Constructor<GuildBasedChannel>, client.options.cache.limits.channels);
		this.guild = guild;
	}

	/**
	 * Create a new channel for the {@link Guild guild}.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#create-guild-channel
	 */
	public async add(data: GuildChannelStoreAddData, requestOptions: RequestOptions = {}): Promise<GuildBasedChannel> {
		const channel = await this.client.api.post(Routes.guildChannels(this.guild.id), { ...requestOptions, data }) as APIChannelData;
		return Channel.create(this.client, channel, this.guild) as GuildBasedChannel;
	}

	/**
	 * Modifies the positions of the channels.
	 * @since 0.0.1
	 * @param data The set of channels and their positions for the {@link Guild guild}.
	 * @see https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions
	 */
	public async editPositions(data: readonly GuildChannelStorePositionData[], requestOptions: RequestOptions = {}): Promise<this> {
		await this.client.api.patch(Routes.guildChannels(this.guild.id), { ...requestOptions, data });
		return this;
	}

	/**
	 * Returns the list of channels as updated from Discord.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#get-guild-channels
	 */
	public async fetch(): Promise<this> {
		const channels = await this.client.api.get(Routes.guildChannels(this.guild.id)) as APIChannelData[];
		for (const channel of channels) this._add(channel);
		return this;
	}

	/**
	 * Adds a new structure to this DataStore
	 * @param data The data packet to add
	 */
	protected _add(data: APIChannelData): GuildBasedChannel {
		// You might ask... Why?!? Well, turns out that despite of ALL channels that make part of the GuildBasedChannel
		// union having a _patch method, TypeScript is just unable to retrieve their properties. So yeah, we need this.
		const existing = this.get(data.id) as Structure | undefined;
		// eslint-disable-next-line dot-notation
		if (existing) return existing['_patch'](data) as GuildBasedChannel;

		const entry = Channel.create(this.client, data, this.guild) as GuildBasedChannel;
		if (this.client.options.cache.enabled) this.set(entry.id, entry);
		return entry;
	}

}

/**
 * The data for {@link GuildChannelStore#add}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#create-guild-channel-json-params
 */
export interface GuildChannelStoreAddData {
	/**
	 * Channel name (2-100 characters).
	 * @since 0.0.1
	 */
	name: string;

	/**
	 * The type of channel.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/channel#channel-object-channel-types
	 */
	type?: ChannelType;

	/**
	 * Channel topic (0-1024 characters).
	 * @since 0.0.1
	 */
	topic?: string;

	/**
	 * The bitrate(in bits) of the voice channel (voice only).
	 * @since 0.0.1
	 */
	bitrate?: number;

	/**
	 * The user limit of the voice channel (voice only).
	 * @since 0.0.1
	 */
	user_limit?: number;

	/**
	 * Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the
	 * permission `MANAGE_MESSAGES` or `MANAGE_CHANNEL`, are unaffected.
	 * @since 0.0.1
	 */
	rate_limit_per_user?: number;

	/**
	 * Sorting position of the channel.
	 * @since 0.0.1
	 */
	position?: number;
	/**
	 * The channel's permission overwrites.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/channel#overwrite-object
	 */
	permission_overwrites?: APIOverwriteData[];

	/**
	 * Id of the parent {@link CategoryChannel category} for a channel.
	 * @since 0.0.1
	 */
	parent_id?: string;

	/**
	 * Whether the channel is nsfw.
	 * @since 0.0.1
	 */
	nsfw?: boolean;
}

/**
 * An entry for {@link GuildChannelStore#editPositions}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions-json-params
 */
export interface GuildChannelStorePositionData {
	/**
	 * The {@link Channel channel} ID.
	 * @since 0.0.1
	 */
	id: string;

	/**
	 * The sorting position of the {@link Channel channel}.
	 * @since 0.0.1
	 */
	position: number | null;
}
