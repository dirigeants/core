import { ProxyCache } from '@klasa/cache';
import type { MessageReaction } from '../structures/messages/reactions/MessageReaction';
import type { Message } from '../structures/messages/Message';
import type { User } from '../structures/User';
import type { Client } from '../../client/Client';
/**
 * The store for {@link MessageReaction message reaction} {@link User users}.
 * @since 0.0.1
 */
export declare class MessageReactionUserStore extends ProxyCache<string, User> {
    /**
     * The {@link Client client} this store belongs to.
     * @since 0.0.1
     */
    readonly client: Client;
    /**
     * The {@link MessageReaction message reaction} this store belongs to.
     * @since 0.0.1
     */
    readonly reaction: MessageReaction;
    /**
     * Builds the store.
     * @since 0.0.1
     * @param reaction The {@link MessageReaction message reaction} this store belongs to.
     */
    constructor(reaction: MessageReaction);
    /**
     * The {@link Message message} this store belongs to.
     * @since 0.0.1
     */
    get message(): Message;
    /**
     * Adds a reaction to the message.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/channel#create-reaction
     */
    add(): Promise<this>;
    /**
     * Removes a reaction from the {@link Client#user client user}.
     * @since 0.0.1
     * @param userID The bot {@link User user}'s ID or `@me`.
     * @see https://discord.com/developers/docs/resources/channel#delete-own-reaction
     */
    remove(userID?: '@me'): Promise<this>;
    /**
     * Remove a reaction from a user.
     * @since 0.0.1
     * @param userID The {@link User user}'s ID.
     * @see https://discord.com/developers/docs/resources/channel#delete-user-reaction
     */
    remove(userID: string): Promise<this>;
    /**
     * Fetches all the users, populating {@link MessageReactionEmoji#users}.
     * @since 0.0.1
     * @param options The options for the fetch
     */
    fetch(options?: MessageReactionFetchOptions): Promise<this>;
}
/**
 * @see https://discord.com/developers/docs/resources/channel#get-reactions-query-string-params
 */
export interface MessageReactionFetchOptions {
    /**
     * Get users before this user ID.
     * @since 0.0.1
     */
    before?: string;
    /**
     * Get users after this user ID.
     * @since 0.0.1
     */
    after?: string;
    /**
     * Max number of users to return (1-100).
     * @since 0.0.1
     */
    limit?: number;
}
