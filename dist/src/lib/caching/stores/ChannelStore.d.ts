import { RequestOptions } from '@klasa/rest';
import { Channel } from '../structures/channels/Channel';
import { DataStore } from './base/DataStore';
import type { APIChannelData } from '@klasa/dapi-types';
import type { Client } from '../../client/Client';
import type { GuildChannel } from '../structures/channels/GuildChannel';
import type { DMChannel } from '../structures/channels/DMChannel';
import type { Guild } from '../structures/guilds/Guild';
/**
 * The store for {@link GuildBasedChannel guild based channels}.
 * @since 0.0.1
 */
export declare class ChannelStore extends DataStore<Channel> {
    /**
     * Builds the store.
     * @since 0.0.1
     * @param client The {@link Client client} this store belongs to.
     * @param guild The {@link Guild guild} this store belongs to.
     */
    constructor(client: Client);
    /**
     * Removes a channel from the {@link Guild guild}.
     * @since 0.0.1
     * @param channelID The channel to remove.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/channel#deleteclose-channel
     */
    remove(channelID: string, requestOptions?: RequestOptions): Promise<Channel>;
    /**
     * Returns the list of channels as updated from Discord.
     * @param id The id for the channel you want to fetch
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/channel#get-channel
     */
    fetch(id: string): Promise<Channel>;
    /**
     * Adds a new structure to this DataStore
     * @param data The data packet to add
     */
    protected _add(data: APIChannelData, guild?: Guild): DMChannel | GuildChannel;
}
