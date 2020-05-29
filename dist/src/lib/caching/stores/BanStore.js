"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BanStore = void 0;
/* eslint-disable no-dupe-class-members */
const cache_1 = require("@klasa/cache");
const rest_1 = require("@klasa/rest");
const DataStore_1 = require("./base/DataStore");
const Extender_1 = require("../../util/Extender");
/**
 * The store for {@link Ban bans}.
 * @since 0.0.1
 */
class BanStore extends DataStore_1.DataStore {
    /**
     * Builds the store.
     * @since 0.0.1
     * @param client The {@link Client client} this store belongs to.
     * @param guild The {@link Guild guild} this store belongs to.
     */
    constructor(client, guild) {
        super(client, Extender_1.extender.get('Ban'), client.options.cache.limits.bans);
        this.guild = guild;
    }
    /**
     * Adds a user to the guild's bans list and optionally deletes previous messages from that user
     * @since 0.0.1
     * @param userID The {@link User user} ID to ban from the guild.
     * @see https://discord.com/developers/docs/resources/guild#create-guild-ban
     */
    async add(userID, options = {}) {
        await this.client.api.put(rest_1.Routes.guildBan(this.guild.id, userID), { ...options, query: [['delete-message-days', options.deleteMessageDays]] });
        return this;
    }
    /**
     * Remove a user from the guild's bans list
     * @since 0.0.1
     * @param userID The {@link User user} ID to unban from the guild.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#remove-guild-ban
     */
    async remove(userID, requestOptions = {}) {
        await this.client.api.delete(rest_1.Routes.guildBan(this.guild.id, userID), requestOptions);
        return this;
    }
    async fetch(options = {}) {
        var _a, _b;
        const id = (_a = options.id) !== null && _a !== void 0 ? _a : null;
        const cache = (_b = options.cache) !== null && _b !== void 0 ? _b : true;
        if (id) {
            const cached = super.get(id);
            if (cached)
                return cached;
            const banData = await this.client.api.get(rest_1.Routes.guildBan(this.guild.id, id));
            const ban = new this.Holds(this.client, banData, this.guild);
            if (cache)
                this.set(ban.id, ban);
            return ban;
        }
        const bansData = await this.client.api.get(rest_1.Routes.guildBans(this.guild.id));
        const output = cache ? this : new cache_1.Cache();
        for (const banData of bansData) {
            const ban = new this.Holds(this.client, banData, this.guild);
            output.set(ban.id, ban);
        }
        return output;
    }
    /**
     * Adds a new structure to this DataStore
     * @param data The data packet to add
     * @param cache If the data should be cached
     */
    _add(data) {
        const existing = this.get(data.user.id);
        // eslint-disable-next-line dot-notation
        if (existing)
            return existing['_patch']();
        const entry = new this.Holds(this.client, data, this.guild);
        if (this.client.options.cache.enabled)
            this.set(entry.id, entry);
        return entry;
    }
}
exports.BanStore = BanStore;
//# sourceMappingURL=BanStore.js.map