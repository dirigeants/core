"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookMessage = void 0;
const Structure_1 = require("../base/Structure");
const Extender_1 = require("../../../util/Extender");
class WebhookMessage extends Structure_1.Structure {
    constructor(client, data) {
        var _a, _b;
        super(client);
        /**
         * The embedded data.
         * @since 0.0.1
         */
        this.embeds = [];
        this.id = data.id;
        this.content = data.content;
        // eslint-disable-next-line dot-notation
        this.author = new (Extender_1.extender.get('User'))(client, data.author);
        // eslint-disable-next-line dot-notation
        this.createdTimestamp = new Date(data.timestamp).getTime();
        this.type = data.type;
        this.nonce = (_a = data.nonce) !== null && _a !== void 0 ? _a : null;
        this.webhookID = (_b = data.webhook_id) !== null && _b !== void 0 ? _b : null;
        this._patch(data);
    }
    /**
     * When this message was sent.
     * @since 0.0.1
     */
    get createdAt() {
        return new Date(this.createdTimestamp);
    }
    /**
     * Defines the toString behavior of this structure.
     * @since 0.0.4
     */
    toString() {
        return this.content;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _patch(_data) {
        return this;
    }
}
exports.WebhookMessage = WebhookMessage;
//# sourceMappingURL=WebhookMessage.js.map