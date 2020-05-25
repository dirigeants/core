import { Permissions } from '../../../util/bitfields/Permissions';
import { Structure } from '../base/Structure';
import type { APIOverwriteData } from '@klasa/dapi-types';
import type { Client } from '../../../client/Client';
import type { GuildChannel } from '../channels/GuildChannel';
import type { RequestOptions } from '@klasa/rest';
export declare type OverwriteData = Omit<APIOverwriteData, 'id'>;
/**
 * @see https://discord.com/developers/docs/resources/channel#overwrite-object
 */
export declare class Overwrite extends Structure {
    /**
     * A {@link Role} or {@link User} id.
     * @since 0.0.1
     */
    readonly id: string;
    /**
     * The {@link GuildChannel channel} this is for.
     * @since 0.0.1
     */
    readonly channel: GuildChannel;
    /**
     * Either "role" or "member".
     * @since 0.0.1
     */
    type: 'role' | 'member';
    /**
     * The allowed permissions in this overwrite.
     * @since 0.0.1
     */
    allow: Readonly<Permissions>;
    /**
     * The denied permissions in this overwrite.
     * @since 0.0.1
     */
    deny: Readonly<Permissions>;
    /**
     * If the overwrite has been deleted.
     * @since 0.0.1
     */
    deleted: boolean;
    constructor(client: Client, data: APIOverwriteData, channel: GuildChannel);
    /**
     * Deletes this overwrite.
     * @param requestOptions The additional request options.
     */
    delete(requestOptions?: RequestOptions): Promise<this>;
    /**
     * Modifies this overwrite.
     * @param options The modify options
     * @param requestOptions The additional request options.
     */
    modify(options: Partial<OverwriteData>, requestOptions?: RequestOptions): Promise<this>;
    protected _patch(data: APIOverwriteData | OverwriteData): this;
}
