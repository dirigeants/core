import { Structure } from './base/Structure';

import type { APIInviteData, APIGuildPartial, APIChannelPartial, APIUserData, InviteTargetUserType } from '@klasa/dapi-types';
import type { Client } from '../../Client';

/**
 * @see https://discord.com/developers/docs/resources/invite#invite-object
 */
export class Invite extends Structure {

	/**
	 * The invite code.
	 * @since 0.0.1
	 */
	public readonly id: string;

	/**
	 * The guild this invite is for.
	 * @since 0.0.1
	 */
	public guild!: APIGuildPartial | null;

	/**
	 * The channel this invite is for.
	 * @since 0.0.1
	 */
	public channel!: APIChannelPartial;

	/**
	 * The user who created the invite.
	 * @since 0.0.1
	 */
	public inviter!: APIUserData | null;

	/**
	 * The target user for this invite.
	 * @since 0.0.1
	 */
	public targetUser!: APIUserData | null;

	/**
	 * The type of user target for this invite.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/invite#invite-object-target-user-types
	 */
	public targetUserType!: InviteTargetUserType | null;

	/**
	 * Approximate count of online members (only present when `target_user` is set).
	 * @since 0.0.1
	 */
	public approximatePresenceCount!: number | null;

	/**
	 * Approximate count of total members.
	 * @since 0.0.1
	 */
	public approximateMemberCount!: number | null;

	public constructor(client: Client, data: APIInviteData) {
		super(client);

		this.id = data.code;
		this._patch(data);
	}

	protected _patch(data: APIInviteData): this {
		this.guild = data.guild ?? null;
		this.channel = data.channel;
		this.inviter = data.inviter ?? null;
		this.targetUser = data.target_user ?? null;
		this.targetUserType = data.target_user_type ?? null;
		this.approximatePresenceCount = data.approximate_presence_count ?? null;
		this.approximateMemberCount = data.approximate_member_count ?? null;
		return this;
	}

}
