/* eslint-disable no-dupe-class-members */
import { DataStore, Constructor } from './base/DataStore';
import { Ban } from '../structures/guilds/Ban';
import { Cache } from '@klasa/cache';
import { Routes } from '@klasa/rest';

import type { Client } from '../../Client';
import type { Guild } from '../structures/guilds/Guild';
import type { APIBanData } from '@klasa/dapi-types';

/**
 * The store for {@link Ban bans}.
 */
export class BanStore extends DataStore<Ban> {

	/**
	 * The {@link Guild} that owns this store.
	 * @since 0.0.1
	 */
	public readonly guild: Guild;

	public constructor(client: Client, guild: Guild) {
		super(client, Ban as Constructor<Ban>);
		this.guild = guild;
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
			const ban = new Ban(this.client, banData);
			if (cache) this.set(ban.id, ban);
			return ban;
		}

		const bansData = await this.client.api.get(Routes.guildBans(this.guild.id)) as APIBanData[];
		const output = cache ? this : new Cache<string, Ban>();
		for (const banData of bansData) {
			const ban = new Ban(this.client, banData);
			output.set(ban.id, ban);
		}

		return output;
	}

}

export interface BanStoreFetchOptions {
	id?: string;
	cache?: boolean;
}
