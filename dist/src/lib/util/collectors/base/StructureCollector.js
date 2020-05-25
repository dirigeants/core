"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _iterator;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StructureCollector = void 0;
const cache_1 = require("@klasa/cache");
/**
 * The base structure collector for asynchronously collecting values.
 * @since 0.0.1
 */
class StructureCollector {
    /**
     * @since 0.0.1
     * @param iterator The EventIterator that is yielding values.
     */
    constructor(iterator) {
        /**
         * The collected values.
         * @since 0.0.1
         */
        this.collected = new cache_1.Cache();
        /**
         * The event iterator that's yielding values.
         * @since 0.0.1
         */
        _iterator.set(this, void 0);
        __classPrivateFieldSet(this, _iterator, iterator);
    }
    /**
     * Collect's the values into the Collector's cache.
     * @since 0.0.1
     */
    async collect() {
        for await (const struct of __classPrivateFieldGet(this, _iterator))
            this.collected.set(struct.id, struct);
        return this.collected;
    }
}
exports.StructureCollector = StructureCollector;
_iterator = new WeakMap();
//# sourceMappingURL=StructureCollector.js.map