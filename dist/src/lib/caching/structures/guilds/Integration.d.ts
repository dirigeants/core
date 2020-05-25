import { RequestOptions } from '@klasa/rest';
import { Structure } from '../base/Structure';
import type { APIIntegrationData, APIIntegrationAccountData } from '@klasa/dapi-types';
import type { Client } from '../../../client/Client';
import type { Guild } from './Guild';
import type { Role } from './Role';
import type { User } from '../User';
/**
 * @see https://discord.com/developers/docs/resources/guild#integration-object
 */
export declare class Integration extends Structure {
    /**
     * The {@link Guild guild} this integration belongs to.
     * @since 0.0.1
     */
    readonly guild: Guild;
    /**
     * The integration id.
     * @since 0.0.1
     */
    readonly id: string;
    /**
     * The integration name.
     * @since 0.0.1
     */
    readonly name: string;
    /**
     * The integration type (twitch, youtube, etc).
     * @since 0.0.1
     */
    readonly type: string;
    /**
     * Whether this integration is enabled.
     * @since 0.0.1
     */
    readonly enabled: boolean;
    /**
     * Whether this integration is syncing.
     * @since 0.0.1
     */
    readonly syncing: boolean;
    /**
     * The {@link Role role} ID that this integration uses for "subscribers".
     * @since 0.0.1
     */
    readonly roleID: string;
    /**
     * The {@link User user} ID for this integration.
     * @since 0.0.1
     */
    readonly userID: string;
    /**
     * The integration account information.
     * @since 0.0.1
     */
    readonly account: APIIntegrationAccountData;
    /**
     * Whether emoticons should be synced for this integration (twitch only currently).
     * @since 0.0.1
     */
    enableEmoticons: boolean | null;
    /**
     * The behavior of expiring subscribers.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors
     */
    expireBehavior: number;
    /**
     * The grace period (in days) before expiring subscribers.
     * @since 0.0.1
     */
    expireGracePeriod: number;
    /**
     * When this integration was last synced.
     * @since 0.0.1
     */
    syncedTimestamp: number;
    /**
     * Whether the integration is deleted.
     * @since 0.0.1
     */
    deleted: boolean;
    constructor(client: Client, data: APIIntegrationData, guild: Guild);
    /**
     * The {@link User user} for this integration.
     * @since 0.0.1
     */
    get user(): User | null;
    /**
     * The {@link Role role} that this integration uses for "subscribers".
     * @since 0.0.1
     */
    get role(): Role | null;
    /**
     * Modifies the behaviour and settings of the integration.
     * @since 0.0.1
     * @param options The settings to modify in the integration.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-integration
     */
    modify(options: IntegrationModifyOptions, requestOptions?: RequestOptions): Promise<this>;
    /**
     * Deletes the integration.
     * @since 0.0.1
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#delete-guild-integration
     */
    delete(requestOptions?: RequestOptions): Promise<this>;
    /**
     * Synchronizes the integration.
     * @since 0.0.1
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#sync-guild-integration
     */
    sync(requestOptions?: RequestOptions): Promise<this>;
    protected _patch(data: APIIntegrationData): this;
}
/**
 * The options for {@link Integration#modify}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#modify-guild-integration-json-params
 */
export interface IntegrationModifyOptions {
    /**
     * The behavior when an integration subscription lapses (see the integration expire behaviors documentation).
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors
     */
    expire_behavior?: number | null;
    /**
     * Period (in days) where the integration will ignore lapsed subscriptions.
     * @since 0.0.1
     */
    expire_grace_period?: number | null;
    /**
     * Whether emoticons should be synced for this integration (twitch only currently).
     * @since 0.0.1
     */
    enable_emoticons?: boolean | null;
}
