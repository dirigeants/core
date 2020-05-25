"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@klasa/core");
class CoreAction extends core_1.Action {
    check(data) {
        var _a;
        const guild = data.d.guild_id ? this.client.guilds.get(data.d.guild_id) : undefined;
        return (_a = (guild ? guild.channels.get(data.d.id) : this.client.dms.get(data.d.id))) !== null && _a !== void 0 ? _a : null;
    }
    build() {
        return null;
    }
    cache(data) {
        data.deleted = true;
        this.client.channels.delete(data.id);
        if (core_1.isGuildChannel(data))
            data.guild.channels.delete(data.id);
        else
            this.client.dms.delete(data.id);
    }
}
exports.default = CoreAction;
//# sourceMappingURL=CHANNEL_DELETE.js.map