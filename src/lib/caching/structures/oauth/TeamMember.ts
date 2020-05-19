import type { APITeamMember, TeamMembershipState } from '@klasa/dapi-types';
import type { Client } from '../../../client/Client';
import type { User } from '../User';

/**
 * @see https://discord.com/developers/docs/topics/teams#data-models-team-members-object
 */
export class TeamMember {

	/**
	 * The {@link User} ID.
	 * @since 0.0.1
	 */
	public readonly id: string;

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

	public constructor(public readonly client: Client, data: APITeamMember) {
		this.membershipState = data.membership_state;
		this.permissions = data.permissions;
		this.id = data.user.id;
	}

	/**
	 * The {@link User} this represents.
	 * @since 0.0.1
	 */
	public get user(): User | null {
		return this.client.users.get(this.id) ?? null;
	}

	/**
	 * Defines toString behavior for members.
	 * @since 0.0.1
	 */
	public toString(): string {
		return `<@${this.id}>`;
	}

}
