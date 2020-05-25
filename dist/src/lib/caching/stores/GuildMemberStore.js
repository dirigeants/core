"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildMemberStore = void 0;
/* eslint-disable no-dupe-class-members */
const cache_1 = require("@klasa/cache");
const DataStore_1 = require("./base/DataStore");
const Extender_1 = require("../../util/Extender");
const rest_1 = require("@klasa/rest");
/**
 * The store for {@link GuildMember guild members}.
 * @since 0.0.1
 */
class GuildMemberStore extends DataStore_1.DataStore {
    /**
     * Builds the store.
     * @since 0.0.1
     * @param client The {@link Client client} this store belongs to.
     * @param guild The {@link Guild guild} this store belongs to.
     */
    constructor(client, guild) {
        super(client, Extender_1.extender.get('GuildMember'), client.options.cache.limits.members);
        this.guild = guild;
    }
    /**
     * Adds a user to the guild, provided you have a valid oauth2 access token for the user with the `guilds.join` scope.
     * @since 0.0.1
     * @param userID The {@link User user} ID to add.
     * @param data The data to send for this request.
     * @param requestOptions The additional request options.
     * @returns A {@link GuildMember} instance if the user joined the server, `null` if it was already joined.
     */
    async add(userID, data, requestOptions = {}) {
        const entry = await this.client.api.put(rest_1.Routes.guildMember(this.guild.id, userID), { ...requestOptions, data });
        return entry ? this._add(entry) : null;
    }
    /**
     * Kicks a member from the {@link Guild guild}.
     * @since 0.0.1
     * @param userID The {@link User user} ID to be kicked.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#remove-guild-member
     */
    async remove(userID, requestOptions = {}) {
        await this.client.api.delete(rest_1.Routes.guildMember(this.guild.id, userID), requestOptions);
        return this;
    }
    async fetch(idOrOptions) {
        if (typeof idOrOptions === 'string') {
            const previous = this.get(idOrOptions);
            if (previous)
                return previous;
            const member = await this.client.api.get(rest_1.Routes.guildMember(this.guild.id, idOrOptions));
            return this._add(member);
        }
        const entries = await this.client.api.get(rest_1.Routes.guildMembers(this.guild.id), { data: idOrOptions });
        const cache = new cache_1.Cache();
        for (const entry of entries) {
            const member = this._add(entry);
            cache.set(member.id, member);
        }
        return cache;
    }
    /**
     * Resolves data into Structures
     * @param data The data to resolve
     */
    resolve(data) {
        const member = super.resolve(data);
        if (member)
            return member;
        const user = this.client.users.resolve(data);
        if (user)
            return super.resolve(user.id);
        return null;
    }
    /**
     * Resolves data into ids
     * @param data The data to resolve
     */
    resolveID(data) {
        const member = super.resolveID(data);
        if (member)
            return member;
        const user = this.client.users.resolveID(data);
        if (user)
            return user;
        return null;
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
        const entry = new this.Holds(this.client, data, this.guild);
        if (this.client.options.cache.enabled)
            this.set(entry.id, entry);
        return entry;
    }
}
exports.GuildMemberStore = GuildMemberStore;
//# sourceMappingURL=GuildMemberStore.js.map