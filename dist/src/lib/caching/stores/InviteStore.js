"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteStore = void 0;
const rest_1 = require("@klasa/rest");
const DataStore_1 = require("./base/DataStore");
const Extender_1 = require("../../util/Extender");
/**
 * The store for {@link Invite invites}.
 * @since 0.0.1
 */
class InviteStore extends DataStore_1.DataStore {
    /**
     * Builds the store.
     * @since 0.0.1
     * @param client The {@link Client client} this store belongs to.
     */
    constructor(client) {
        super(client, Extender_1.extender.get('Invite'), client.options.cache.limits.invites);
    }
    /**
     * Deletes an invite given its code.
     * @since 0.0.1
     * @param code The {@link Invite#code invite code}.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/invite#delete-invite
     */
    async remove(code, requestOptions = {}) {
        const entry = await this.client.api.delete(rest_1.Routes.invite(code), requestOptions);
        const guild = entry.guild ? this.client.guilds.get(entry.guild.id) : null;
        const channel = this.client.channels.get(entry.channel.id);
        return new this.Holds(this.client, entry, channel, guild);
    }
    /**
     * Returns a {@link Invite invite} with optionally their metadata.
     * @since 0.0.1
     * @param code The {@link Invite#code invite code}.
     * @see https://discord.com/developers/docs/resources/invite#get-invite
     */
    async fetch(code, options = {}) {
        const entry = await this.client.api.get(rest_1.Routes.invite(code), { query: Object.entries(options) });
        return this._add(entry);
    }
    /**
     * Adds a new structure to this DataStore
     * @param data The data packet to add
     * @param cache If the data should be cached
     */
    _add(data) {
        const existing = this.get(data.code);
        // eslint-disable-next-line dot-notation
        if (existing)
            return existing['_patch'](data);
        const guild = data.guild ? this.client.guilds.get(data.guild.id) : null;
        const channel = this.client.channels.get(data.channel.id);
        const entry = new this.Holds(this.client, data, channel, guild);
        if (this.client.options.cache.enabled)
            this.set(entry.id, entry);
        return entry;
    }
}
exports.InviteStore = InviteStore;
/* eslint-enable camelcase */
//# sourceMappingURL=InviteStore.js.map