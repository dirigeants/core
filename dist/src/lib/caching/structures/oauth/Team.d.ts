import { Cache } from '@klasa/cache';
import { TeamMember } from './TeamMember';
import type { APITeamData } from '@klasa/dapi-types';
import type { Client } from '../../../client/Client';
/**
 * @see https://discord.com/developers/docs/topics/teams#data-models-team-object
 */
export declare class Team {
    readonly client: Client;
    /**
     * The unique id of the team.
     * @since 0.0.1
     */
    readonly id: string;
    /**
     * A hash of the image of the team's icon.
     * @since 0.0.1
     */
    icon?: string;
    /**
     * The members of the team.
     * @since 0.0.1
     */
    members: Cache<string, TeamMember>;
    /**
     * The user id of the current team owner.
     * @since 0.0.1
     */
    ownerID: string;
    constructor(client: Client, data: APITeamData);
    /**
     * The owner of this Team
     * @since 0.0.4
     */
    get owner(): TeamMember;
}
