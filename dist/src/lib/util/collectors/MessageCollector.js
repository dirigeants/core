"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageCollector = void 0;
const MessageIterator_1 = require("../iterators/MessageIterator");
const StructureCollector_1 = require("./base/StructureCollector");
/**
 * The MessageCollector class responsible for collecting a set of messages.
 * @since 0.0.1
 */
class MessageCollector extends StructureCollector_1.StructureCollector {
    /**
     * Construct's a new MessageCollector.
     * @since 0.0.1
     * @param channel The channel to listen for messages.
     * @param options Any additional options to pass.
     */
    constructor(channel, options) {
        if (!options.limit && !options.idle)
            throw new Error('Collectors need either a limit or idle, or they will collect forever.');
        const { limit, idle, filter = () => true } = options;
        super(new MessageIterator_1.MessageIterator(channel, {
            limit,
            idle,
            filter: (message) => filter(message, this.collected)
        }));
    }
}
exports.MessageCollector = MessageCollector;
//# sourceMappingURL=MessageCollector.js.map