"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionIterator = void 0;
const event_iterator_1 = require("@klasa/event-iterator");
/**
 * An asynchronous iterator responsible for iterating over reactions.
 * @since 0.0.1
 */
class ReactionIterator extends event_iterator_1.EventIterator {
    /**
     * Construct's a new ReactionIterator.
     * @since 0.0.1
     * @param channel The message to listen for reactions.
     * @param options Any additional options to pass.
     */
    constructor(message, options = {}) {
        const { limit, idle, filter = () => true } = options;
        super(message.client, "messageReactionAdd" /* MessageReactionAdd */, {
            limit,
            idle,
            filter: ([reaction, user]) => reaction.message === message && filter([reaction, user])
        });
    }
}
exports.ReactionIterator = ReactionIterator;
//# sourceMappingURL=ReactionIterator.js.map