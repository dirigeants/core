import { Cache } from '@klasa/cache';
import { DataStore } from './base/DataStore';
import { RequestOptions } from '@klasa/rest';
import type { Client } from '../../client/Client';
import type { GuildMember, MemberData } from '../structures/guilds/GuildMember';
import type { Guild } from '../structures/guilds/Guild';
/**
 * The store for {@link GuildMember guild members}.
 * @since 0.0.1
 */
export declare class GuildMemberStore extends DataStore<GuildMember> {
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
     * Adds a user to the guild, provided you have a valid oauth2 access token for the user with the `guilds.join` scope.
     * @since 0.0.1
     * @param userID The {@link User user} ID to add.
     * @param data The data to send for this request.
     * @param requestOptions The additional request options.
     * @returns A {@link GuildMember} instance if the user joined the server, `null` if it was already joined.
     */
    add(userID: string, data: GuildMemberStoreAddData, requestOptions?: RequestOptions): Promise<GuildMember | null>;
    /**
     * Kicks a member from the {@link Guild guild}.
     * @since 0.0.1
     * @param userID The {@link User user} ID to be kicked.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#remove-guild-member
     */
    remove(userID: string, requestOptions?: RequestOptions): Promise<this>;
    /**
     * Returns a {@link GuildMember member} instance, retrieving from cache if existing.
     * @since 0.0.1
     * @param userID The {@link User user} ID to fetch.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-member
     */
    fetch(userID: string): Promise<GuildMember>;
    /**
     * Returns up to 1000 {@link GuildMember members}.
     * @since 0.0.1
     * @param userID The {@link User user} ID to fetch.
     * @see https://discord.com/developers/docs/resources/guild#list-guild-members
     */
    fetch(options?: GuildMemberStoreFetchOptions): Promise<Cache<string, GuildMember>>;
    /**
     * Resolves data into Structures
     * @param data The data to resolve
     */
    resolve(data: unknown): GuildMember | null;
    /**
     * Resolves data into ids
     * @param data The data to resolve
     */
    resolveID(data: unknown): string | null;
    /**
     * Adds a new structure to this DataStore
     * @param data The data packet to add
     */
    protected _add(data: MemberData): GuildMember;
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
