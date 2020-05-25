import { RequestOptions } from '@klasa/rest';
import { DataStore } from './base/DataStore';
import type { APIIntegrationData } from '@klasa/dapi-types';
import type { Client } from '../../client/Client';
import type { Guild } from '../structures/guilds/Guild';
import type { Integration } from '../structures/guilds/Integration';
/**
 * The store for {@link Integration integrations}.
 * @since 0.0.1
 */
export declare class IntegrationStore extends DataStore<Integration> {
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
     * Creates an integration to the {@link Guild guild}.
     * @since 0.0.1
     * @param data The integration id and type.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#create-guild-integration
     */
    add(data: IntegrationStoreAddData, requestOptions?: RequestOptions): Promise<this>;
    /**
     * Deletes an integration from the {@link Guild guild}.
     * @since 0.0.1
     * @param integrationID The {@link Integration integration} ID.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#delete-guild-integration
     */
    remove(integrationID: string, requestOptions?: RequestOptions): Promise<this>;
    /**
     * Returns a collection of {@link Integration integration}s.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#get-guild-integrations
     */
    fetch(): Promise<this>;
    /**
     * Adds a new structure to this DataStore
     * @param data The data packet to add
     * @param cache If the data should be cached
     */
    protected _add(data: APIIntegrationData): Integration;
}
/**
 * The data for {@link IntegrationStore#add}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#create-guild-integration-json-params
 */
export interface IntegrationStoreAddData {
    /**
     * The {@link Integration integration} ID.
     * @since 0.0.1
     */
    id: string;
    /**
     * The {@link Integration integration} type.
     * @since 0.0.1
     */
    type: string;
}
