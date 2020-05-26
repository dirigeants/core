"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleStore = void 0;
const rest_1 = require("@klasa/rest");
const DataStore_1 = require("./base/DataStore");
const Extender_1 = require("../../util/Extender");
/**
 * The store for {@link Guild guild} {@link Role roles}.
 * @since 0.0.1
 */
class RoleStore extends DataStore_1.DataStore {
    /**
     * Builds the store.
     * @since 0.0.1
     * @param client The {@link Client client} this store belongs to.
     * @param guild The {@link Guild guild} this store belongs to.
     */
    constructor(client, guild) {
        super(client, Extender_1.extender.get('Role'), client.options.cache.limits.roles);
        this.guild = guild;
    }
    /**
     * Gets the highest role from this store.
     * @since 0.0.1
     */
    highest() {
        return this.reduce((highest, role) => highest.position > role.position ? highest : role, this.firstValue);
    }
    /**
     * Creates a new {@link Role role} for the {@link Guild guild}.
     * @since 0.0.1
     * @param data The role settings.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#create-guild-role
     */
    async add(data = {}, requestOptions = {}) {
        const role = await this.client.api.post(rest_1.Routes.guildRoles(this.guild.id), { ...requestOptions, data });
        return this._add(role);
    }
    /**
     * Deletes a {@link Role role} from the {@link Guild guild}.
     * @since 0.0.1
     * @param roleID The {@link Role role} ID to delete.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#delete-guild-role
     */
    async remove(roleID, requestOptions = {}) {
        await this.client.api.delete(rest_1.Routes.guildRole(this.guild.id, roleID), requestOptions);
        return this;
    }
    /**
     * Modifies the positions of the roles.
     * @since 0.0.1
     * @param data The set of roles and their positions for the {@link Guild guild}.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-role-positions
     */
    async modifyPositions(data, requestOptions = {}) {
        await this.client.api.patch(rest_1.Routes.guildRoles(this.guild.id), { ...requestOptions, data });
        return this;
    }
    /**
     * Returns the list of {@link Role role}s as updated from Discord.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#get-guild-roles
     */
    async fetch() {
        const roles = await this.client.api.get(rest_1.Routes.guildRoles(this.guild.id));
        for (const role of roles)
            this._add(role);
        return this;
    }
    /**
     * The JSON representation of this object.
     */
    toJSON() {
        return [...this.keys()];
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
        const entry = new this.Holds(this.client, data, this.guild);
        if (this.client.options.cache.enabled)
            this.set(entry.id, entry);
        return entry;
    }
}
exports.RoleStore = RoleStore;
//# sourceMappingURL=RoleStore.js.map