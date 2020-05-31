import type { APITeamMember, TeamMembershipState } from '@klasa/dapi-types';
import type { Client } from '../../../client/Client';
import type { User } from '../User';
/**
 * @see https://discord.com/developers/docs/topics/teams#data-models-team-members-object
 */
export declare class TeamMember {
    readonly client: Client;
    /**
     * The user's membership state on the team.
     * @since 0.0.1
     */
    membershipState: TeamMembershipState;
    /**
     * Will always be ["*"].
     * @since 0.0.1
     */
    permissions: string[];
    /**
     * The {@link User} this represents.
     * @since 0.0.4
     */
    user: User;
    constructor(client: Client, data: APITeamMember);
    /**
     * The {@link User} ID.
     * @since 0.0.1
     */
    get id(): string;
    /**
     * Defines toString behavior for team members.
     * @since 0.0.1
     */
    toString(): string;
}
