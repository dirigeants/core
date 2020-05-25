"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("../../../lib/pieces/Action");
class CoreAction extends Action_1.Action {
    check(data) {
        var _a;
        const guild = this.client.guilds.get(data.d.guild_id);
        if (!guild)
            return null;
        --guild.memberCount;
        return (_a = guild.members.get(data.d.user.id)) !== null && _a !== void 0 ? _a : null;
    }
    build() {
        return null;
    }
    cache(data) {
        data.deleted = true;
        data.guild.members.delete(data.id);
    }
}
exports.default = CoreAction;
//# sourceMappingURL=GUILD_MEMBER_REMOVE.js.map