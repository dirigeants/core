"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildInviteStore = void 0;
const rest_1 = require("@klasa/rest");
const DataStore_1 = require("./base/DataStore");
const Extender_1 = require("../../util/Extender");
/**
 * The store for {@link Invite guild invites}.
 * @since 0.0.1
 */
class GuildInviteStore extends DataStore_1.DataStore {
    /**
     * Builds the store.
     * @since 0.0.1
     * @param client The {@link Client client} this store belongs to.
     * @param guild The {@link Guild guild} this store belongs to.
     */
    constructor(client, guild) {
        super(client, Extender_1.extender.get('Invite'), client.options.cache.limits.invites);
        this.guild = guild;
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
        const channel = this.client.channels.get(entry.channel.id);
        return new this.Holds(this.client, entry, channel, this.guild);
    }
    /**
     * Returns a list of {@link Invite invite}s with their metadata.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#get-guild-invites
     */
    async fetch() {
        const entries = await this.client.api.get(rest_1.Routes.guildInvites(this.guild.id));
        for (const entry of entries)
            this._add(entry);
        return this;
    }
    /**
     * Adds a new structure to this DataStore
     * @param data The data packet to add
     * @param cache If the data should be cached
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    _add(data) {
        const existing = this.get(data.code);
        // eslint-disable-next-line dot-notation
        if (existing)
            return existing['_patch'](data);
        const channel = this.client.channels.get(data.channel.id);
        const entry = new this.Holds(this.client, data, channel, this.guild);
        if (this.client.options.cache.enabled) {
            this.set(entry.id, entry);
            this.client.invites.set(entry.id, entry);
        }
        return entry;
    }
}
exports.GuildInviteStore = GuildInviteStore;
//# sourceMappingURL=GuildInviteStore.js.map