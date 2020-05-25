import { Structure } from '../base/Structure';
import type { RequestOptions } from '@klasa/rest';
import type { APIBanData } from '@klasa/dapi-types';
import type { Client } from '../../../client/Client';
import type { Guild } from './Guild';
import type { User } from '../User';
/**
 * @see https://discord.com/developers/docs/resources/guild#ban-object
 */
export declare class Ban extends Structure {
    /**
     * The user's ID that got banned.
     * @since 0.0.1
     */
    readonly id: string;
    /**
     * The reason for the ban.
     * @since 0.0.1
     */
    readonly reason: string | null;
    /**
     * The guild this ban is from.
     * @since 0.0.1
     */
    readonly guild: Guild;
    /**
     * If the ban has been removed.
     * @since 0.0.1
     */
    deleted: boolean;
    constructor(client: Client, data: APIBanData, guild: Guild);
    /**
     * Deletes the ban. (unbans the user)
     * @since 0.0.1
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#remove-guild-ban
     */
    delete(requestOptions?: RequestOptions): Promise<this>;
    /**
     * The user.
     * @since 0.0.1
     */
    get user(): User | null;
    protected _patch(): this;
}
