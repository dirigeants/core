"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverwriteStore = void 0;
/* eslint-disable no-dupe-class-members */
const rest_1 = require("@klasa/rest");
const DataStore_1 = require("./base/DataStore");
const Extender_1 = require("../../util/Extender");
const GuildMember_1 = require("../structures/guilds/GuildMember");
/**
 * The store for {@link Overwrite Overwrites}.
 * @since 0.0.1
 */
class OverwriteStore extends DataStore_1.DataStore {
    /**
     * Builds the store.
     * @since 0.0.1
     * @param client The {@link Client client} this store belongs to.
     * @param client The {@link Client client} this store belongs to.
     */
    constructor(client, channel) {
        super(client, Extender_1.extender.get('Overwrite'), client.options.cache.limits.overwrites);
        this.channel = channel;
    }
    /**
     * Creates a new {@link Overwrite overwrite} for the {@link GuildChannel channel}.
     * @since 0.0.1
     * @param id The id the overwrite is for
     * @param data The overwrite data.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/channel#edit-channel-permissions
     */
    async add(id, data, requestOptions = {}) {
        await this.client.api.put(rest_1.Routes.channelPermissions(this.channel.id, id), { ...requestOptions, data });
        return this._add({ id, ...data });
    }
    /**
     * Deletes a {@link Overwrite overwrite} from the {@link GuildChannel channel}.
     * @since 0.0.1
     * @param overwriteID The {@link Role role} ID to delete.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/channel#delete-channel-permission
     */
    async remove(overwriteID, requestOptions = {}) {
        await this.client.api.delete(rest_1.Routes.channelPermissions(this.channel.id, overwriteID), requestOptions);
        return this;
    }
    for(target) {
        const everyone = this.get(this.channel.guild.id);
        if (target instanceof GuildMember_1.GuildMember) {
            const member = this.get(target.id);
            const roles = [];
            for (const overwrite of this.values()) {
                if (target.roles.has(overwrite.id))
                    roles.push(overwrite);
            }
            return { everyone, roles, member };
        }
        const role = this.get(target.id);
        return { everyone, role };
    }
    /**
     * Adds a new structure to this DataStore
     * @param data The data packet to add
     */
    _add(data) {
        const existing = this.get(data.id);
        // eslint-disable-next-line dot-notation
        if (existing)
            return existing['_patch'](data);
        const entry = new this.Holds(this.client, data, this.channel);
        if (this.client.options.cache.enabled)
            this.set(entry.id, entry);
        return entry;
    }
}
exports.OverwriteStore = OverwriteStore;
//# sourceMappingURL=OverwriteStore.js.map