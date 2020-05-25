import { Structure } from './base/Structure';
import { Client } from '../../client/Client';
import type { DMChannel } from './channels/DMChannel';
import type { APIUserData, APIUserFlags, PremiumType } from '@klasa/dapi-types';
/**
 * @see https://discord.com/developers/docs/resources/user#user-object
 */
export declare class User<T = Client> extends Structure<T> {
    /**
     * The user's ID.
     * @since 0.0.1
     */
    readonly id: string;
    /**
     * The user's username, not unique across the platform.
     * @since 0.0.1
     */
    username: string;
    /**
     * The user's 4-digit discord-tag.
     * @since 0.0.1
     */
    discriminator: string;
    /**
     * The user's avatar hash.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/reference#image-formatting
     */
    avatar: string | null;
    /**
     * Whether or not the user belongs to an OAuth2 application.
     * @since 0.0.1
     */
    bot: boolean;
    /**
     * Whether or not the user is an Official Discord System user (part of the urgent message system).
     * @since 0.0.1
     */
    system?: boolean;
    /**
     * Whether or not the user has two factor enabled on their account.
     * @since 0.0.1
     */
    mfaEnabled?: boolean;
    /**
     * The user's chosen language option.
     * @since 0.0.1
     */
    locale?: string;
    /**
     * Whether or not the email on this account has been verified.
     * @since 0.0.1
     */
    verified?: boolean;
    /**
     * The user's email.
     * @since 0.0.1
     */
    email?: string | null;
    /**
     * The flags on a user's account.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/user#user-object-user-flags
     */
    flags?: APIUserFlags;
    /**
     * The type of Nitro subscription on a user's account.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/user#user-object-premium-types
     */
    premiumType?: PremiumType;
    /**
     * The public flags on a user's account.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/user#user-object-user-flags
     */
    publicFlags?: APIUserFlags;
    constructor(client: T, data: APIUserData);
    /**
     * Gets an existing DMChannel from the cache.
     * @since 0.0.1
     */
    get channel(): DMChannel | null;
    /**
     * Returns the users username and discriminator.
     * @since 0.0.1
     */
    get tag(): string;
    /**
     * Gets or Fetches a DM channel for this user.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/user#create-dm
     */
    openDM(): Promise<DMChannel>;
    /**
     * Closes a DM channel for this user if one exists.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/channel#deleteclose-channel
     */
    closeDM(): Promise<DMChannel | null>;
    /**
     * Defines toString behavior for members.
     * @since 0.0.1
     */
    toString(): string;
    protected _patch(data: APIUserData): this;
}
