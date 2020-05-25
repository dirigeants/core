"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageIterator = void 0;
const event_iterator_1 = require("@klasa/event-iterator");
/**
 * An asynchronous iterator responsible for iterating over messages.
 * @since 0.0.1
 */
class MessageIterator extends event_iterator_1.EventIterator {
    /**
     * Construct's a new MessageIterator.
     * @since 0.0.1
     * @param channel The channel to listen for messages.
     * @param options Any additional options to pass.
     */
    constructor(channel, options = {}) {
        const { limit, idle, filter = () => true } = options;
        super(channel.client, "messageCreate" /* MessageCreate */, {
            limit,
            idle,
            filter: (message) => message.channel === channel && filter(message)
        });
    }
}
exports.MessageIterator = MessageIterator;
//# sourceMappingURL=MessageIterator.js.map