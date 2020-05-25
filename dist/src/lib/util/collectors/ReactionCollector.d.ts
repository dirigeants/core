import { StructureCollector } from './base/StructureCollector';
import { ReactionIterator } from '../iterators/ReactionIterator';
import type { Cache } from '@klasa/cache';
import type { Message } from '../../caching/structures/Message';
import type { MessageReaction } from '../../caching/structures/messages/reactions/MessageReaction';
/**
 * Options for a ReactionCollector.
 * @since 0.0.1
 */
export interface ReactionCollectorOptions {
    /**
     * The amount of reactions to collect before ending the collector.
     * @since 0.0.1
     */
    limit?: number;
    /**
     * The time in ms that a ReactionCollector will go before idling out.
     * @since 0.0.1
     */
    idle?: number;
    /**
     * The filter used to filter out specific reactions.
     * @since 0.0.1
     */
    filter?: (reaction: MessageReaction, collected: Cache<string, MessageReaction>) => boolean;
}
/**
 * The ReactionCollector class responsible for collecting a set of reactions.
 * @since 0.0.1
 */
export declare class ReactionCollector extends StructureCollector<MessageReaction, ReactionIterator> {
    /**
     * Construct's a new ReactionCollector.
     * @since 0.0.1
     * @param message The message to listen for reactions.
     * @param options Any additional options to pass.
     */
    constructor(message: Message, options?: ReactionCollectorOptions);
}
