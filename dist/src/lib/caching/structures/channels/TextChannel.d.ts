import { APIChannelData, ChannelType } from '@klasa/dapi-types';
import { GuildTextChannel } from './GuildTextChannel';
import type { ChannelModifyOptions } from './GuildChannel';
import type { RequestOptions } from '@klasa/rest';
/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
export declare class TextChannel extends GuildTextChannel {
    /**
     * The type of channel.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/channel#channel-object-channel-types
     */
    readonly type = ChannelType.GuildText;
    /**
     * Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the
     * permission `MANAGE_MESSAGES` or `MANAGE_CHANNEL`, are unaffected.
     * @since 0.0.1
     */
    rateLimitPerUser: number;
    /**
     * Modifies this channel.
     * @param data The channel modify options.
     * @param requestOptions The request options.
     * @since 0.0.1
     */
    modify(data: TextChannelModifyOptions, requestOptions?: RequestOptions): Promise<this>;
    protected _patch(data: APIChannelData): this;
}
export interface TextChannelModifyOptions extends ChannelModifyOptions {
    type?: ChannelType.GuildText | ChannelType.GuildNews;
    topic?: string | null;
    nsfw?: boolean | null;
    rate_limit_per_user?: number | null;
    parent_id?: string | null;
}
