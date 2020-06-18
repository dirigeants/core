import { RequestOptions } from '@klasa/rest';
import { Channel } from './Channel';
import { OverwriteStore } from '../../stores/OverwriteStore';
import { Permissions } from '../../../util/bitfields/Permissions';
import { GuildChannelInviteStore } from '../../stores/GuildChannelInviteStore';
import type { APIChannelData, APIOverwriteData } from '@klasa/dapi-types';
import type { Client } from '../../../client/Client';
import type { Guild } from '../guilds/Guild';
import type { GuildMember } from '../guilds/GuildMember';
import type { CategoryChannel } from './CategoryChannel';
import type { Role } from '../guilds/Role';
/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
export declare abstract class GuildChannel extends Channel {
    /**
     * The name of the channel (2-100 characters).
     * @since 0.0.1
     */
    name: string;
    /**
     * Sorting position of the channel.
     * @since 0.0.1
     */
    position: number;
    /**
     * Id of the parent category for a channel (each parent category can contain up to 50 channels).
     * @since 0.0.1
     */
    parentID: string | null;
    /**
     * Explicit permission overwrites for members and roles.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/channel#overwrite-object
     */
    permissionOverwrites: OverwriteStore;
    /**
     * The {@link GuildChannelInviteStore invites} store for this channel.
     * @since 0.0.3
     */
    readonly invites: GuildChannelInviteStore;
    /**
     * The {@link Guild guild} this channel belongs to.
     * @since 0.0.1
     */
    readonly guild: Guild;
    constructor(client: Client, data: APIChannelData, guild?: Guild | null);
    /**
     * The parent {@type CategoryChannel channel} for this channel.
     * @since 0.0.1
     */
    get parent(): CategoryChannel | null;
    /**
     * If the overwrites are synced to the parent channel.
     * @since 0.0.1
     */
    get synced(): boolean | null;
    /**
     * If the client can delete the channel.
     * @since 0.0.1
     */
    get deletable(): boolean | null;
    /**
     * If the client can view the channel.
     * @since 0.0.1
     */
    get viewable(): boolean | null;
    /**
     * If the client can manage the channel.
     * @since 0.0.1
     */
    get manageable(): boolean | null;
    /**
     * Checks what permissions a {@link GuildMember member} or {@link Role role} has in this {@link GuildChannel channel}
     * @param target The guild member you are checking permissions for
     */
    permissionsFor(target: GuildMember | Role): Readonly<Permissions>;
    /**
     * Deletes the channel from the {@link Guild guild}.
     * @since 0.0.1
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/channel#deleteclose-channel
     */
    delete(requestOptions?: RequestOptions): Promise<this>;
    /**
     * Modifies this channel.
     * @param data The channel modify options.
     * @param requestOptions The request options.
     * @since 0.0.1
     */
    modify(data: ChannelModifyOptions, requestOptions?: RequestOptions): Promise<this>;
    /**
     * Syncs the permission overwrites with the parent channel.
     * @param requestOptions The additional request options.
     * @since 0.0.1
     */
    syncPermissions(requestOptions?: RequestOptions): Promise<this>;
    protected _patch(data: APIChannelData): this;
}
export interface ChannelModifyOptions {
    name?: string;
    position?: number | null;
    permission_overwrites?: APIOverwriteData[] | null;
}
