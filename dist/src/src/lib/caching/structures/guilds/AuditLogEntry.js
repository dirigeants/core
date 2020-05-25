"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogEntry = void 0;
const Structure_1 = require("../base/Structure");
/**
 * @see https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object
 */
class AuditLogEntry extends Structure_1.Structure {
    constructor(client, data) {
        super(client);
        this.id = data.id;
        this.targetID = data.target_id;
        this.changes = data.changes;
        this.userID = data.user_id;
        this.actionType = data.action_type;
        this.options = data.options;
        this.reason = data.reason;
    }
    _patch() {
        return this;
    }
}
exports.AuditLogEntry = AuditLogEntry;
//# sourceMappingURL=AuditLogEntry.js.map