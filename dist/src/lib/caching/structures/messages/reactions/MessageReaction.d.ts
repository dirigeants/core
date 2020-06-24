import { MessageReactionEmoji } from './MessageReactionEmoji';
import { Structure } from '../../base/Structure';
import { MessageReactionUserStore } from '../../../stores/MessageReactionUserStore';
import type { APIReactionData } from '@klasa/dapi-types';
import type { Message } from '../Message';
import type { Client } from '../../../../client/Client';
/**
 * @see https://discord.com/developers/docs/resources/channel#reaction-object
 */
export declare class MessageReaction extends Structure {
    /**
     * The reaction ID.
     * @since 0.0.1
     */
    readonly id: string;
    /**
     * Whether or not the current user reacted using this emoji.
     * @since 0.0.1
     */
    me: boolean;
    /**
     * Times this emoji has been used to react.
     * @since 0.0.1
     */
    count: number;
    /**
     * Emoji information.
     * @since 0.0.1
     */
    readonly emoji: MessageReactionEmoji;
    /**
     * The users that reacted to this emoji.
     * @since 0.0.1
     */
    readonly users: MessageReactionUserStore;
    /**
     * The {@link Message message} instance this is tied to.
     * @since 0.0.1
     */
    readonly message: Message;
    constructor(client: Client, data: APIReactionData, message: Message);
    /**
     * The emoji as shown in Discord.
     * @since 0.0.1
     */
    toString(): string;
    /**
     * Defines the JSON.stringify behavior of this structure.
     * @since 0.0.1
     */
    toJSON(): Record<string, unknown>;
    protected _patch(data: APIReactionData): this;
}
