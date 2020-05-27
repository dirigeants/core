import { RequestOptions } from '@klasa/rest';
import { Structure } from '../base/Structure';
import { Permissions } from '../../../util/bitfields/Permissions';
import type { APIRoleData } from '@klasa/dapi-types';
import type { Client } from '../../../client/Client';
import type { Guild } from './Guild';
import type { GuildChannel } from '../channels/GuildChannel';
/**
 * @see https://discord.com/developers/docs/topics/permissions#role-object
 */
export declare class Role extends Structure {
    /**
     * The {@link Guild guild} this role belongs to.
     * @since 0.0.1
     */
    readonly guild: Guild;
    /**
     * The role's ID.
     * @since 0.0.1
     */
    readonly id: string;
    /**
     * The role's name.
     * @since 0.0.1
     */
    name: string;
    /**
     * The role's integer representation of hexadecimal color code.
     * @since 0.0.1
     */
    color: number;
    /**
     * Whether or not the role is pinned in the user listing.
     * @since 0.0.1
     */
    hoist: boolean;
    /**
     * The role's position.
     * @since 0.0.1
     */
    position: number;
    /**
     * The role's permissions.
     * @since 0.0.1
     */
    permissions: Readonly<Permissions>;
    /**
     * Whether or not the role is managed by an integration.
     * @since 0.0.1
     */
    readonly managed: boolean;
    /**
     * Whether or not the role is mentionable.
     * @since 0.0.1
     */
    mentionable: boolean;
    /**
     * Whether the role is deleted.
     * @since 0.0.1
     */
    deleted: boolean;
    constructor(client: Client, data: APIRoleData, guild: Guild);
    /**
     * Checks permissions for this member in a given channel.
     * @param channel The channel to check permissions in
     */
    permissionsIn(channel: GuildChannel): Readonly<Permissions>;
    /**
     * Modifies the role's settings.
     * @since 0.0.1
     * @param data The new settings for the role.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-role
     */
    modify(data: RoleModifyOptions, requestOptions?: RequestOptions): Promise<this>;
    /**
     * Deletes the role from the {@link Guild guild}.
     * @since 0.0.1
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#delete-guild-role
     */
    delete(requestOptions?: RequestOptions): Promise<this>;
    /**
     * Adds the role to a {@link GuildMember member} by its id.
     * @since 0.0.4
     * @param memberID The id of the member you want to add the role.
     * @see https://discord.com/developers/docs/resources/guild#add-guild-member-role
     */
    addTo(memberID: string): Promise<this>;
    /**
     * Removes the role from a {@link GuildMember member} by its id.
     * @since 0.0.4
     * @param memberID The id of the member you want to remove the role.
     * @see https://discord.com/developers/docs/resources/guild#remove-guild-member-role
     */
    removeFrom(memberID: string): Promise<this>;
    /**
     * Defines the toString behavior of this structure.
     * @since 0.0.4
     */
    toString(): string;
    protected _patch(data: APIRoleData): this;
}
/**
 * The options for {@link Role#modify}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#modify-guild-role-json-params
 */
export interface RoleModifyOptions {
    /**
     * Name of the role.
     * @since 0.0.1
     */
    name?: string | null;
    /**
     * Bitwise value of the enabled/disabled permissions.
     * @since 0.0.1
     */
    permissions?: number | null;
    /**
     * RGB color value
     * @since 0.0.1
     */
    color?: number | null;
    /**
     * Whether the role should be displayed separately in the sidebar
     * @since 0.0.1
     */
    hoist?: boolean | null;
    /**
     * Whether the role should be mentionable
     * @since 0.0.1
     */
    mentionable?: boolean | null;
}
