"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("../../lib/pieces/Action");
class CoreAction extends Action_1.Action {
    check(data) {
        var _a;
        return (_a = this.client.guilds.get(data.d.id)) !== null && _a !== void 0 ? _a : null;
    }
    build() {
        return null;
    }
    cache(data) {
        data.deleted = true;
        this.client.guilds.delete(data.id);
    }
}
exports.default = CoreAction;
//# sourceMappingURL=GUILD_DELETE.js.map