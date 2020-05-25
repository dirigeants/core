"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageReactionStore = void 0;
/* eslint-disable no-dupe-class-members */
const rest_1 = require("@klasa/rest");
const DataStore_1 = require("./base/DataStore");
const ReactionIterator_1 = require("../../util/iterators/ReactionIterator");
const Extender_1 = require("../../util/Extender");
const Util_1 = require("../../util/Util");
/**
 * The store for {@link MessageReaction message reactions}.
 * @since 0.0.1
 */
class MessageReactionStore extends DataStore_1.DataStore {
    /**
     * Builds the store.
     * @since 0.0.1
     * @param client The {@link Client client} this store belongs to.
     * @param message The {@link Message message} this store belongs to.
     */
    constructor(client, message) {
        super(client, Extender_1.extender.get('MessageReaction'), client.options.cache.limits.reactions);
        this.message = message;
    }
    /**
     * Adds a reaction to the message.
     * @param emoji The emoji to be added as a reaction to this message.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/channel#create-reaction
     */
    async add(emoji) {
        await this.client.api.put(rest_1.Routes.messageReactionUser(this.message.channel.id, this.message.id, Util_1.resolveEmoji(emoji), '@me'));
        return this;
    }
    async remove(emoji) {
        await this.client.api.delete(emoji ?
            rest_1.Routes.messageReaction(this.message.channel.id, this.message.id, Util_1.resolveEmoji(emoji)) :
            rest_1.Routes.messageReactions(this.message.channel.id, this.message.id));
        return this;
    }
    /**
     * Asynchronously iterator over received reactions.
     * @since 0.0.1
     * @param options Any options to pass to the iterator.
     */
    async *iterate(options) {
        yield* new ReactionIterator_1.ReactionIterator(this.message, options);
    }
}
exports.MessageReactionStore = MessageReactionStore;
//# sourceMappingURL=MessageReactionStore.js.map