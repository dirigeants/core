import { APIChannelPartial, ChannelType, APIChannelData } from '@klasa/dapi-types';
import { Structure } from '../base/Structure';
import { Client } from '../../../client/Client';
/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
export declare abstract class Channel extends Structure {
    /**
     * The ID of this channel.
     * @since 0.0.1
     */
    readonly id: string;
    /**
     * The type of channel.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/channel#channel-object-channel-types
     */
    abstract readonly type: ChannelType;
    /**
     * Whether the DM channel is deleted.
     * @since 0.0.1
     */
    deleted: boolean;
    constructor(client: Client, data: APIChannelPartial);
    /**
     * Defines toString behavior for members.
     * @since 0.0.1
     */
    toString(): string;
    static create(client: Client, data: APIChannelData, ...extra: readonly unknown[]): Channel | null;
    private static readonly types;
}
