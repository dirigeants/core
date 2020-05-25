"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("../../lib/pieces/Action");
const Extender_1 = require("../../lib/util/Extender");
class CoreAction extends Action_1.Action {
    check() {
        return null;
    }
    build(data) {
        return new (Extender_1.extender.get('Guild'))(this.client, data.d);
    }
    cache(data) {
        if (this.client.options.cache.enabled) {
            this.client.guilds.set(data.id, data);
        }
    }
}
exports.default = CoreAction;
//# sourceMappingURL=GUILD_CREATE.js.map