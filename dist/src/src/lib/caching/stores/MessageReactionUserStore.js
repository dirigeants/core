"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageReactionUserStore = void 0;
/* eslint-disable no-dupe-class-members */
const cache_1 = require("@klasa/cache");
const rest_1 = require("@klasa/rest");
/**
 * The store for {@link MessageReaction message reaction} {@link User users}.
 * @since 0.0.1
 */
class MessageReactionUserStore extends cache_1.ProxyCache {
    /**
     * Builds the store.
     * @since 0.0.1
     * @param reaction The {@link MessageReaction message reaction} this store belongs to.
     */
    constructor(reaction) {
        super(reaction.client.users, []);
        this.client = reaction.client;
        this.reaction = reaction;
    }
    /**
     * The {@link Message message} this store belongs to.
     * @since 0.0.1
     */
    get message() {
        return this.reaction.message;
    }
    /**
     * Adds a reaction to the message.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/channel#create-reaction
     */
    async add() {
        await this.message.reactions.add(this.reaction.emoji);
        return this;
    }
    async remove(userID = '@me') {
        var _a;
        await this.client.api.delete(rest_1.Routes.messageReactionUser(this.message.channel.id, this.message.id, this.reaction.emoji.identifier, userID === ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id) ? '@me' : userID));
        return this;
    }
    /**
     * Fetches all the users, populating {@link MessageReactionEmoji#users}.
     * @since 0.0.1
     * @param options The options for the fetch
     */
    async fetch(options) {
        const users = await this.client.api.get(rest_1.Routes.messageReaction(this.message.channel.id, this.message.id, this.reaction.emoji.identifier), {
            query: options
        });
        for (const user of users) {
            // eslint-disable-next-line dot-notation
            this.client.users['_add'](user);
            this.set(user.id);
        }
        return this;
    }
}
exports.MessageReactionUserStore = MessageReactionUserStore;
//# sourceMappingURL=MessageReactionUserStore.js.map