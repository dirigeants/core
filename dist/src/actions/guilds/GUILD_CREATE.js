"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@klasa/core");
class CoreAction extends core_1.Action {
    check() {
        return null;
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
//# sourceMappingURL=GUILD_CREATE.js.map