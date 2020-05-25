"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Presence = void 0;
const Structure_1 = require("../base/Structure");
/**
 * @see https://discord.com/developers/docs/topics/gateway#presence
 */
class Presence extends Structure_1.Structure {
    constructor(client, data) {
        super(client);
        this.id = data.user.id;
        this._patch(data);
    }
    _patch(data) {
        var _a, _b, _c;
        this.status = (_a = data.status) !== null && _a !== void 0 ? _a : null;
        this.clientStatus = (_b = data.client_status) !== null && _b !== void 0 ? _b : null;
        this.activities = (_c = data.activities) !== null && _c !== void 0 ? _c : [];
        return this;
    }
}
exports.Presence = Presence;
//# sourceMappingURL=Presence.js.map