/* eslint-disable no-dupe-class-members */
import { Routes, RequestOptions } from '@klasa/rest';
import { DataStore } from './base/DataStore';
import { extender } from '../../../util/Extender';

import type { APIEmojiData } from '@klasa/dapi-types';
import type { Client } from '../../Client';
import type { GuildEmoji } from '../structures/guilds/GuildEmoji';
import type { Guild } from '../structures/guilds/Guild';

/**
 * The store for {@link GuildEmoji guild emojis}.
 * @since 0.0.1
 */
export class GuildEmojiStore extends DataStore<GuildEmoji> {

	/**
	 * The {@link Guild guild} this store belongs to.
	 * @since 0.0.1
	 */
	public readonly guild: Guild;

	/**
	 * Builds the store.
	 * @since 0.0.1
	 * @param client The {@link Client client} this store belongs to.
	 */
	public constructor(client: Client, guild: Guild) {
		super(client, extender.get('GuildEmoji'), client.options.cache.limits.emojis);
		this.guild = guild;
	}

	/**
	 * Creates a new emoji into the {@link Guild guild} and returns it.
	 * @since 0.0.1
	 * @param data The settings for the new emoji.
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/emoji#create-guild-emoji
	 */
	public async add(data: GuildEmojiStoreAddData, requestOptions: RequestOptions = {}): Promise<GuildEmoji> {
		const entry = await this.client.api.post(Routes.guildEmojis(this.guild.id), { ...requestOptions, data }) as APIEmojiData;
		return this._add(entry);
	}

	/**
	 * Deletes an emoji from the {@link Guild guild}.
	 * @since 0.0.1
	 * @param emojiID The {@link GuildEmoji guild emoji} ID.
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/emoji#create-guild-emoji
	 */
	public async remove(emojiID: string, requestOptions: RequestOptions = {}): Promise<this> {
		await this.client.api.post(Routes.guildEmoji(this.guild.id, emojiID), requestOptions);
		return this;
	}

	/**
	 * Returns all the emojis for the guild.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/emoji#list-guild-emojis
	 */
	public fetch(): Promise<this>;
	/**
	 * Returns an emoji given its identifier.
	 * @since 0.0.1
	 * @param emoji The {@link GuildEmoji guild emoji} to fetch.
	 * @see https://discord.com/developers/docs/resources/emoji#get-guild-emoji
	 */
	public fetch(emoji: string): Promise<GuildEmoji>;
	public async fetch(emoji?: string): Promise<GuildEmoji | this> {
		if (emoji) {
			const entry = await this.client.api.get(Routes.guildEmoji(this.guild.id, emoji)) as APIEmojiData;
			return this._add(entry);
		}

		const entries = await this.client.api.get(Routes.guildEmojis(this.guild.id)) as APIEmojiData[];
		for (const entry of entries) this._add(entry);
		return this;
	}

	/**
	 * Adds a new structure to this DataStore
	 * @param data The data packet to add
	 */
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	// @ts-ignore
	protected _add(data: APIEmojiData): GuildEmoji {
		const existing = this.get(data.id as string);
		// eslint-disable-next-line dot-notation
		if (existing) return existing['_patch'](data);

		const entry = new this.Holds(this.client, data, this.guild);
		if (this.client.options.cache.enabled) this.set(entry.id, entry);
		return entry;
	}

}

/**
 * The settings used for {@link GuildEmojiStore#add}.
 * @see https://discord.com/developers/docs/resources/emoji#create-guild-emoji-json-params
 */
export interface GuildEmojiStoreAddData {
	/**
	 * The name of the emoji.
	 */
	name?: string;

	/**
	 * The 128x128 emoji image.
	 */
	image?: Buffer;

	/**
	 * The roles for which this emoji will be whitelisted.
	 */
	roles?: readonly string[];
}
