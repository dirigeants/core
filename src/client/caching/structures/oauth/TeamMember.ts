import type { Client } from '../../../Client';
import type { APITeamMember, TeamMembershipState, APIUserData } from '@klasa/dapi-types';

/**
 * @see https://discord.com/developers/docs/topics/teams#data-models-team-members-object
 */
export class TeamMember {

	/**
	 * The user's membership state on the team.
	 * @since 0.0.1
	 */
	public membershipState: TeamMembershipState;

	/**
	 * Will always be ["*"].
	 * @since 0.0.1
	 */
	public permissions: string[];

	/**
	 * The avatar, discriminator, id, and username of the user.
	 * @since 0.0.1
	 */
	public user: APIUserData;

	public constructor(public readonly client: Client, data: APITeamMember) {
		this.membershipState = data.membership_state;
		this.permissions = data.permissions;
		this.user = data.user;
	}

	public get id(): string {
		return this.user.id;
	}

}
