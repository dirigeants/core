import { RequestOptions } from '@klasa/rest';
import { DataStore } from './base/DataStore';
import type { APIChannelData } from '@klasa/dapi-types';
import type { Client } from '../../client/Client';
import type { DMChannel } from '../structures/channels/DMChannel';
/**
 * The store for {@link DMChannel DM channels}.
 * @since 0.0.1
 */
export declare class DMChannelStore extends DataStore<DMChannel> {
    /**
     * Builds the store.
     * @since 0.0.1
     * @param client The {@link Client client} this store belongs to.
     */
    constructor(client: Client);
    /**
     * Closes a channel with a {@link User user}.
     * @since 0.0.1
     * @param channelID The channel to remove.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/channel#deleteclose-channel
     */
    remove(channelID: string, requestOptions?: RequestOptions): Promise<DMChannel>;
    /**
     * Opens a channel with a {@link User user}.
     * @since 0.0.1
     * @param userID The id for the user to open a dm channel with.
     * @see https://discord.com/developers/docs/resources/user#create-dm
     */
    add(userID: string): Promise<DMChannel>;
    /**
     * Adds a new structure to this DataStore
     * @param data The data packet to add
     */
    protected _add(data: APIChannelData): DMChannel;
}
