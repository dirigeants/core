import { ChannelType, APIChannelData } from '@klasa/dapi-types';
import { GuildChannel, ChannelModifyOptions } from './GuildChannel';
import type { RequestOptions } from '@klasa/rest';
/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
export declare class VoiceChannel extends GuildChannel {
    /**
     * The type of channel.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/channel#channel-object-channel-types
     */
    readonly type = ChannelType.GuildVoice;
    /**
     * The bitrate (in bits) of the voice channel.
     * @since 0.0.1
     */
    bitrate: number;
    /**
     * The user limit of the voice channel.
     * @since 0.0.1
     */
    userLimit: number;
    /**
     * If the client can delete the channel.
     * @since 0.0.1
     */
    get deletable(): boolean | null;
    /**
     * If the client can manage the channel.
     * @since 0.0.1
     */
    get manageable(): boolean | null;
    /**
     * Modifies this channel.
     * @param data The channel modify options.
     * @param requestOptions The request options.
     * @since 0.0.1
     */
    modify(data: VoiceChannelModifyOptions, requestOptions?: RequestOptions): Promise<this>;
    protected _patch(data: APIChannelData): this;
}
export interface VoiceChannelModifyOptions extends ChannelModifyOptions {
    bitrate?: number | null;
    user_limit?: number | null;
    parent_id?: string | null;
}
