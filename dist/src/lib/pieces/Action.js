"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
const Event_1 = require("./Event");
const Util_1 = require("../util/Util");
/**
 * The common class for all actions.
 */
class Action extends Event_1.Event {
    /**
     * @since 0.0.1
     * @param store The store this piece is for
     * @param directory The base directory to the pieces folder
     * @param file The path from the pieces folder to the piece file
     * @param options The options for this piece
     */
    constructor(store, directory, file, options = {}) {
        var _a;
        super(store, directory, file, { ...options, once: false, emitter: 'ws' });
        this.clientEvent = (_a = options.clientEvent) !== null && _a !== void 0 ? _a : Util_1.snakeToCamel(this.event);
    }
    /**
     * Processes the event data from the websocket.
     * @since 0.0.1
     * @param data The raw data from {@link Client#ws}
     */
    run(data) {
        const struct = this.check(data);
        if (struct) {
            const previous = struct.clone();
            // eslint-disable-next-line dot-notation
            struct['_patch'](data.d);
            // We emit the patched then the previous data so created events, which
            // will always fail in this check, consistently emit the new data as
            // first argument.
            this.client.emit(this.clientEvent, struct, previous);
            return;
        }
        const built = this.build(data);
        if (built) {
            this.cache(built);
            this.client.emit(this.clientEvent, built);
        }
    }
}
exports.Action = Action;
//# sourceMappingURL=Action.js.map