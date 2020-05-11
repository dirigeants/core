import type { APIAuditLogData, APIWebhookData, APIUserData, APIAuditLogEntryData, APIIntegrationData } from '@klasa/dapi-types';
import type { Client } from '../../../Client';

/**
 * @see https://discord.com/developers/docs/resources/audit-log#audit-log-object
 */
export class AuditLog {

	/**
	 * List of webhooks found in the audit log.
	 * @since 0.0.1
	 */
	public webhooks: APIWebhookData[];

	/**
	 * List of users found in the audit log.
	 * @since 0.0.1
	 */
	public users: APIUserData[];

	/**
	 * List of audit log entries.
	 * @since 0.0.1
	 */
	public auditLogEntries: APIAuditLogEntryData[];

	/**
	 * List of partial integration objects.
	 * @since 0.0.1
	 */
	public integrations: Partial<APIIntegrationData>[];

	public constructor(public readonly client: Client, data: APIAuditLogData) {
		this.webhooks = data.webhooks;
		this.users = data.users;
		this.auditLogEntries = data.audit_log_entries;
		this.integrations = data.integrations;
	}

}
