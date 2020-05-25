import { RequestOptions } from '@klasa/rest';
import { DataStore } from './base/DataStore';
import type { APIRoleData } from '@klasa/dapi-types';
import type { Client } from '../../client/Client';
import type { Role } from '../structures/guilds/Role';
import type { Guild } from '../structures/guilds/Guild';
/**
 * The store for {@link Guild guild} {@link Role roles}.
 * @since 0.0.1
 */
export declare class RoleStore extends DataStore<Role> {
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
     * Gets the highest role from this store.
     * @since 0.0.1
     */
    highest(): Role | undefined;
    /**
     * Creates a new {@link Role role} for the {@link Guild guild}.
     * @since 0.0.1
     * @param data The role settings.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#create-guild-role
     */
    add(data?: RoleStoreAddOptions, requestOptions?: RequestOptions): Promise<Role>;
    /**
     * Deletes a {@link Role role} from the {@link Guild guild}.
     * @since 0.0.1
     * @param roleID The {@link Role role} ID to delete.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#delete-guild-role
     */
    remove(roleID: string, requestOptions?: RequestOptions): Promise<this>;
    /**
     * Modifies the positions of the roles.
     * @since 0.0.1
     * @param data The set of roles and their positions for the {@link Guild guild}.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-role-positions
     */
    modifyPositions(data: readonly RoleStorePositionData[], requestOptions?: RequestOptions): Promise<this>;
    /**
     * Returns the list of {@link Role role}s as updated from Discord.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#get-guild-roles
     */
    fetch(): Promise<this>;
    /**
     * Adds a new structure to this DataStore
     * @param data The data packet to add
     */
    protected _add(data: APIRoleData): Role;
}
/**
 * The options for {@link RoleStore#add}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#create-guild-role-json-params
 */
export interface RoleStoreAddOptions {
    /**
     * name of the role.
     * @since 0.0.1
     * @default 'new role'
     */
    name?: string;
    /**
     * bitwise value of the enabled/disabled permissions.
     * @since 0.0.1
     * @default 'everyone permissions in guild'
     */
    permissions?: number;
    /**
     * RGB color value.
     * @since 0.0.1
     * @default 0
     */
    color?: number;
    /**
     * whether the role should be displayed separately in the sidebar.
     * @since 0.0.1
     * @default false
     */
    hoist?: boolean;
    /**
     * whether the role should be mentionable.
     * @since 0.0.1
     * @default false
     */
    mentionable?: boolean;
}
/**
 * An entry for {@link RoleStore#modifyPositions}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#modify-guild-role-positions-json-params
 */
export interface RoleStorePositionData {
    /**
     * The {@link Role role} ID.
     * @since 0.0.1
     */
    id: string;
    /**
     * The sorting position of the {@link Role role}.
     * @since 0.0.1
     */
    position?: number | null;
}
