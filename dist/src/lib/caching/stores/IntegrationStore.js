"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationStore = void 0;
const rest_1 = require("@klasa/rest");
const DataStore_1 = require("./base/DataStore");
const Extender_1 = require("../../util/Extender");
/**
 * The store for {@link Integration integrations}.
 * @since 0.0.1
 */
class IntegrationStore extends DataStore_1.DataStore {
    /**
     * Builds the store.
     * @since 0.0.1
     * @param client The {@link Client client} this store belongs to.
     * @param guild The {@link Guild guild} this store belongs to.
     */
    constructor(client, guild) {
        super(client, Extender_1.extender.get('Integration'), client.options.cache.limits.integrations);
        this.guild = guild;
    }
    /**
     * Creates an integration to the {@link Guild guild}.
     * @since 0.0.1
     * @param data The integration id and type.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#create-guild-integration
     */
    async add(data, requestOptions = {}) {
        await this.client.api.post(rest_1.Routes.guildIntegrations(this.guild.id), { ...requestOptions, data });
        return this;
    }
    /**
     * Deletes an integration from the {@link Guild guild}.
     * @since 0.0.1
     * @param integrationID The {@link Integration integration} ID.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#delete-guild-integration
     */
    async remove(integrationID, requestOptions = {}) {
        await this.client.api.delete(rest_1.Routes.guildIntegration(this.guild.id, integrationID), requestOptions);
        return this;
    }
    /**
     * Returns a collection of {@link Integration integration}s.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#get-guild-integrations
     */
    async fetch() {
        const entries = await this.client.api.get(rest_1.Routes.guildIntegrations(this.guild.id));
        for (const entry of entries)
            this._add(entry);
        return this;
    }
    /**
     * Adds a new structure to this DataStore
     * @param data The data packet to add
     * @param cache If the data should be cached
     */
    _add(data) {
        const existing = this.get(data.id);
        // eslint-disable-next-line dot-notation
        if (existing)
            return existing['_patch'](data);
        const entry = new this.Holds(this.client, data, this.guild);
        if (this.client.options.cache.enabled)
            this.set(entry.id, entry);
        return entry;
    }
}
exports.IntegrationStore = IntegrationStore;
//# sourceMappingURL=IntegrationStore.js.map