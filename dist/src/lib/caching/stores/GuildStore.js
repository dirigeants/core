"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildStore = void 0;
const rest_1 = require("@klasa/rest");
const DataStore_1 = require("./base/DataStore");
const Extender_1 = require("../../util/Extender");
const ImageUtil_1 = require("../../util/ImageUtil");
/**
 * The store for {@link Guild guilds}.
 * @since 0.0.1
 */
class GuildStore extends DataStore_1.DataStore {
    /**
     * Builds the store.
     * @since 0.0.1
     * @param client The {@link Client client} this store belongs to.
     */
    constructor(client) {
        super(client, Extender_1.extender.get('Guild'), client.options.cache.limits.guilds);
    }
    /**
     * Creates a {@link Guild guild} in which the client is the owner.
     * @since 0.0.1
     * @param data The settings for the new guild.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#create-guild
     */
    async add({ icon, ...options }, requestOptions = {}) {
        const data = {
            icon: icon ? await ImageUtil_1.resolveImageToBase64(icon) : icon,
            ...options
        };
        const entry = await this.client.api.post(rest_1.Routes.guilds(), { ...requestOptions, data });
        return this._add(entry);
    }
    /**
     * Deletes a {@link Guild guild} permanently.
     * @since 0.0.1
     * @param data The guild to delete.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#delete-guild
     */
    async remove(guildID, requestOptions = {}) {
        await this.client.api.delete(rest_1.Routes.guild(guildID), requestOptions);
        return this;
    }
    /**
     * Returns a {@link Guild guild} by its ID.
     * @since 0.0.1
     * @param guildID The {@link Guild guild} ID to fetch.
     * @see https://discord.com/developers/docs/resources/guild#get-guild
     */
    async fetch(guildID) {
        // eslint-disable-next-line camelcase
        const entry = await this.client.api.get(rest_1.Routes.guild(guildID), { query: [['with_counts', true]] });
        return this._add(entry);
    }
}
exports.GuildStore = GuildStore;
/* eslint-enable camelcase */
//# sourceMappingURL=GuildStore.js.map