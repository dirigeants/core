import { Cache } from '@klasa/cache';
import { RequestOptions } from '@klasa/rest';
import { DataStore } from './base/DataStore';
import type { Ban } from '../structures/guilds/Ban';
import type { Client } from '../../client/Client';
import type { Guild } from '../structures/guilds/Guild';
import type { GuildBanAddDispatch } from '@klasa/ws';
/**
 * The store for {@link Ban bans}.
 * @since 0.0.1
 */
export declare class BanStore extends DataStore<Ban> {
    /**
     * The {@link Guild guild} this store belongs to.
     * @since 0.0.1
     */
    readonly guild: Guild;
    /**
     * Builds the store.
     * @since 0.0.1
     * @param client The {@link Client client} this store belongs to.
     * @param guild The {@link Guild guild} this store belongs to.
     */
    constructor(client: Client, guild: Guild);
    /**
     * Adds a user to the guild's bans list and optionally deletes previous messages from that user
     * @since 0.0.1
     * @param userID The {@link User user} ID to ban from the guild.
     * @see https://discord.com/developers/docs/resources/guild#create-guild-ban
     */
    add(userID: string, options?: BanAddOptions): Promise<this>;
    /**
     * Remove a user from the guild's bans list
     * @since 0.0.1
     * @param userID The {@link User user} ID to unban from the guild.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#remove-guild-ban
     */
    remove(userID: string, requestOptions?: RequestOptions): Promise<this>;
    /**
     * Retrieves an individual {@link Ban} from the API.
     * @since 0.0.1
     * @param options The options containing the {@link User}'s ID
     * @example
     * const ban = await message.guild.bans.fetch({ id: '339944237305036812' });
     * console.log(`The user ${ban.id} was banned for the reason: ${ban.reason}.`);
     */
    fetch(options: {
        id: string;
        cache?: boolean;
    }): Promise<Ban>;
    /**
     * Retrieves all bans for this guild from the API, returning all values as a {@link Cache} without populating the store.
     * @since 0.0.1
     * @param options The options without an {@link User}'s ID.
     * @example
     * const bans = await message.guild.bans.fetch({ cache: false });
     * console.log(`${bans.size} users are banned.`);
     */
    fetch(options: {
        cache: false;
    }): Promise<Cache<string, Ban>>;
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
    fetch(options?: {
        cache?: true;
    }): Promise<this>;
    /**
     * Adds a new structure to this DataStore
     * @param data The data packet to add
     * @param cache If the data should be cached
     */
    protected _add(data: GuildBanAddDispatch['d']): Ban;
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
