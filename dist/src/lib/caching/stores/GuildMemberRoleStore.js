"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildMemberRoleStore = void 0;
const cache_1 = require("@klasa/cache");
const rest_1 = require("@klasa/rest");
/**
 * The store for {@link Role member roles}.
 * @since 0.0.1
 */
class GuildMemberRoleStore extends cache_1.ProxyCache {
    /**
     * Builds the store.
     * @since 0.0.1
     * @param member The {@link GuildMember guild member} this store belongs to.
     */
    constructor(member, keys) {
        super(member.guild.roles, keys);
        this.client = member.client;
        this.member = member;
    }
    /**
     * Gets the highest role from this store.
     * @since 0.0.1
     */
    highest() {
        return this.reduce((highest, role) => highest.position > role.position ? highest : role, this.firstValue);
    }
    /**
     * The {@link Guild guild} this store belongs to.
     * @since 0.0.1
     */
    get guild() {
        return this.member.guild;
    }
    /**
     * Adds a {@link Role role} to the {@link GuildMember member}.
     * @since 0.0.1
     * @param roleID The {@link Role role} ID to add.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#add-guild-member-role
     */
    async add(roleID, requestOptions = {}) {
        await this.client.api.put(rest_1.Routes.guildMemberRole(this.guild.id, this.member.id, roleID), requestOptions);
        return this;
    }
    /**
     * Removes a {@link Role role} from the {@link GuildMember member}.
     * @since 0.0.1
     * @param roleID The {@link Role role} ID to remove.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#remove-guild-member-role
     */
    async remove(roleID, requestOptions = {}) {
        await this.client.api.delete(rest_1.Routes.guildMemberRole(this.guild.id, this.member.id, roleID), requestOptions);
        return this;
    }
    /**
     * Modifies all the roles for the {@link GuildMember member}.
     * @since 0.0.1
     * @param roles A collection of {@link Role role} IDs.
     * @param requestOptions The additional request options.
     */
    async modify(roles, requestOptions = {}) {
        await this.member.modify({ roles }, requestOptions);
        return this;
    }
}
exports.GuildMemberRoleStore = GuildMemberRoleStore;
//# sourceMappingURL=GuildMemberRoleStore.js.map