import { Structure } from '../base/Structure';

import type { APIAuditLogEntryData, APIAuditLogChangeData, AuditLogEvent, APIAuditLogOptionsData } from '@klasa/dapi-types';
import type { Client } from '../../../client/Client';

/**
 * @see https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object
 */
export class AuditLogEntry extends Structure {

	/**
	 * Id of the entry.
	 * @since 0.0.1
	 */
	public id: string;

	/**
	 * Id of the affected entity (webhook, user, role, etc).
	 * @since 0.0.1
	 */
	public targetID: string | null;

	/**
	 * Changes made to the {@link AuditLogEntry#targetID}.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/audit-log#audit-log-change-object
	 */
	public changes?: APIAuditLogChangeData[];

	/**
	 * The user who made the changes.
	 * @since 0.0.1
	 */
	public userID: string;

	/**
	 * Type of action that occurred.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events
	 */
	public actionType: AuditLogEvent;

	/**
	 * Additional info for certain action types.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info
	 */
	public options?: APIAuditLogOptionsData;

	/**
	 * The reason for the change (0-512 characters).
	 * @since 0.0.1
	 */
	public reason?: string;

	public constructor(client: Client, data: APIAuditLogEntryData) {
		super(client);

		this.id = data.id;
		this.targetID = data.target_id;
		this.changes = data.changes;
		this.userID = data.user_id;
		this.actionType = data.action_type;
		this.options = data.options;
		this.reason = data.reason;
	}

	protected _patch(): this {
		return this;
	}

}
