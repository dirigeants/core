import { DataStore } from './base/DataStore';
import { ReactionIteratorOptions } from '../../util/iterators/ReactionIterator';
import { EmojiResolvable } from '../../util/Util';
import type { Client } from '../../client/Client';
import type { MessageReaction } from '../structures/messages/reactions/MessageReaction';
import type { Message } from '../structures/Message';
import type { User } from '../structures/User';
/**
 * The store for {@link MessageReaction message reactions}.
 * @since 0.0.1
 */
export declare class MessageReactionStore extends DataStore<MessageReaction> {
    /**
     * The {@link Message message} this store belongs to.
     * @since 0.0.1
     */
    readonly message: Message;
    /**
     * Builds the store.
     * @since 0.0.1
     * @param client The {@link Client client} this store belongs to.
     * @param message The {@link Message message} this store belongs to.
     */
    constructor(client: Client, message: Message);
    /**
     * Adds a reaction to the message.
     * @param emoji The emoji to be added as a reaction to this message.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/channel#create-reaction
     */
    add(emoji: EmojiResolvable): Promise<this>;
    /**
     * Deletes all reactions on a message.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/channel#delete-all-reactions
     */
    remove(): Promise<this>;
    /**
     * Deletes a reaction from a message.
     * @since 0.0.1
     * @param emoji The emoji to remove from the message's reactions.
     * @see https://discord.com/developers/docs/resources/channel#delete-all-reactions-for-emoji
     */
    remove(emoji: EmojiResolvable): Promise<this>;
    /**
     * Asynchronously iterator over received reactions.
     * @since 0.0.1
     * @param options Any options to pass to the iterator.
     */
    iterate(options?: ReactionIteratorOptions): AsyncIterableIterator<[MessageReaction, User]>;
}
