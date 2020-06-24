"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DMChannelStore = void 0;
const rest_1 = require("@klasa/rest");
const DataStore_1 = require("./base/DataStore");
const Channel_1 = require("../structures/channels/Channel");
const Extender_1 = require("../../util/Extender");
/**
 * The store for {@link DMChannel DM channels}.
 * @since 0.0.1
 */
class DMChannelStore extends DataStore_1.DataStore {
    /**
     * Builds the store.
     * @since 0.0.1
     * @param client The {@link Client client} this store belongs to.
     */
    constructor(client) {
        super(client, Extender_1.extender.get('DMChannel'), client.options.cache.limits.dms);
    }
    /**
     * Closes a channel with a {@link User user}.
     * @since 0.0.1
     * @param channelID The channel to remove.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/channel#deleteclose-channel
     */
    async remove(channelID, requestOptions = {}) {
        const channel = await this.client.api.delete(rest_1.Routes.channel(channelID), requestOptions);
        return Channel_1.Channel.create(this.client, channel);
    }
    /**
     * Opens a channel with a {@link User user}.
     * @since 0.0.1
     * @param userID The id for the user to open a dm channel with.
     * @see https://discord.com/developers/docs/resources/user#create-dm
     */
    async add(userID) {
        // eslint-disable-next-line camelcase
        const channel = await this.client.api.post(rest_1.Routes.dms(), { data: { recipient_id: userID } });
        // eslint-disable-next-line dot-notation
        return this.client.dms['_add'](channel);
    }
    /**
     * Adds a new structure to this DataStore
     * @param data The data packet to add
     */
    _add(data) {
        const existing = this.get(data.id);
        // eslint-disable-next-line dot-notation
        if (existing && existing.type === data.type)
            return existing['_patch'](data);
        const entry = Channel_1.Channel.create(this.client, data);
        if (entry && this.client.options.cache.enabled)
            this.set(entry.id, entry);
        return entry;
    }
}
exports.DMChannelStore = DMChannelStore;
//# sourceMappingURL=DMChannelStore.js.map