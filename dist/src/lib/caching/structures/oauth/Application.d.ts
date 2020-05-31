import { Team } from './Team';
import type { APIOauthData } from '@klasa/dapi-types';
import type { Client } from '../../../client/Client';
import type { Guild } from '../guilds/Guild';
import type { User } from '../User';
/**
 * @see https://discord.com/developers/docs/topics/oauth2#get-current-application-information-response-structure
 */
export declare class Application {
    readonly client: Client;
    /**
     * The id of the app.
     * @since 0.0.1
     */
    readonly id: string;
    /**
     * The name of the app.
     * @since 0.0.1
     */
    name: string;
    /**
     * The icon hash of the app.
     * @since 0.0.1
     */
    icon?: string;
    /**
     * The description of the app.
     * @since 0.0.1
     */
    description: string;
    /**
     * An array of rpc origin urls, if rpc is enabled.
     * @since 0.0.1
     */
    rpcOrigins?: string[];
    /**
     * When false only app owner can join the app's bot to guilds.
     * @since 0.0.1
     */
    botPublic: boolean;
    /**
     * When true the app's bot will only join upon completion of the full oauth2 code grant flow.
     * @since 0.0.1
     */
    botRequireCodeGrant: boolean;
    /**
     * Partial user object containing info on the owner of the application.
     * @since 0.0.1
     */
    owner: User;
    /**
     * If this application is a game sold on Discord, this field will be the summary field for the store page of its primary sku.
     * @since 0.0.1
     */
    summary: string;
    /**
     * The base64 encoded key for the GameSDK's GetTicket.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/game-sdk/applications#get-ticket
     */
    verifyKey: string;
    /**
     * If the application belongs to a team, this will be a list of the members of that team.
     * @since 0.0.1
     */
    team: Team | null;
    /**
     * If this application is a game sold on Discord, this field will be the guild to which it has been linked.
     * @since 0.0.1
     */
    guildID: string | null;
    /**
     * If this application is a game sold on Discord, this field will be the id of the "Game SKU" that is created, if exists.
     * @since 0.0.1
     */
    primarySkuID: string | null;
    /**
     * If this application is a game sold on Discord, this field will be the URL slug that links to the store page.
     * @since 0.0.1
     */
    slug: string | null;
    /**
     * If this application is a game sold on Discord, this field will be the hash of the image on store embeds.
     * @since 0.0.1
     */
    coverImage: string | null;
    constructor(client: Client, data: APIOauthData);
    /**
     * The guild for this application if applicable.
     * @since 0.0.4
     */
    get guild(): Guild | null;
    /**
     * Returns an {@link Application application}.
     * @since 0.0.1
     * @param client The {@link Client client} that will manage the created object.
     * @see https://discord.com/developers/docs/topics/oauth2#get-current-application-information
     */
    static fetch(client: Client): Promise<Application>;
}
