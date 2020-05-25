import { RequestOptions } from '@klasa/rest';
import { DataStore } from './base/DataStore';
import { GuildMember } from '../structures/guilds/GuildMember';
import { Role } from '../structures/guilds/Role';
import type { APIOverwriteData } from '@klasa/dapi-types';
import type { Client } from '../../client/Client';
import type { Overwrite, OverwriteData } from '../structures/guilds/Overwrite';
import type { GuildChannel } from '../structures/channels/GuildChannel';
export interface MemberOverwrites {
    everyone?: Overwrite;
    roles: Overwrite[];
    member?: Overwrite;
}
export interface RoleOverwrites {
    everyone?: Overwrite;
    role?: Overwrite;
}
/**
 * The store for {@link Overwrite Overwrites}.
 * @since 0.0.1
 */
export declare class OverwriteStore extends DataStore<Overwrite> {
    /**
     * The {@link GuildChannel channel} this store belongs to.
     * @since 0.0.1
     */
    readonly channel: GuildChannel;
    /**
     * Builds the store.
     * @since 0.0.1
     * @param client The {@link Client client} this store belongs to.
     * @param client The {@link Client client} this store belongs to.
     */
    constructor(client: Client, channel: GuildChannel);
    /**
     * Creates a new {@link Overwrite overwrite} for the {@link GuildChannel channel}.
     * @since 0.0.1
     * @param id The id the overwrite is for
     * @param data The overwrite data.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/channel#edit-channel-permissions
     */
    add(id: string, data: OverwriteData, requestOptions?: RequestOptions): Promise<Overwrite>;
    /**
     * Deletes a {@link Overwrite overwrite} from the {@link GuildChannel channel}.
     * @since 0.0.1
     * @param overwriteID The {@link Role role} ID to delete.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/channel#delete-channel-permission
     */
    remove(overwriteID: string, requestOptions?: RequestOptions): Promise<this>;
    /**
     * Gets the overwrites for a given guild member or role.
     * @param target
     */
    for(target: GuildMember): MemberOverwrites;
    for(target: Role): RoleOverwrites;
    /**
     * Adds a new structure to this DataStore
     * @param data The data packet to add
     */
    protected _add(data: APIOverwriteData): Overwrite;
}
