import type { APITeamMember, TeamMembershipState } from '@klasa/dapi-types';
import type { Client } from '../../../client/Client';
import type { User } from '../User';
/**
 * @see https://discord.com/developers/docs/topics/teams#data-models-team-members-object
 */
export declare class TeamMember {
    readonly client: Client;
    /**
     * The {@link User} ID.
     * @since 0.0.1
     */
    readonly id: string;
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
    constructor(client: Client, data: APITeamMember);
    /**
     * The {@link User} this represents.
     * @since 0.0.1
     */
    get user(): User | null;
    /**
     * Defines toString behavior for members.
     * @since 0.0.1
     */
    toString(): string;
}
