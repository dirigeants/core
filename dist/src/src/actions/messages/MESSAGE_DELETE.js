"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("../../lib/pieces/Action");
const Util_1 = require("../../lib/util/Util");
class CoreAction extends Action_1.Action {
    check(data) {
        var _a;
        const guild = data.d.guild_id ? this.client.guilds.get(data.d.guild_id) : undefined;
        const channel = guild ? guild.channels.get(data.d.channel_id) : this.client.dms.get(data.d.channel_id);
        if (!channel || !Util_1.isTextBasedChannel(channel))
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