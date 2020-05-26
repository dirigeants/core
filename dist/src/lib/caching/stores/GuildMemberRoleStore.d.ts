import { ProxyCache } from '@klasa/cache';
import { RequestOptions } from '@klasa/rest';
import type { GuildMember } from '../structures/guilds/GuildMember';
import type { Role } from '../structures/guilds/Role';
import type { Guild } from '../structures/guilds/Guild';
import type { Client } from '../../client/Client';
/**
 * The store for {@link Role member roles}.
 * @since 0.0.1
 */
export declare class GuildMemberRoleStore extends ProxyCache<string, Role> {
    /**
     * The {@link Client client} this store belongs to.
     * @since 0.0.1
     */
    readonly client: Client;
    /**
     * The {@link GuildMember guild member} this store belongs to.
     * @since 0.0.1
     */
    readonly member: GuildMember;
    /**
     * Builds the store.
     * @since 0.0.1
     * @param member The {@link GuildMember guild member} this store belongs to.
     */
    constructor(member: GuildMember, keys: string[]);
    /**
     * Gets the highest role from this store.
     * @since 0.0.1
     */
    highest(): Role | undefined;
    /**
     * The {@link Guild guild} this store belongs to.
     * @since 0.0.1
     */
    get guild(): Guild;
    /**
     * Adds a {@link Role role} to the {@link GuildMember member}.
     * @since 0.0.1
     * @param roleID The {@link Role role} ID to add.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#add-guild-member-role
     */
    add(roleID: string, requestOptions?: RequestOptions): Promise<this>;
    /**
     * Removes a {@link Role role} from the {@link GuildMember member}.
     * @since 0.0.1
     * @param roleID The {@link Role role} ID to remove.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#remove-guild-member-role
     */
    remove(roleID: string, requestOptions?: RequestOptions): Promise<this>;
    /**
     * Modifies all the roles for the {@link GuildMember member}.
     * @since 0.0.1
     * @param roles A collection of {@link Role role} IDs.
     * @param requestOptions The additional request options.
     */
    modify(roles: readonly string[], requestOptions?: RequestOptions): Promise<this>;
    /**
     * The JSON representation of this object.
     */
    toJSON(): string[];
}
