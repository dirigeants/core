"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLog = void 0;
/**
 * @see https://discord.com/developers/docs/resources/audit-log#audit-log-object
 */
class AuditLog {
    constructor(client, data) {
        this.client = client;
        this.webhooks = data.webhooks;
        this.users = data.users;
        this.auditLogEntries = data.audit_log_entries;
        this.integrations = data.integrations;
    }
}
exports.AuditLog = AuditLog;
//# sourceMappingURL=AuditLog.js.map