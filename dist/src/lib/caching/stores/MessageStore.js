"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageStore = void 0;
/* eslint-disable no-dupe-class-members */
const cache_1 = require("@klasa/cache");
const rest_1 = require("@klasa/rest");
const DataStore_1 = require("./base/DataStore");
const Extender_1 = require("../../util/Extender");
const MessageBuilder_1 = require("../structures/messages/MessageBuilder");
const MessageIterator_1 = require("../../util/iterators/MessageIterator");
/**
 * The store for a {@link TextBasedChannel text-based channel} {@link Message messages}.
 * @since 0.0.1
 */
class MessageStore extends DataStore_1.DataStore {
    /**
     * Builds the store.
     * @since 0.0.1
     * @param client The {@link Client client} this store belongs to.
     * @param channel The {@link TextBasedChannel text-based channel} this store belongs to.
     */
    constructor(client, channel) {
        super(client, Extender_1.extender.get('Message'), client.options.cache.limits.messages);
        this.channel = channel;
    }
    async add(data, options = {}) {
        const split = (typeof data === 'function' ? await data(new MessageBuilder_1.MessageBuilder()) : new MessageBuilder_1.MessageBuilder(data)).split(options);
        const endpoint = rest_1.Routes.channelMessages(this.channel.id);
        const rawMessages = await Promise.all(split.map(message => this.client.api.post(endpoint, message)));
        return rawMessages.map(msg => this._add(msg));
    }
    /**
     * Deletes a message.
     * @param requestOptions The additional request options.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/channel#delete-message
     */
    async remove(messageID, requestOptions = {}) {
        await this.client.api.delete(rest_1.Routes.channelMessage(this.channel.id, messageID), requestOptions);
        return this;
    }
    async fetch(idOrOptions) {
        if (typeof idOrOptions === 'string') {
            const entry = await this.client.api.get(rest_1.Routes.channelMessage(this.channel.id, idOrOptions));
            return this._add(entry);
        }
        const entries = await this.client.api.get(rest_1.Routes.channelMessages(this.channel.id), { query: idOrOptions && Object.entries(idOrOptions) });
        const cache = new cache_1.Cache();
        for (const entry of entries)
            cache.set(entry.id, this._add(entry));
        return cache;
    }
    /**
     * Asynchronously iterator over received messages.
     * @since 0.0.1
     * @param options Any options to pass to the iterator.
     */
    async *iterate(options) {
        yield* new MessageIterator_1.MessageIterator(this.channel, options);
    }
}
exports.MessageStore = MessageStore;
//# sourceMappingURL=MessageStore.js.map