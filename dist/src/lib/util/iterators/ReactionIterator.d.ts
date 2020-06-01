import { EventIterator, EventIteratorOptions } from '@klasa/event-iterator';
import type { Message } from '../../caching/structures/messages/Message';
import type { MessageReaction } from '../../caching/structures/messages/reactions/MessageReaction';
import type { User } from '../../../lib/caching/structures/User';
export declare type ReactionIteratorOptions = EventIteratorOptions<[MessageReaction, User]>;
/**
 * An asynchronous iterator responsible for iterating over reactions.
 * @since 0.0.1
 */
export declare class ReactionIterator extends EventIterator<[MessageReaction, User]> {
    /**
     * Construct's a new ReactionIterator.
     * @since 0.0.1
     * @param channel The message to listen for reactions.
     * @param options Any additional options to pass.
     */
    constructor(message: Message, options?: ReactionIteratorOptions);
}
