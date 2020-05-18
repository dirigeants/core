/* eslint-disable no-dupe-class-members */
import { Cache } from '@klasa/cache';
import { DataStore } from './base/DataStore';
import { extender } from '../../../util/Extender';
import { Routes, RequestOptions } from '@klasa/rest';

import type { APIUserData, APIGuildMemberData } from '@klasa/dapi-types';
import type { Client } from '../../Client';
import type { GuildMember, MemberData } from '../structures/guilds/GuildMember';
import type { Guild } from '../structures/guilds/Guild';

/**
 * The store for {@link GuildMember guild members}.
 * @since 0.0.1
 */
export class GuildMemberStore extends DataStore<GuildMember> {

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
		super(client, extender.get('GuildMember'), client.options.cache.limits.members);
		this.guild = guild;
	}

	/**
	 * Adds a user to the guild, provided you have a valid oauth2 access token for the user with the `guilds.join` scope.
	 * @since 0.0.1
	 * @param userID The {@link User user} ID to add.
	 * @param data The data to send for this request.
	 * @param requestOptions The additional request options.
	 * @returns A {@link GuildMember} instance if the user joined the server, `null` if it was already joined.
	 */
	public async add(userID: string, data: GuildMemberStoreAddData, requestOptions: RequestOptions = {}): Promise<GuildMember | null> {
		const entry = await this.client.api.put(Routes.guildMember(this.guild.id, userID), { ...requestOptions, data }) as APIGuildMemberData | undefined;
		return entry ? this._add(entry) : null;
	}

	/**
	 * Returns a {@link GuildMember member} instance, retrieving from cache if existing.
	 * @since 0.0.1
	 * @param userID The {@link User user} ID to fetch.
	 * @see https://discord.com/developers/docs/resources/guild#get-guild-member
	 */
	public fetch(userID: string): Promise<GuildMember>;
	/**
	 * Returns up to 1000 {@link GuildMember members}.
	 * @since 0.0.1
	 * @param userID The {@link User user} ID to fetch.
	 * @see https://discord.com/developers/docs/resources/guild#list-guild-members
	 */
	public fetch(options?: GuildMemberStoreFetchOptions): Promise<Cache<string, GuildMember>>;
	public async fetch(idOrOptions?: string | GuildMemberStoreFetchOptions): Promise<GuildMember | Cache<string, GuildMember>> {
		if (typeof idOrOptions === 'string') {
			const previous = this.get(idOrOptions);
			if (previous) return previous;

			const member = await this.client.api.get(Routes.guildMember(this.guild.id, idOrOptions)) as APIGuildMemberData;
			return this._add(member);
		}

		const entries = await this.client.api.get(Routes.guildMembers(this.guild.id), { data: idOrOptions }) as APIGuildMemberData[];

		const cache = new Cache<string, GuildMember>();
		for (const entry of entries) {
			const member = this._add(entry);
			cache.set(member.id, member);
		}
		return cache;
	}

	/**
	 * Adds a new structure to this DataStore
	 * @param data The data packet to add
	 */
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	// @ts-ignore
	protected _add(data: MemberData): GuildMember {
		const existing = this.get((data.user as APIUserData).id);
		// eslint-disable-next-line dot-notation
		if (existing) return existing['_patch'](data);

		const entry = new this.Holds(this.client, data, this.guild);
		if (this.client.options.cache.enabled) this.set(entry.id, entry);
		return entry;
	}

}

/**
 * The data for {@link GuildMemberStore#add}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#add-guild-member-json-params
 */
export interface GuildMemberStoreAddData {
	/**
	 * An oauth2 access token granted with the `guilds.join` to the bot's application for the user you want to add to the guild.
	 * @since 0.0.1
	 */
	access_token: string;

	/**
	 * Value to set {@link User user}'s nickname to.
	 * @since 0.0.1
	 */
	nick?: string;

	/**
	 * Array of {@link Role role} IDs the member is assigned.
	 * @since 0.0.1
	 */
	roles?: string[];

	/**
	 * Whether the user is muted in voice channels.
	 * @since 0.0.1
	 */
	mute?: boolean;

	/**
	 * Whether the user is deafened in voice channels.
	 * @since 0.0.1
	 */
	deaf?: boolean;
}

/**
 * The options for {@link GuildMemberStore#fetch}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#list-guild-members-query-string-params
 */
export interface GuildMemberStoreFetchOptions {
	/**
	 * Max number of members to return (1-1000).
	 * @since 0.0.1
	 */
	limit?: number;

	/**
	 * The highest user id in the previous page.
	 * @since 0.0.1
	 */
	after?: string;
}
