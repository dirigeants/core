"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildChannel = void 0;
const Channel_1 = require("./Channel");
const OverwriteStore_1 = require("../../stores/OverwriteStore");
const Permissions_1 = require("../../../util/bitfields/Permissions");
const rest_1 = require("@klasa/rest");
/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
class GuildChannel extends Channel_1.Channel {
    constructor(client, data, guild = null) {
        super(client, data);
        this.guild = guild !== null && guild !== void 0 ? guild : client.guilds.get(data.guild_id);
    }
    /**
     * The parent {@type CategoryChannel channel} for this channel.
     * @since 0.0.1
     */
    get parent() {
        return (this.parentID && this.guild.channels.get(this.parentID)) || null;
    }
    /**
     * If the overwrites are synced to the parent channel.
     * @since 0.0.1
     */
    get synced() {
        const { parent } = this;
        if (!parent)
            return null;
        if (this.permissionOverwrites.size !== parent.permissionOverwrites.size)
            return false;
        return this.permissionOverwrites.every((value, key) => {
            const overwrite = parent.permissionOverwrites.get(key);
            return overwrite !== undefined && overwrite.deny.equals(value.deny) && overwrite.allow.equals(value.allow);
        });
    }
    /**
     * If the client can delete the channel.
     * @since 0.0.1
     */
    get deletable() {
        var _a, _b;
        return (_b = (_a = this.guild.me) === null || _a === void 0 ? void 0 : _a.permissionsIn(this).has(Permissions_1.Permissions.FLAGS["MANAGE_CHANNELS" /* ManageChannels */])) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * If the client can view the channel.
     * @since 0.0.1
     */
    get viewable() {
        var _a, _b;
        return (_b = (_a = this.guild.me) === null || _a === void 0 ? void 0 : _a.permissionsIn(this).has(Permissions_1.Permissions.FLAGS["VIEW_CHANNEL" /* ViewChannel */])) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * If the client can manage the channel.
     * @since 0.0.1
     */
    get manageable() {
        var _a, _b;
        return (_b = (_a = this.guild.me) === null || _a === void 0 ? void 0 : _a.permissionsIn(this).has([Permissions_1.Permissions.FLAGS["VIEW_CHANNEL" /* ViewChannel */], Permissions_1.Permissions.FLAGS["MANAGE_CHANNELS" /* ManageChannels */]])) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Checks what permissions a {@link GuildMember member} or {@link Role role} has in this {@link GuildChannel channel}
     * @param target The guild member you are checking permissions for
     */
    permissionsFor(target) {
        return target.permissionsIn(this);
    }
    /**
     * Deletes the channel from the {@link Guild guild}.
     * @since 0.0.1
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/channel#deleteclose-channel
     */
    async delete(requestOptions = {}) {
        await this.guild.channels.remove(this.id, requestOptions);
        this.deleted = true;
        return this;
    }
    /**
     * Modifies this channel.
     * @param data The channel modify options.
     * @param requestOptions The request options.
     * @since 0.0.1
     */
    async modify(data, requestOptions = {}) {
        const result = await this.client.api.patch(rest_1.Routes.channel(this.id), { ...requestOptions, data });
        return this._patch(result);
    }
    /**
     * Syncs the permission overwrites with the parent channel.
     * @param requestOptions The additional request options.
     * @since 0.0.1
     */
    syncPermissions(requestOptions = {}) {
        const { parent } = this;
        if (!parent)
            return Promise.reject(new Error('This channel does not have a parent channel to sync permissions from.'));
        const overwrites = parent.permissionOverwrites.map(({ id, type, allow, deny }) => ({ id, type, allow: allow.bitfield, deny: deny.bitfield }));
        // eslint-disable-next-line @typescript-eslint/camelcase
        return this.modify({ permission_overwrites: overwrites }, requestOptions);
    }
    _patch(data) {
        var _a;
        this.name = data.name;
        this.position = data.position;
        this.parentID = data.parent_id;
        if (!this.permissionOverwrites)
            this.permissionOverwrites = new OverwriteStore_1.OverwriteStore(this.client, this);
        const overwrites = (_a = data.permission_overwrites) !== null && _a !== void 0 ? _a : [];
        const existingOverwrites = this.permissionOverwrites.clone();
        this.permissionOverwrites.clear();
        for (const overwrite of overwrites) {
            const existing = existingOverwrites.findValue((ovr) => ovr.id === overwrite.id);
            if (existing) {
                this.permissionOverwrites.set(existing.id, existing);
                existingOverwrites.delete(existing.id);
            }
            // eslint-disable-next-line dot-notation
            this.permissionOverwrites['_add'](overwrite);
        }
        for (const overwrite of existingOverwrites.values())
            overwrite.deleted = true;
        return this;
    }
}
exports.GuildChannel = GuildChannel;
//# sourceMappingURL=GuildChannel.js.map