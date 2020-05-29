/* eslint-disable no-dupe-class-members */
import { Cache } from '@klasa/cache';
import { Routes, RequestOptions } from '@klasa/rest';
import { DataStore } from './base/DataStore';
import { extender } from '../../util/Extender';

import type { APIBanData } from '@klasa/dapi-types';
import type { Ban } from '../structures/guilds/Ban';
import type { Client } from '../../client/Client';
import type { Guild } from '../structures/guilds/Guild';
import type { GuildBanAddDispatch } from '@klasa/ws';

/**
 * The store for {@link Ban bans}.
 * @since 0.0.1
 */
export class BanStore extends DataStore<Ban> {

	/**
	 * The {@link Guild guild} this store belongs to.
	 * @since 0.0.1
	 */
	public readonly guild: Guild;

	/**
	 * Builds the store.
	 * @since 0.0.1
	 * @param client The {@link Client client} this store belongs to.
	 * @param guild The {@link Guild guild} this store belongs to.
	 */
	public constructor(client: Client, guild: Guild) {
		super(client, extender.get('Ban'), client.options.cache.limits.bans);
		this.guild = guild;
	}

	/**
	 * Adds a user to the guild's bans list and optionally deletes previous messages from that user
	 * @since 0.0.1
	 * @param userID The {@link User user} ID to ban from the guild.
	 * @see https://discord.com/developers/docs/resources/guild#create-guild-ban
	 */
	public async add(userID: string, options: BanAddOptions = {}): Promise<this> {
		await this.client.api.put(Routes.guildBan(this.guild.id, userID), { ...options, query: [['delete-message-days', options.deleteMessageDays]] });
		return this;
	}

	/**
	 * Remove a user from the guild's bans list
	 * @since 0.0.1
	 * @param userID The {@link User user} ID to unban from the guild.
	 * @param requestOptions The additional request options.
	 * @see https://discord.com/developers/docs/resources/guild#remove-guild-ban
	 */
	public async remove(userID: string, requestOptions: RequestOptions = {}): Promise<this> {
		await this.client.api.delete(Routes.guildBan(this.guild.id, userID), requestOptions);
		return this;
	}

	/**
	 * Retrieves an individual {@link Ban} from the API.
	 * @since 0.0.1
	 * @param options The options containing the {@link User}'s ID
	 * @example
	 * const ban = await message.guild.bans.fetch({ id: '339944237305036812' });
	 * console.log(`The user ${ban.id} was banned for the reason: ${ban.reason}.`);
	 */
	public fetch(options: { id: string, cache?: boolean }): Promise<Ban>;
	/**
	 * Retrieves all bans for this guild from the API, returning all values as a {@link Cache} without populating the store.
	 * @since 0.0.1
	 * @param options The options without an {@link User}'s ID.
	 * @example
	 * const bans = await message.guild.bans.fetch({ cache: false });
	 * console.log(`${bans.size} users are banned.`);
	 */
	public fetch(options: { cache: false }): Promise<Cache<string, Ban>>;
	/**
	 * Retrieves all bans for this guild from the API, populating the store and returning itself.
	 * @since 0.0.1
	 * @param options The options without an {@link User}'s ID.
	 * @example
	 * const bans = await message.guild.bans.fetch();
	 * console.log(`${bans.size} users are banned.`);
	 *
	 * @example
	 * const bans = await message.guild.bans.fetch({ cache: true });
	 * console.log(`${bans.size} users are banned.`);
	 */
	public fetch(options?: { cache?: true }): Promise<this>;
	public async fetch(options: BanStoreFetchOptions = {}): Promise<this | Ban | Cache<string, Ban>> {
		const id = options.id ?? null;
		const cache = options.cache ?? true;

		if (id) {
			const cached = super.get(id);
			if (cached) return cached;

			const banData = await this.client.api.get(Routes.guildBan(this.guild.id, id)) as APIBanData;
			const ban = new this.Holds(this.client, banData, this.guild);
			if (cache) this.set(ban.id, ban);
			return ban;
		}

		const bansData = await this.client.api.get(Routes.guildBans(this.guild.id)) as APIBanData[];
		const output = cache ? this : new Cache<string, Ban>();
		for (const banData of bansData) {
			const ban = new this.Holds(this.client, banData, this.guild);
			output.set(ban.id, ban);
		}

		return output;
	}

	/**
	 * Adds a new structure to this DataStore
	 * @param data The data packet to add
	 * @param cache If the data should be cached
	 */
	protected _add(data: GuildBanAddDispatch['d']): Ban {
		const existing = this.get(data.user.id);
		// eslint-disable-next-line dot-notation
		if (existing) return existing['_patch']();

		const entry = new this.Holds(this.client, data, this.guild);
		if (this.client.options.cache.enabled) this.set(entry.id, entry);
		return entry;
	}

}

/**
 * The options for {@link BanStore#add}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#create-guild-ban-query-string-params
 */
export interface BanAddOptions extends RequestOptions {
	/**
	 * Number of days to delete messages for (0-7).
	 * @since 0.0.1
	 */
	deleteMessageDays?: number;
}

export interface BanStoreFetchOptions {
	id?: string;
	cache?: boolean;
}
