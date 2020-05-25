import { Structure } from '../base/Structure';
import type { APIAuditLogEntryData, APIAuditLogChangeData, AuditLogEvent, APIAuditLogOptionsData } from '@klasa/dapi-types';
import type { Client } from '../../../client/Client';
/**
 * @see https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object
 */
export declare class AuditLogEntry extends Structure {
    /**
     * Id of the entry.
     * @since 0.0.1
     */
    id: string;
    /**
     * Id of the affected entity (webhook, user, role, etc).
     * @since 0.0.1
     */
    targetID: string | null;
    /**
     * Changes made to the {@link AuditLogEntry#targetID}.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/audit-log#audit-log-change-object
     */
    changes?: APIAuditLogChangeData[];
    /**
     * The user who made the changes.
     * @since 0.0.1
     */
    userID: string;
    /**
     * Type of action that occurred.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events
     */
    actionType: AuditLogEvent;
    /**
     * Additional info for certain action types.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info
     */
    options?: APIAuditLogOptionsData;
    /**
     * The reason for the change (0-512 characters).
     * @since 0.0.1
     */
    reason?: string;
    constructor(client: Client, data: APIAuditLogEntryData);
    protected _patch(): this;
}
