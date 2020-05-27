"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const rest_1 = require("@klasa/rest");
const Structure_1 = require("../base/Structure");
const Permissions_1 = require("../../../util/bitfields/Permissions");
/**
 * @see https://discord.com/developers/docs/topics/permissions#role-object
 */
class Role extends Structure_1.Structure {
    constructor(client, data, guild) {
        super(client);
        /**
         * Whether the role is deleted.
         * @since 0.0.1
         */
        this.deleted = false;
        this.id = data.id;
        this.managed = data.managed;
        this.guild = guild;
        this._patch(data);
    }
    /**
     * Checks permissions for this member in a given channel.
     * @param channel The channel to check permissions in
     */
    permissionsIn(channel) {
        const { permissions } = this;
        if (permissions.has(Permissions_1.Permissions.FLAGS["ADMINISTRATOR" /* Administrator */]))
            return new Permissions_1.Permissions(Permissions_1.Permissions.ALL).freeze();
        const overwrites = channel.permissionOverwrites.for(this);
        return permissions
            .remove(overwrites.everyone ? overwrites.everyone.deny : 0)
            .add(overwrites.everyone ? overwrites.everyone.allow : 0)
            .remove(overwrites.role ? overwrites.role.deny : 0)
            .add(overwrites.role ? overwrites.role.allow : 0)
            .freeze();
    }
    /**
     * Modifies the role's settings.
     * @since 0.0.1
     * @param data The new settings for the role.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-role
     */
    async modify(data, requestOptions = {}) {
        const entry = await this.client.api.patch(rest_1.Routes.guildRole(this.guild.id, this.id), { ...requestOptions, data });
        return this._patch(entry);
    }
    /**
     * Deletes the role from the {@link Guild guild}.
     * @since 0.0.1
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#delete-guild-role
     */
    async delete(requestOptions = {}) {
        await this.guild.roles.remove(this.id, requestOptions);
        this.deleted = true;
        return this;
    }
    /**
     * Adds the role to a {@link GuildMember member} by its id.
     * @since 0.0.4
     * @param memberID The id of the member you want to add the role.
     * @see https://discord.com/developers/docs/resources/guild#add-guild-member-role
     */
    async addTo(memberID) {
        await this.client.api.put(rest_1.Routes.guildMemberRole(this.guild.id, memberID, this.id));
        return this;
    }
    /**
     * Removes the role from a {@link GuildMember member} by its id.
     * @since 0.0.4
     * @param memberID The id of the member you want to remove the role.
     * @see https://discord.com/developers/docs/resources/guild#remove-guild-member-role
     */
    async removeFrom(memberID) {
        await this.client.api.delete(rest_1.Routes.guildMemberRole(this.guild.id, memberID, this.id));
        return this;
    }
    /**
     * Defines the toString behavior of this structure.
     * @since 0.0.4
     */
    toString() {
        return `<@&${this.id}>`;
    }
    _patch(data) {
        this.name = data.name;
        this.color = data.color;
        this.hoist = data.hoist;
        this.position = data.position;
        this.permissions = new Permissions_1.Permissions(data.permissions).freeze();
        this.mentionable = data.mentionable;
        return this;
    }
}
exports.Role = Role;
//# sourceMappingURL=Role.js.map