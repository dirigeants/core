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
        var _a;
        const guild = (_a = (data.d.guild_id && this.client.guilds.get(data.d.guild_id))) !== null && _a !== void 0 ? _a : null;
        const channel = guild ? guild.channels.get(data.d.channel_id) : this.client.dms.get(data.d.channel_id);
        if (!channel)
            return;
        // eslint-disable-next-line dot-notation
        if (guild && data.d.member)
            guild.members['_add'](data.d.member);
        const user = this.client.users.get(data.d.user_id);
        if (!user)
            return;
        this.client.emit(this.clientEvent, channel, user);
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
}
exports.default = CoreAction;
//# sourceMappingURL=TYPING_START.js.map