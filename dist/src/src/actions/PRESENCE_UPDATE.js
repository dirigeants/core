"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("../lib/pieces/Action");
class CoreAction extends Action_1.Action {
    /**
     * Processes the event data from the websocket.
     * @since 0.0.1
     * @param data The raw data from {@link Client#ws}
     */
    run(data) {
        var _a, _b;
        const user = this.acquireUser(data);
        if (!user)
            return;
        const guild = this.getGuild(data);
        if (!guild)
            return;
        const previousPresence = (_b = (_a = guild.presences.get(user.id)) === null || _a === void 0 ? void 0 : _a.clone()) !== null && _b !== void 0 ? _b : null;
        this.ensureMember(data, guild, user);
        // eslint-disable-next-line dot-notation
        const presence = guild.presences['_add'](data.d);
        this.client.emit(this.clientEvent, presence, previousPresence);
    }
    check() {
        return null;
    }
    build() {
        return null;
    }
    cache() {
        // noop
    }
    acquireUser(data) {
        const user = this.client.users.get(data.d.user.id);
        if (user)
            return user;
        // eslint-disable-next-line dot-notation
        return data.d.user.username ? this.client.users['_add'](data.d.user) : null;
    }
    getGuild(data) {
        var _a;
        return data.d.guild_id ? (_a = this.client.guilds.get(data.d.guild_id)) !== null && _a !== void 0 ? _a : null : null;
    }
    ensureMember(data, guild, user) {
        if (data.d.status && data.d.status !== 'offline') {
            // eslint-disable-next-line dot-notation
            guild.members['_add']({ user, roles: data.d.roles, deaf: false, mute: false });
        }
    }
}
exports.default = CoreAction;
//# sourceMappingURL=PRESENCE_UPDATE.js.map