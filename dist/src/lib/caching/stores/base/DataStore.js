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
var _limit;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStore = void 0;
const cache_1 = require("@klasa/cache");
/**
 * The data caches with extra methods unique to each data store
 */
class DataStore extends cache_1.Cache {
    constructor(client, Holds, limit, iterable) {
        super();
        this.client = client;
        this.Holds = Holds;
        /**
         * The cache limit of this DataStore
         */
        _limit.set(this, void 0);
        __classPrivateFieldSet(this, _limit, limit);
        if (iterable)
            for (const item of iterable)
                this._add(item);
    }
    /**
     * Resolves data into Structures
     * @param data The data to resolve
     */
    resolve(data) {
        if (typeof data === 'string')
            return this.get(data) || null;
        if (data instanceof this.Holds)
            return data;
        return null;
    }
    /**
     * Resolves data into ids
     * @param data The data to resolve
     */
    resolveID(data) {
        if (typeof data === 'string')
            return data;
        if (data instanceof this.Holds)
            return data.id;
        return null;
    }
    /**
     * Sets a value to this DataStore taking into account the cache limit.
     * @param key The key of the value you are setting
     * @param value The value for the key you are setting
     */
    set(key, value) {
        if (__classPrivateFieldGet(this, _limit) === 0)
            return this;
        if (this.size >= __classPrivateFieldGet(this, _limit) && !this.has(key))
            this.delete(this.firstKey);
        return super.set(key, value);
    }
    /**
     * Adds a new structure to this DataStore
     * @param data The data packet to add
     * @param cache If the data should be cached
     */
    _add(data) {
        const existing = this.get(data.id);
        // eslint-disable-next-line dot-notation
        if (existing)
            return existing['_patch'](data);
        const entry = new this.Holds(this.client, data);
        if (this.client.options.cache.enabled)
            this.set(entry.id, entry);
        return entry;
    }
    /**
     * Defines the extensibility of DataStores
     */
    static get [(_limit = new WeakMap(), Symbol.species)]() {
        return cache_1.Cache;
    }
}
exports.DataStore = DataStore;
//# sourceMappingURL=DataStore.js.map