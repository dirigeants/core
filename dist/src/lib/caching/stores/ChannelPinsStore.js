"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelPinsStore = void 0;
const rest_1 = require("@klasa/rest");
const cache_1 = require("@klasa/cache");
/**
 * The store for the pins the channel has.
 * @since 0.0.4
 */
class ChannelPinsStore extends cache_1.ProxyCache {
    /**
     * Builds the store.
     * @since 0.0.4
     * @param channel The {@link GuildTextChannel guild channel} or {@link DMChannel DM channel} this store belongs to.
     */
    constructor(channel, keys) {
        super(channel.messages, keys);
        this.client = channel.client;
        this.channel = channel;
    }
    /**
     * Pins a message to the channel.
     * @since 0.0.4
     * @param id The {@link Message#id message id} you want to pin
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/channel#add-pinned-channel-message
     */
    async add(id, requestOptions = {}) {
        await this.client.api.put(rest_1.Routes.channelPin(this.channel.id, id), requestOptions);
        this.set(id);
        return this;
    }
    /**
     * Removes a pin from the channel given the message ID.
     * @since 0.0.4
     * @param id The {@link Message#id message id}.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/channel#delete-pinned-channel-message
     */
    async remove(id, requestOptions = {}) {
        await this.client.api.delete(rest_1.Routes.channelPin(this.channel.id, id), requestOptions);
        this.delete(id);
        return this;
    }
    /**
     * Returns a list of {@link Message pinned messages}s with their metadata.
     * @since 0.0.4
     * @see https://discord.com/developers/docs/resources/guild#get-guild-invites
     */
    async fetch() {
        const entries = await this.client.api.get(rest_1.Routes.channelPins(this.channel.id));
        for (const entry of entries) {
            // eslint-disable-next-line dot-notation
            this.channel.messages['_add'](entry);
            this.set(entry.id);
        }
        return this;
    }
}
exports.ChannelPinsStore = ChannelPinsStore;
//# sourceMappingURL=ChannelPinsStore.js.map