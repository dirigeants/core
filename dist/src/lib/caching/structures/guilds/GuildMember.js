"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildMember = void 0;
const rest_1 = require("@klasa/rest");
const Structure_1 = require("../base/Structure");
const GuildMemberRoleStore_1 = require("../../stores/GuildMemberRoleStore");
const Permissions_1 = require("../../../util/bitfields/Permissions");
/**
 * @see https://discord.com/developers/docs/resources/guild#guild-member-object
 */
class GuildMember extends Structure_1.Structure {
    constructor(client, data, guild) {
        super(client);
        /**
         * Whether the member was kicked.
         * @since 0.0.1
         */
        this.deleted = false;
        this.id = data.user.id;
        this.guild = guild;
        this._patch(data);
    }
    /**
     * The user for this member
     * @since 0.0.1
     */
    get user() {
        var _a;
        return (_a = this.client.users.get(this.id)) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * The displayed name for the member
     * @since 0.0.4
     */
    get displayName() {
        var _a, _b, _c;
        return (_c = (_a = this.nick) !== null && _a !== void 0 ? _a : (_b = this.user) === null || _b === void 0 ? void 0 : _b.username) !== null && _c !== void 0 ? _c : null;
    }
    /**
     * The calculated permissions from the member's {@link GuildMemberRoleStore roles}.
     * @since 0.0.1
     */
    get permissions() {
        if (this.id === this.guild.ownerID)
            return new Permissions_1.Permissions(Permissions_1.Permissions.ALL).freeze();
        const permissions = new Permissions_1.Permissions(this.roles.map(role => role.permissions));
        return (permissions.has(Permissions_1.Permissions.FLAGS["ADMINISTRATOR" /* Administrator */]) ? permissions.add(Permissions_1.Permissions.ALL) : permissions).freeze();
    }
    /**
     * Whether or not the {@link ClientUser client user} can kick this member.
     * @since 0.0.1
     * @returns `null` when the {@link ClientUser client user}'s member is not cached (or when {@link Client#user} is null),
     * or a boolean specifying whether or not the conditions are met.
     */
    get kickable() {
        var _a, _b;
        return (_b = (this.id !== ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id) && this._manageable && this.guild.me.permissions.has(Permissions_1.Permissions.FLAGS["KICK_MEMBERS" /* KickMembers */]))) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Whether or not the {@link ClientUser client user} can ban this member.
     * @since 0.0.1
     * @returns `null` when the {@link ClientUser client user}'s member is not cached (or when {@link Client#user} is null),
     * or a boolean specifying whether or not the conditions are met.
     */
    get bannable() {
        var _a, _b;
        return (_b = (this.id !== ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id) && this._manageable && this.guild.me.permissions.has(Permissions_1.Permissions.FLAGS["BAN_MEMBERS" /* BanMembers */]))) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Whether or not the {@link ClientUser client user} can manage the member's nickname.
     * @since 0.0.1
     * @returns `null` when the {@link ClientUser client user}'s member is not cached (or when {@link Client#user} is null),
     * or a boolean specifying whether or not the conditions are met.
     */
    get manageNicknames() {
        var _a;
        return (_a = (this._manageable && this.guild.me.permissions.has(Permissions_1.Permissions.FLAGS["MANAGE_NICKNAMES" /* ManageNicknames */]))) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Whether or not the {@link ClientUser client user} can manage the member's roles.
     * @since 0.0.1
     * @returns `null` when the {@link ClientUser client user}'s member is not cached (or when {@link Client#user} is null),
     * or a boolean specifying whether or not the conditions are met.
     */
    get manageRoles() {
        var _a;
        return (_a = (this._manageable && this.guild.me.permissions.has(Permissions_1.Permissions.FLAGS["MANAGE_ROLES" /* ManageRoles */]))) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Whether or not the {@link ClientUser client user} can manage this member. This is based on:
     * - The member is not the {@link Guild#owner guild owner}.
     * - The {@link ClientUser client user} is the owner of the {@link Guild}.
     * - The {@link ClientUser client user}'s {@link GuildMemberRoleStore#highest highest role} is higher than the member's.
     * @since 0.0.1
     * @returns `true` when any of the conditions are met, `null` when the {@link ClientUser client user}'s member is not
     * cached (or when {@link Client#user} is null), or `false` otherwise.
     */
    get _manageable() {
        // If the client user's member instance is not cached, return null.
        const { me } = this.guild;
        if (!this.client.user || !me)
            return null;
        // If the client is the owner, then it can manage itself
        if (this.guild.ownerID === this.client.user.id)
            return true;
        // If this is the owner (and we have already determined we are not the owner), then it can't manage
        if (this.id === this.guild.ownerID)
            return false;
        const { highest: clientHighest } = me.roles;
        const { highest: memberHighest } = this.roles;
        // If these are undefined or null, there is no role hierarchy and it can't manage
        if (!clientHighest || !memberHighest)
            return false;
        // If the clients highest role is higher than this roles highest role
        return clientHighest.position > memberHighest.position;
    }
    /**
     * Modifies the settings for the member.
     * @param data The settings to be set.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-member
     */
    async modify(data, requestOptions = {}) {
        await this.client.api.patch(rest_1.Routes.guildMember(this.guild.id, this.id), { ...requestOptions, data });
        return this;
    }
    /**
     * Checks permissions for this member in a given channel.
     * @param channel The channel to check permissions in
     */
    permissionsIn(channel) {
        const { permissions } = this;
        if (permissions.equals(Permissions_1.Permissions.ALL))
            return permissions;
        const overwrites = channel.permissionOverwrites.for(this);
        return permissions
            .remove(overwrites.everyone ? overwrites.everyone.deny : 0)
            .add(overwrites.everyone ? overwrites.everyone.allow : 0)
            .remove(overwrites.roles.length > 0 ? overwrites.roles.map(role => role.deny) : 0)
            .add(overwrites.roles.length > 0 ? overwrites.roles.map(role => role.allow) : 0)
            .remove(overwrites.member ? overwrites.member.deny : 0)
            .add(overwrites.member ? overwrites.member.allow : 0)
            .freeze();
    }
    /**
     * Kicks a member from the {@link Guild guild}.
     * @since 0.0.1
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#remove-guild-member
     */
    async kick(requestOptions = {}) {
        await this.guild.members.remove(this.id, requestOptions);
        this.deleted = true;
        return this;
    }
    /**
     * Defines toString behavior for members.
     * @since 0.0.1
     */
    toString() {
        return this.nick ? `<@!${this.id}>` : `<@${this.id}>`;
    }
    _patch(data) {
        this.deaf = 'deaf' in data ? data.deaf : null;
        this.joinedTimestamp = 'joined_at' in data ? new Date(data.joined_at).getTime() : null;
        this.mute = 'mute' in data ? data.mute : null;
        this.nick = 'nick' in data ? data.nick : null;
        this.premiumSince = data.premium_since ? new Date(data.premium_since).getTime() : null;
        this.roles = new GuildMemberRoleStore_1.GuildMemberRoleStore(this, [this.guild.id, ...data.roles]);
        return this;
    }
}
exports.GuildMember = GuildMember;
//# sourceMappingURL=GuildMember.js.map