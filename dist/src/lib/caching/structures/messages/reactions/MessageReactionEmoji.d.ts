import type { APIEmojiPartial } from '@klasa/dapi-types';
import type { Client } from '../../../../client/Client';
/**
 * @see https://discord.com/developers/docs/resources/emoji#emoji-object
 */
export declare class MessageReactionEmoji implements APIEmojiPartial {
    readonly client: Client;
    /**
     * The emoji's ID.
     * @since 0.0.1
     */
    readonly id: string | null;
    /**
     * Emoji name.
     * @since 0.0.1
     */
    readonly name: string | null;
    /**
     * Whether this emoji is animated.
     * @since 0.0.1
     */
    readonly animated: boolean;
    constructor(client: Client, data: APIEmojiPartial);
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
     * Defines the JSON.stringify behavior of this structure.
     * @since 0.0.1
     */
    toJSON(): object;
}
