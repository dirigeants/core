import { Cache } from '@klasa/cache';
import type { Message } from './Message';
import type { APIMessageMentionChannelData, APIChannelData, APIMessageMentionData } from '@klasa/dapi-types';
import type { User } from '../User';
export declare class MessageMentions {
    /**
     * The {@link Message} this entry belongs to.
     * @since 0.0.1
     */
    readonly message: Message;
    /**
     * Users specifically mentioned in the message.
     * @since 0.0.1
     */
    readonly users: Cache<string, User>;
    /**
     * Roles specifically mentioned in this message.
     * @since 0.0.1
     */
    readonly roles: Cache<string, string>;
    /**
     * Channels specifically mentioned in this message.
     * @since 0.0.1
     */
    readonly channels: Cache<string, APIChannelData>;
    /**
     * Whether this message mentions everyone.
     * @since 0.0.1
     */
    readonly everyone: boolean;
    constructor(message: Message, users: APIMessageMentionData[], roles: string[], channels: APIMessageMentionChannelData[], everyone: boolean);
    toJSON(): Record<string, unknown>;
}
