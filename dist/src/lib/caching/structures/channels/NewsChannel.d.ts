import { ChannelType, APIChannelFollowResult } from '@klasa/dapi-types';
import { RequestOptions } from '@klasa/rest';
import { GuildTextChannel } from './GuildTextChannel';
import type { ChannelModifyOptions } from './GuildChannel';
import type { Message } from '../Message';
/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
export declare class NewsChannel extends GuildTextChannel {
    /**
     * The type of channel.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/channel#channel-object-channel-types
     */
    readonly type = ChannelType.GuildAnnouncement;
    /**
     * Crossposts a Message in this channel.
     * @param messageID The ID of the {@link Message message} that should be crossposted.
     * @since 0.0.1
     */
    crosspost(messageID: string): Promise<Message>;
    follow(channel: GuildTextChannel): Promise<APIChannelFollowResult>;
    /**
     * Modifies this channel.
     * @param data The channel modify options.
     * @param requestOptions The request options.
     * @since 0.0.1
     */
    modify(options: NewsChannelModifyOptions, requestOptions?: RequestOptions): Promise<this>;
}
export interface NewsChannelModifyOptions extends ChannelModifyOptions {
    type?: ChannelType.GuildAnnouncement | ChannelType.GuildText;
    topic?: string | null;
    nsfw?: boolean;
    parent_id?: string | null;
}
