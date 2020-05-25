"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@klasa/core");
class CoreAction extends core_1.Action {
    check(data) {
        var _a;
        return (_a = this.client.guilds.get(data.d.id)) !== null && _a !== void 0 ? _a : null;
    }
    build(data) {
        return new (core_1.extender.get('Guild'))(this.client, data.d);
    }
    cache(data) {
        if (this.client.options.cache.enabled) {
            this.client.guilds.set(data.id, data);
        }
    }
}
exports.default = CoreAction;
//# sourceMappingURL=GUILD_UPDATE.js.map