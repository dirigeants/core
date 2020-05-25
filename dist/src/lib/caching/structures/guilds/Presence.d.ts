import { Structure } from '../base/Structure';
import type { APIPresenceUpdateData, PresenceUpdateStatus, APIActivityData, APIClientStatusData } from '@klasa/dapi-types';
import type { Client } from '../../../client/Client';
/**
 * @see https://discord.com/developers/docs/topics/gateway#presence
 */
export declare class Presence extends Structure {
    /**
     * The member's ID this presence corresponds to.
     * @since 0.0.1
     */
    readonly id: string;
    /**
     * The member's status.
     * @since 0.0.1
     */
    status: PresenceUpdateStatus | null;
    /**
     * The member's platform-dependent status.
     * @since 0.0.1
     */
    clientStatus: APIClientStatusData | null;
    /**
     * The member's current activities.
     * @since 0.0.1
     */
    activities: APIActivityData[];
    constructor(client: Client, data: APIPresenceUpdateData);
    protected _patch(data: APIPresenceUpdateData): this;
}
