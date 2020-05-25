import { ChannelType, APIChannelData } from '@klasa/dapi-types';
import { GuildChannel, ChannelModifyOptions } from './GuildChannel';
import type { RequestOptions } from '@klasa/rest';
/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
export declare class StoreChannel extends GuildChannel {
    /**
     * The type of channel.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/channel#channel-object-channel-types
     */
    readonly type = ChannelType.GuildStore;
    /**
     * Whether or not the channel is nsfw.
     * @since 0.0.1
     */
    nsfw: boolean;
    /**
     * Modifies this channel.
     * @param data The channel modify options.
     * @param requestOptions The request options.
     * @since 0.0.1
     */
    modify(options: StoreChannelModifyOptions, requestOptions?: RequestOptions): Promise<this>;
    protected _patch(data: APIChannelData): this;
}
export interface StoreChannelModifyOptions extends ChannelModifyOptions {
    nsfw?: boolean | null;
    parent_id?: string | null;
}
