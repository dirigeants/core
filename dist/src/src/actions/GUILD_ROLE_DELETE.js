"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("../lib/pieces/Action");
class CoreAction extends Action_1.Action {
    check(data) {
        var _a, _b;
        return (_b = (_a = this.client.guilds.get(data.d.guild_id)) === null || _a === void 0 ? void 0 : _a.roles.get(data.d.role_id)) !== null && _b !== void 0 ? _b : null;
    }
    build() {
        return null;
    }
    cache(data) {
        data.deleted = true;
        data.guild.roles.delete(data.id);
    }
}
exports.default = CoreAction;
//# sourceMappingURL=GUILD_ROLE_DELETE.js.map