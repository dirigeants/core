"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("../../../lib/pieces/Action");
const Extender_1 = require("../../../lib/util/Extender");
class CoreAction extends Action_1.Action {
    check(data) {
        var _a;
        const guild = this.client.guilds.get(data.d.guild_id);
        return (_a = guild === null || guild === void 0 ? void 0 : guild.members.get(data.d.user.id)) !== null && _a !== void 0 ? _a : null;
    }
    build(data) {
        const guild = this.client.guilds.get(data.d.guild_id);
        return guild ? new (Extender_1.extender.get('GuildMember'))(this.client, data.d, guild) : null;
    }
    cache() {
        // noop
    }
}
exports.default = CoreAction;
//# sourceMappingURL=GUILD_MEMBER_UPDATE.js.map