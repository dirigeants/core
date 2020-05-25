"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@klasa/core");
class CoreAction extends core_1.Action {
    check(data) {
        var _a;
        const guild = data.d.guild_id ? this.client.guilds.get(data.d.guild_id) : undefined;
        const channel = guild ? guild.channels.get(data.d.channel_id) : this.client.dms.get(data.d.channel_id);
        if (!channel || !core_1.isTextBasedChannel(channel))
            return null;
        return (_a = channel.messages.get(data.d.id)) !== null && _a !== void 0 ? _a : null;
    }
    build() {
        return null;
    }
    cache(data) {
        data.deleted = true;
        data.channel.messages.delete(data.id);
    }
}
exports.default = CoreAction;
//# sourceMappingURL=MESSAGE_DELETE.js.map