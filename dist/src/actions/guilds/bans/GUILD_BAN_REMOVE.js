"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@klasa/core");
class CoreAction extends core_1.Action {
    check() {
        return null;
    }
    build(data) {
        const guild = this.client.guilds.get(data.d.guild_id);
        return guild ? new (core_1.extender.get('Ban'))(this.client, data.d, guild) : null;
    }
    cache(data) {
        if (data.guild)
            data.guild.bans.delete(data.id);
    }
}
exports.default = CoreAction;
//# sourceMappingURL=GUILD_BAN_REMOVE.js.map