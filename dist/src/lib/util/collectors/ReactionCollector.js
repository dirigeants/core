"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollector = void 0;
const StructureCollector_1 = require("./base/StructureCollector");
const ReactionIterator_1 = require("../iterators/ReactionIterator");
/**
 * The ReactionCollector class responsible for collecting a set of reactions.
 * @since 0.0.1
 */
class ReactionCollector extends StructureCollector_1.StructureCollector {
    /**
     * Construct's a new ReactionCollector.
     * @since 0.0.1
     * @param message The message to listen for reactions.
     * @param options Any additional options to pass.
     */
    constructor(message, options) {
        if (!options.limit && !options.idle)
            throw new Error('Collectors need either a limit or idle, or they will collect forever.');
        const { limit, idle, filter = () => true } = options;
        super(new ReactionIterator_1.ReactionIterator(message, {
            limit,
            idle,
            filter: ([reaction, user]) => reaction.message === message && filter([reaction, user], this.collected)
        }));
    }
}
exports.ReactionCollector = ReactionCollector;
//# sourceMappingURL=ReactionCollector.js.map