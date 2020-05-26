"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@klasa/core");
class CoreAction extends core_1.Action {
    check(data) {
        var _a;
        return (_a = this.client.users.get(data.d.id)) !== null && _a !== void 0 ? _a : null;
    }
    build(data) {
        return new (core_1.extender.get('User'))(this.client, data.d);
    }
    cache(data) {
        if (this.client.options.cache.enabled) {
            this.client.users.set(data.id, data);
        }
    }
}
exports.default = CoreAction;
//# sourceMappingURL=USER_UPDATE.js.map