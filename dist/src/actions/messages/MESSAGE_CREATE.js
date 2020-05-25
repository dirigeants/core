"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("../../lib/pieces/Action");
const Extender_1 = require("../../lib/util/Extender");
class CoreAction extends Action_1.Action {
    check() {
        return null;
    }
    build(data) {
        return new (Extender_1.extender.get('Message'))(this.client, data.d);
    }
    cache(data) {
        if (this.client.options.cache.enabled) {
            data.channel.messages.set(data.id, data);
            data.channel.lastMessageID = data.id;
        }
    }
}
exports.default = CoreAction;
//# sourceMappingURL=MESSAGE_CREATE.js.map