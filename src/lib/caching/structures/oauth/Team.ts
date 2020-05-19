import { Cache } from '@klasa/cache';
import { TeamMember } from './TeamMember';

import type { APITeamData } from '@klasa/dapi-types';
import type { Client } from '../../../client/Client';

/**
 * @see https://discord.com/developers/docs/topics/teams#data-models-team-object
 */
export class Team {

	/**
	 * The unique id of the team.
	 * @since 0.0.1
	 */
	public readonly id: string;

	/**
	 * A hash of the image of the team's icon.
	 * @since 0.0.1
	 */
	public icon?: string;

	/**
	 * The members of the team.
	 * @since 0.0.1
	 */
	public members: Cache<string, TeamMember>;

	/**
	 * The user id of the current team owner.
	 * @since 0.0.1
	 */
	public ownerID: string;

	public constructor(public readonly client: Client, data: APITeamData) {
		this.id = data.id;
		this.icon = data.icon;
		this.members = new Cache(data.members.map(member => [member.user.id, new TeamMember(client, member)]));
		this.ownerID = data.owner_user_id;
	}

}
