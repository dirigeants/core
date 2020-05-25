"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceStateStore = void 0;
const DataStore_1 = require("./base/DataStore");
const Extender_1 = require("../../util/Extender");
/**
 * The store for {@link VoiceState voice states}.
 * @since 0.0.1
 */
class VoiceStateStore extends DataStore_1.DataStore {
    /**
     * Builds the store.
     * @since 0.0.1
     * @param client The {@link Client client} this store belongs to.
     * @param guild The {@link Guild guild} this store belongs to.
     */
    constructor(client, guild) {
        super(client, Extender_1.extender.get('VoiceState'), client.options.cache.limits.voiceStates);
        this.guild = guild;
    }
    /**
     * Adds a new structure to this DataStore
     * @param data The data packet to add
     */
    _add(data) {
        const existing = this.get(data.user_id);
        // eslint-disable-next-line dot-notation
        if (existing)
            return existing['_patch'](data);
        const entry = new this.Holds(this.client, data, this.guild);
        if (this.client.options.cache.enabled)
            this.set(entry.id, entry);
        return entry;
    }
}
exports.VoiceStateStore = VoiceStateStore;
//# sourceMappingURL=VoiceStateStore.js.map