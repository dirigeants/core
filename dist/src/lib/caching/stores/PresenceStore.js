"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresenceStore = void 0;
const DataStore_1 = require("./base/DataStore");
const Extender_1 = require("../../util/Extender");
/**
 * The store for {@link Presence presences}.
 * @since 0.0.1
 */
class PresenceStore extends DataStore_1.DataStore {
    /**
     * Builds the store.
     * @since 0.0.1
     * @param client The {@link Client client} this store belongs to.
     * @param guild The {@link Guild guild} this store belongs to.
     */
    constructor(client, guild) {
        super(client, Extender_1.extender.get('Presence'), client.options.cache.limits.presences);
        this.guild = guild;
    }
    /**
     * Adds a new structure to this DataStore
     * @param data The data packet to add
     */
    _add(data) {
        const existing = this.get(data.user.id);
        // eslint-disable-next-line dot-notation
        if (existing)
            return existing['_patch'](data);
        const entry = new this.Holds(this.client, data);
        if (this.client.options.cache.enabled)
            this.set(entry.id, entry);
        return entry;
    }
}
exports.PresenceStore = PresenceStore;
//# sourceMappingURL=PresenceStore.js.map