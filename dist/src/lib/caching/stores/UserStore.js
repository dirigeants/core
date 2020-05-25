"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
/* eslint-disable no-dupe-class-members */
const rest_1 = require("@klasa/rest");
const DataStore_1 = require("./base/DataStore");
const Extender_1 = require("../../util/Extender");
const GuildMember_1 = require("../structures/guilds/GuildMember");
const Message_1 = require("../structures/Message");
/**
 * The store for {@link User users}.
 * @since 0.0.1
 */
class UserStore extends DataStore_1.DataStore {
    /**
     * Builds the store.
     * @since 0.0.1
     * @param client The {@link Client client} this store belongs to.
     */
    constructor(client) {
        super(client, Extender_1.extender.get('User'), client.options.cache.limits.users);
    }
    /**
     * Gets a {@link User user} by its ID.
     * @since 0.0.1
     * @param userID The {@link User user} ID.
     * @see https://discord.com/developers/docs/resources/user#get-user
     */
    async fetch(userID) {
        const data = await this.client.api.get(rest_1.Routes.user(userID));
        return this._add(data);
    }
    /**
     * Resolves data into Structures
     * @param data The data to resolve
     */
    resolve(data) {
        if (data instanceof GuildMember_1.GuildMember)
            return data.user;
        if (data instanceof Message_1.Message)
            return data.author;
        return super.resolve(data);
    }
    /**
     * Resolves data into ids
     * @param data The data to resolve
     */
    resolveID(data) {
        if (data instanceof GuildMember_1.GuildMember)
            return data.user && data.user.id;
        if (data instanceof Message_1.Message)
            return data.author.id;
        return super.resolveID(data);
    }
}
exports.UserStore = UserStore;
//# sourceMappingURL=UserStore.js.map