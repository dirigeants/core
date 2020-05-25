import { RequestOptions } from '@klasa/rest';
import { DataStore } from './base/DataStore';
import type { APIInviteData } from '@klasa/dapi-types';
import type { Invite } from '../structures/Invite';
import type { Guild } from '../structures/guilds/Guild';
import type { Client } from '../../client/Client';
/**
 * The store for {@link Invite guild invites}.
 * @since 0.0.1
 */
export declare class GuildInviteStore extends DataStore<Invite> {
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
     * Deletes an invite given its code.
     * @since 0.0.1
     * @param code The {@link Invite#code invite code}.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/invite#delete-invite
     */
    remove(code: string, requestOptions?: RequestOptions): Promise<Invite>;
    /**
     * Returns a list of {@link Invite invite}s with their metadata.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#get-guild-invites
     */
    fetch(): Promise<this>;
    /**
     * Adds a new structure to this DataStore
     * @param data The data packet to add
     * @param cache If the data should be cached
     */
    protected _add(data: APIInviteData): Invite;
}
