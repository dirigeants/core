import { MessageIterator } from '../iterators/MessageIterator';
import { StructureCollector } from './base/StructureCollector';
import type { Cache } from '@klasa/cache';
import type { DMChannel } from '../../caching/structures/channels/DMChannel';
import type { GuildTextChannel } from '../../caching/structures/channels/GuildTextChannel';
import type { Message } from '../../caching/structures/messages/Message';
/**
 * Options for a MessageCollector.
 * @since 0.0.1
 */
export interface MessageCollectorOptions {
    /**
     * The amount of messages to collect before ending the collector.
     * @since 0.0.1
     */
    limit?: number;
    /**
     * The time in ms that a MessageCollector will go before idling out.
     * @since 0.0.1
     */
    idle?: number;
    /**
     * The filter used to filter out specific messages.
     * @since 0.0.1
     */
    filter?: (message: [Message], collected: Cache<string, Message>) => boolean;
}
/**
 * The MessageCollector class responsible for collecting a set of messages.
 * @since 0.0.1
 */
export declare class MessageCollector extends StructureCollector<Message, [Message], MessageIterator> {
    /**
     * Construct's a new MessageCollector.
     * @since 0.0.1
     * @param channel The channel to listen for messages.
     * @param options Any additional options to pass.
     */
    constructor(channel: GuildTextChannel | DMChannel, options: MessageCollectorOptions);
}
