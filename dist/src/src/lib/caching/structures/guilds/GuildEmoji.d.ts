import { RequestOptions } from '@klasa/rest';
import { Guild } from './Guild';
import { Structure } from '../base/Structure';
import type { APIEmojiData } from '@klasa/dapi-types';
import type { Client } from '../../../client/Client';
/**
 * @see https://discord.com/developers/docs/resources/emoji#emoji-object
 */
export declare class GuildEmoji extends Structure {
    /**
     * The emoji's ID.
     * @since 0.0.1
     */
    readonly id: string;
    /**
     * The emoji's name (null only in reaction emoji objects).
     * @since 0.0.1
     */
    name: string | null;
    /**
     * The roles this emoji is whitelisted to.
     * @since 0.0.1
     */
    roleIDs: string[];
    /**
     * User that created this emoji.
     * @since 0.0.1
     */
    userID: string | null;
    /**
     * Whether or not this emoji must be wrapped in colons.
     * @since 0.0.1
     */
    requireColons: boolean | null;
    /**
     * Whether or not this emoji is managed.
     * @since 0.0.1
     */
    managed: boolean | null;
    /**
     * Whether this emoji is animated.
     * @since 0.0.1
     */
    animated: boolean | null;
    /**
     * Whether or not this emoji can be used, may be false due to loss of Server Boosts.
     * @since 0.0.1
     */
    available: boolean;
    /**
     * The guild this emoji is from.
     * @since 0.0.1
     */
    readonly guild: Guild;
    /**
     * Whether the integration is deleted.
     * @since 0.0.1
     */
    deleted: boolean;
    constructor(client: Client, data: APIEmojiData, guild: Guild);
    /**
     * The identifier to be used for API requests.
     * @since 0.0.1
     */
    get identifier(): string;
    /**
     * The emoji as shown in Discord.
     * @since 0.0.1
     */
    toString(): string;
    /**
     * Deletes an emoji from the {@link Guild guild}.
     * @since 0.0.1
     * @param emojiID The {@link GuildEmoji guild emoji} ID.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/emoji#create-guild-emoji
     */
    delete(requestOptions?: RequestOptions): Promise<this>;
    protected _patch(data: APIEmojiData): this;
}
