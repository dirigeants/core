import { User } from './User';
import { ClientPresence } from './presences/ClientPresence';
import { ImageBufferResolvable } from '../../util/ImageUtil';
import type { APIUserData } from '@klasa/dapi-types';
import type { Client } from '../../client/Client';
/**
 * Represents the client's user account.
 * @see https://discord.com/developers/docs/resources/user#user-object
 */
export declare class ClientUser extends User {
    /**
     * The client presence.
     * @since 0.0.1
     */
    presence: ClientPresence;
    constructor(client: Client, data: APIUserData);
    /**
     * Modifies the client user.
     * @since 0.0.1
     * @param options The options to be set.
     * @see https://discord.com/developers/docs/resources/user#modify-current-user
     */
    modify({ avatar, ...options }: ClientUserModifyOptions): Promise<this>;
    /**
     * Modifies the client user's username.
     * @since 0.0.1
     * @param username The username to be set.
     * @see https://discord.com/developers/docs/resources/user#modify-current-user
     */
    setUsername(username: string): Promise<this>;
    /**
     * Modifies the client user's avatar.
     * @since 0.0.1
     * @param avatar The avatar to be set.
     * @see https://discord.com/developers/docs/resources/user#modify-current-user
     */
    setAvatar(avatar: ImageBufferResolvable): Promise<this>;
}
/**
 * The options for {@link ClientUser#modify}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/user#modify-current-user-json-params
 */
export interface ClientUserModifyOptions {
    /**
     * User's username, if changed may cause the user's discriminator to be randomized.
     * @since 0.0.1
     */
    username?: string;
    /**
     * If passed, modifies the user's avatar
     * @since 0.0.1
     */
    avatar?: ImageBufferResolvable | null;
}
