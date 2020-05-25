import { ChannelType } from '@klasa/dapi-types';
import { GuildChannel } from './GuildChannel';
/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
export declare class CategoryChannel extends GuildChannel {
    /**
     * The type of channel.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/channel#channel-object-channel-types
     */
    readonly type = ChannelType.GuildCategory;
}
