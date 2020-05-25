import { Structure } from './base/Structure';
import type { APIInviteData, InviteTargetUserType } from '@klasa/dapi-types';
import type { Client } from '../../client/Client';
import type { Guild } from './guilds/Guild';
import type { Channel } from './channels/Channel';
import type { User } from './User';
/**
 * @see https://discord.com/developers/docs/resources/invite#invite-object
 */
export declare class Invite extends Structure {
    /**
     * The invite code.
     * @since 0.0.1
     */
    readonly id: string;
    /**
     * The guild this invite is for.
     * @since 0.0.1
     */
    readonly guild: Guild | null;
    /**
     * The channel this invite is for.
     * @since 0.0.1
     */
    readonly channel: Channel;
    /**
     * The user who created the invite.
     * @since 0.0.1
     */
    inviter: User | null;
    /**
     * The target user for this invite.
     * @since 0.0.1
     */
    targetUser: User | null;
    /**
     * The type of user target for this invite.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/invite#invite-object-target-user-types
     */
    targetUserType: InviteTargetUserType | null;
    /**
     * Approximate count of online members (only present when `target_user` is set).
     * @since 0.0.1
     */
    approximatePresenceCount: number | null;
    /**
     * Approximate count of total members.
     * @since 0.0.1
     */
    approximateMemberCount: number | null;
    constructor(client: Client, data: APIInviteData, channel: Channel, guild?: Guild);
    protected _patch(data: APIInviteData): this;
}
