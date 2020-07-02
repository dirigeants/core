import { RequestOptions } from '@klasa/rest';
import { ProxyCache } from '@klasa/cache';
import type { Client } from '../../client/Client';
import type { Message } from '../structures/messages/Message';
import type { GuildTextChannel } from '../structures/channels/GuildTextChannel';
import type { DMChannel } from '../structures/channels/DMChannel';
/**
 * The store for the pins the channel has.
 * @since 0.0.4
 */
export declare class ChannelPinsStore extends ProxyCache<string, Message> {
    /**
     * The {@link Client client} this store belongs to.
     * @since 0.0.4
     */
    readonly client: Client;
    /**
     * The {@link GuildTextChannel guild channel} or {@link DMChannel DM channel} this store belongs to.
     * @since 0.0.4
     */
    readonly channel: GuildTextChannel | DMChannel;
    /**
     * Builds the store.
     * @since 0.0.4
     * @param channel The {@link GuildTextChannel guild channel} or {@link DMChannel DM channel} this store belongs to.
     */
    constructor(channel: GuildTextChannel | DMChannel, keys: string[]);
    /**
     * Pins a message to the channel.
     * @since 0.0.4
     * @param id The {@link Message#id message id} you want to pin
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/channel#add-pinned-channel-message
     */
    add(id: string, requestOptions?: RequestOptions): Promise<this>;
    /**
     * Removes a pin from the channel given the message ID.
     * @since 0.0.4
     * @param id The {@link Message#id message id}.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/channel#delete-pinned-channel-message
     */
    remove(id: string, requestOptions?: RequestOptions): Promise<this>;
    /**
     * Returns a list of {@link Message pinned messages}s with their metadata.
     * @since 0.0.4
     * @see https://discord.com/developers/docs/resources/guild#get-guild-invites
     */
    fetch(): Promise<this>;
}
