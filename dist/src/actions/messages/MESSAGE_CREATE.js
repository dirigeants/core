"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@klasa/core");
class CoreAction extends core_1.Action {
    check() {
        return null;
    }
    build(data) {
        return new (core_1.extender.get('Message'))(this.client, data.d);
    }
    cache(data) {
        if (this.client.options.cache.enabled && data.channel) {
            data.channel.messages.set(data.id, data);
            data.channel.lastMessageID = data.id;
        }
    }
}
exports.default = CoreAction;
//# sourceMappingURL=MESSAGE_CREATE.js.map