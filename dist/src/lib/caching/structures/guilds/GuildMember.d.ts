import { RequestOptions } from '@klasa/rest';
import { Structure } from '../base/Structure';
import { GuildMemberRoleStore } from '../../stores/GuildMemberRoleStore';
import { Permissions } from '../../../util/bitfields/Permissions';
import type { APIGuildMemberData } from '@klasa/dapi-types';
import type { Guild } from './Guild';
import type { User } from '../User';
import type { Client } from '../../../client/Client';
import type { GuildChannel } from '../channels/GuildChannel';
/**
 * @see https://discord.com/developers/docs/resources/guild#guild-member-object
 */
export declare class GuildMember extends Structure {
    /**
     * The member's ID.
     * @since 0.0.1
     */
    readonly id: string;
    /**
     * The {@link Guild} this member belongs to.
     * @since 0.0.1
     */
    readonly guild: Guild;
    /**
     * Whether or not the user is deafened in voice channels.
     * @since 0.0.1
     */
    deaf: boolean | null;
    /**
     * When the user joined the guild.
     * @since 0.0.1
     */
    joinedTimestamp: number | null;
    /**
     * Whether or not the user is muted in voice channels.
     * @since 0.0.1
     */
    mute: boolean | null;
    /**
     * This user's guild nickname.
     * @since 0.0.1
     */
    nick: string | null;
    /**
     * When the user started boosting the guild.
     * @since 0.0.1
     * @see https://support.discord.com/hc/en-us/articles/360028038352-Server-Boosting-
     */
    premiumSince: number | null;
    /**
     * The roles this member has.
     * @since 0.0.1
     */
    roles: GuildMemberRoleStore;
    /**
     * Whether the member was kicked.
     * @since 0.0.1
     */
    deleted: boolean;
    constructor(client: Client, data: MemberData, guild: Guild);
    /**
     * The user for this member
     * @since 0.0.1
     */
    get user(): User | null;
    /**
     * The displayed name for the member
     * @since 0.0.4
     */
    get displayName(): string | null;
    /**
     * The calculated permissions from the member's {@link GuildMemberRoleStore roles}.
     * @since 0.0.1
     */
    get permissions(): Readonly<Permissions>;
    /**
     * Whether or not the {@link ClientUser client user} can kick this member.
     * @since 0.0.1
     * @returns `null` when the {@link ClientUser client user}'s member is not cached (or when {@link Client#user} is null),
     * or a boolean specifying whether or not the conditions are met.
     */
    get kickable(): boolean | null;
    /**
     * Whether or not the {@link ClientUser client user} can ban this member.
     * @since 0.0.1
     * @returns `null` when the {@link ClientUser client user}'s member is not cached (or when {@link Client#user} is null),
     * or a boolean specifying whether or not the conditions are met.
     */
    get bannable(): boolean | null;
    /**
     * Whether or not the {@link ClientUser client user} can manage the member's nickname.
     * @since 0.0.1
     * @returns `null` when the {@link ClientUser client user}'s member is not cached (or when {@link Client#user} is null),
     * or a boolean specifying whether or not the conditions are met.
     */
    get manageNicknames(): boolean | null;
    /**
     * Whether or not the {@link ClientUser client user} can manage the member's roles.
     * @since 0.0.1
     * @returns `null` when the {@link ClientUser client user}'s member is not cached (or when {@link Client#user} is null),
     * or a boolean specifying whether or not the conditions are met.
     */
    get manageRoles(): boolean | null;
    /**
     * Whether or not the {@link ClientUser client user} can manage this member. This is based on:
     * - The member is not the {@link Guild#owner guild owner}.
     * - The {@link ClientUser client user} is the owner of the {@link Guild}.
     * - The {@link ClientUser client user}'s {@link GuildMemberRoleStore#highest highest role} is higher than the member's.
     * @since 0.0.1
     * @returns `true` when any of the conditions are met, `null` when the {@link ClientUser client user}'s member is not
     * cached (or when {@link Client#user} is null), or `false` otherwise.
     */
    protected get _manageable(): boolean | null;
    /**
     * Modifies the settings for the member.
     * @param data The settings to be set.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-member
     */
    modify(data: GuildMemberModifyOptions, requestOptions?: RequestOptions): Promise<this>;
    /**
     * Checks permissions for this member in a given channel.
     * @param channel The channel to check permissions in
     */
    permissionsIn(channel: GuildChannel): Readonly<Permissions>;
    /**
     * Kicks a member from the {@link Guild guild}.
     * @since 0.0.1
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#remove-guild-member
     */
    kick(requestOptions?: RequestOptions): Promise<this>;
    /**
     * Defines toString behavior for members.
     * @since 0.0.1
     */
    toString(): string;
    protected _patch(data: MemberData): this;
}
export declare type MemberData = APIGuildMemberData | Omit<APIGuildMemberData, 'deaf' | 'mute' | 'nick' | 'joined_at'>;
/**
 * The options for {@link GuildMember#modify}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#modify-guild-member-json-params
 */
export interface GuildMemberModifyOptions {
    /**
     * Value to set {@link GuildMember user}'s nickname to.
     * @since 0.0.1
     */
    nick?: string;
    /**
     * Array of {@link Role role} IDs the member is assigned.
     * @since 0.0.1
     */
    roles?: readonly string[];
    /**
     * Whether the user is muted in voice channels, will throw an error if the user is not in a {@link VoiceChannel voice channel}.
     * @since 0.0.1
     */
    mute?: boolean;
    /**
     * Whether the user is deafened in voice channels, will throw an error if the user is not in a {@link VoiceChannel voice channel}.
     * @since 0.0.1
     */
    deaf?: boolean;
    /**
     * Id of channel to move user to (if they are connected to a {@link VoiceChannel voice channel}).
     * @since 0.0.1
     */
    channel_id?: string | null;
}
