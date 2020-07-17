import { BitField, BitFieldObject } from '@klasa/bitfield';

/* eslint-disable no-bitwise */

export const enum PermissionsFlags {
	CreateInstantInvite = 'CREATE_INSTANT_INVITE',
	KickMembers = 'KICK_MEMBERS',
	BanMembers = 'BAN_MEMBERS',
	Administrator = 'ADMINISTRATOR',
	ManageChannels = 'MANAGE_CHANNELS',
	ManageGuild = 'MANAGE_GUILD',
	AddReactions = 'ADD_REACTIONS',
	ViewAuditLog = 'VIEW_AUDIT_LOG',
	PrioritySpeaker = 'PRIORITY_SPEAKER',
	Stream = 'STREAM',
	ViewChannel = 'VIEW_CHANNEL',
	SendMessages = 'SEND_MESSAGES',
	SendTTSMessages = 'SEND_TTS_MESSAGES',
	ManageMessages = 'MANAGE_MESSAGES',
	EmbedLinks = 'EMBED_LINKS',
	AttachFiles = 'ATTACH_FILES',
	ReadMessageHistory = 'READ_MESSAGE_HISTORY',
	MentionEveryone = 'MENTION_EVERYONE',
	UseExternalEmojis = 'USE_EXTERNAL_EMOJIS',
	ViewGuildInsights = 'VIEW_GUILD_INSIGHTS',

	Connect = 'CONNECT',
	Speak = 'SPEAK',
	MuteMembers = 'MUTE_MEMBERS',
	DeafenMembers = 'DEAFEN_MEMBERS',
	MoveMembers = 'MOVE_MEMBERS',
	UseVAD = 'USE_VAD',

	ChangeNickname = 'CHANGE_NICKNAME',
	ManageNicknames = 'MANAGE_NICKNAMES',
	ManageRoles = 'MANAGE_ROLES',
	ManageWebhooks = 'MANAGE_WEBHOOKS',
	ManageEmojis = 'MANAGE_EMOJIS'
}

export type PermissionsResolvable = PermissionsFlags | number | BitFieldObject | (PermissionsFlags | number | BitFieldObject)[];

/* eslint-disable no-bitwise */

/**
 * Handles Permission BitFields in Klasa-Core
 */
export class Permissions extends BitField<PermissionsResolvable> {

	/**
	 * The Permissions flags
	 */
	public static FLAGS = {
		[PermissionsFlags.CreateInstantInvite]: 1 << 0,
		[PermissionsFlags.KickMembers]: 1 << 1,
		[PermissionsFlags.BanMembers]: 1 << 2,
		[PermissionsFlags.Administrator]: 1 << 3,
		[PermissionsFlags.ManageChannels]: 1 << 4,
		[PermissionsFlags.ManageGuild]: 1 << 5,
		[PermissionsFlags.AddReactions]: 1 << 6,
		[PermissionsFlags.ViewAuditLog]: 1 << 7,
		[PermissionsFlags.PrioritySpeaker]: 1 << 8,
		[PermissionsFlags.Stream]: 1 << 9,
		[PermissionsFlags.ViewChannel]: 1 << 10,
		[PermissionsFlags.SendMessages]: 1 << 11,
		[PermissionsFlags.SendTTSMessages]: 1 << 12,
		[PermissionsFlags.ManageMessages]: 1 << 13,
		[PermissionsFlags.EmbedLinks]: 1 << 14,
		[PermissionsFlags.AttachFiles]: 1 << 15,
		[PermissionsFlags.ReadMessageHistory]: 1 << 16,
		[PermissionsFlags.MentionEveryone]: 1 << 17,
		[PermissionsFlags.UseExternalEmojis]: 1 << 18,
		[PermissionsFlags.ViewGuildInsights]: 1 << 19,

		[PermissionsFlags.Connect]: 1 << 20,
		[PermissionsFlags.Speak]: 1 << 21,
		[PermissionsFlags.MuteMembers]: 1 << 22,
		[PermissionsFlags.DeafenMembers]: 1 << 23,
		[PermissionsFlags.MoveMembers]: 1 << 24,
		[PermissionsFlags.UseVAD]: 1 << 25,

		[PermissionsFlags.ChangeNickname]: 1 << 26,
		[PermissionsFlags.ManageNicknames]: 1 << 27,
		[PermissionsFlags.ManageRoles]: 1 << 28,
		[PermissionsFlags.ManageWebhooks]: 1 << 29,
		[PermissionsFlags.ManageEmojis]: 1 << 30
	} as const;

	/**
	 * The default permissions granted
	 */
	public static DEFAULT = 104324673;

	/**
	 * Permissions that cannot be influenced by channel overwrites, even if explicitly set.
	 */
	public static GUILD_SCOPE_PERMISSIONS = 1275592878;

}
