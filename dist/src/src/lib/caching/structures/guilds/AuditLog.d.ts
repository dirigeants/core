import type { APIAuditLogData, APIWebhookData, APIUserData, APIAuditLogEntryData, APIIntegrationData } from '@klasa/dapi-types';
import type { Client } from '../../../client/Client';
/**
 * @see https://discord.com/developers/docs/resources/audit-log#audit-log-object
 */
export declare class AuditLog {
    readonly client: Client;
    /**
     * List of webhooks found in the audit log.
     * @since 0.0.1
     */
    webhooks: APIWebhookData[];
    /**
     * List of users found in the audit log.
     * @since 0.0.1
     */
    users: APIUserData[];
    /**
     * List of audit log entries.
     * @since 0.0.1
     */
    auditLogEntries: APIAuditLogEntryData[];
    /**
     * List of partial integration objects.
     * @since 0.0.1
     */
    integrations: Partial<APIIntegrationData>[];
    constructor(client: Client, data: APIAuditLogData);
}
