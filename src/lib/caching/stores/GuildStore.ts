import { Routes, RequestOptions } from '@klasa/rest';
import { DataStore } from './base/DataStore';
import { extender } from '../../util/Extender';
import { resolveImageToBase64, ImageBufferResolvable } from '../../util/ImageUtil';

import type {
	APIChannelData,
	APIGuildData,
	APIRoleData,
	GuildDefaultMessageNotifications,
	GuildExplicitContentFilterLevel,
	GuildVerificationLevel
} from '@klasa/dapi-types';
import type { Guild } from '../structures/guilds/Guild';
import type { Client } from '../../client/Client';

/**
 * The store for {@link Guild guilds}.
 * @since 0.0.1
 */
export class GuildStore extends DataStore<Guild> {

	/**
	 * Builds the store.
	 * @since 0.0.1
	 * @param client The {@link Client client} this store belongs to.
	 */
	public constructor(client: Client) {
		super(client, extender.get('Guild'), client.options.cache.limits.guilds);
	}

	/**
	 * Creates a {@link Guild guild} in which the client is the owner.
	 * @since 0.0.1
	 * @param data The settings for the new guild.
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/guild#create-guild
	 */
	public async add({ icon, ...options }: GuildStoreAddData, requestOptions: RequestOptions = {}): Promise<Guild> {
		const data: GuildStoreAddData = {
			icon: icon ? await resolveImageToBase64(icon) : icon,
			...options
		};

		const entry = await this.client.api.post(Routes.guilds(), { ...requestOptions, data }) as APIGuildData;
		return this._add(entry);
	}

	/**
	 * Deletes a {@link Guild guild} permanently.
	 * @since 0.0.1
	 * @param data The guild to delete.
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/guild#delete-guild
	 */
	public async remove(guildID: string, requestOptions: RequestOptions = {}): Promise<this> {
		await this.client.api.delete(Routes.guild(guildID), requestOptions);
		return this;
	}

	/**
	 * Returns a {@link Guild guild} by its ID.
	 * @since 0.0.1
	 * @param guildID The {@link Guild guild} ID to fetch.
	 * @see https://discord.com/developers/docs/resources/guild#get-guild
	 */
	public async fetch(guildID: string): Promise<Guild> {
		// eslint-disable-next-line @typescript-eslint/camelcase
		const entry = await this.client.api.get(Routes.guild(guildID), { query: [['with_counts', true]] }) as APIGuildData;
		return this._add(entry);
	}

}

/**
 * The settings used in {@link GuildStore#add}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#create-guild-json-params
 */
export interface GuildStoreAddData {
	/**
	 * The name of the guild (2-100 characters).
	 * @since 0.0.1
	 */
	name: string;

	/**
	 * The voice region id.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/voice#voice-region-object
	 */
	region?: string;

	/**
	 * The image data for the guild icon.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/reference#image-data
	 */
	icon?: ImageBufferResolvable;

	/**
	 * The verification level.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#guild-object-verification-level
	 * @default GuildVerificationLevel.None
	 */
	verification_level?: GuildVerificationLevel;

	/**
	 * The default message notification level.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level
	 * @default GuildDefaultMessageNotifications.AllMessages
	 */
	default_message_notifications?: GuildDefaultMessageNotifications;

	/**
	 * The explicit content filter level.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level
	 * @default GuildExplicitContentFilterLevel.Disabled
	 */
	explicit_content_filter?: GuildExplicitContentFilterLevel;

	/**
	 * The new guild's {@link Role roles}.
	 * @since 0.0.1
	 */
	roles?: APIRoleData[];

	/**
	 * The new guild's {@link GuildChannel channels}.
	 * @since 0.0.1
	 */
	channels?: APIChannelData[];

	/**
	 * The {@link VoiceChannel channel} ID for afk.
	 * @since 0.0.1
	 */
	afk_channel_id?: string | null;

	/**
	 * The afk timeout in seconds.
	 * @since 0.0.1
	 */
	afk_timeout?: number;

	/**
	 * The {@link GuildTextChannel channel} ID where guild notices such as welcome messages and boost events are posted.
	 * @since 0.0.1
	 */
	system_channel_id?: string;
}
