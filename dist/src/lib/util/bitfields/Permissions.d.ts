import { BitField, BitFieldObject } from '@klasa/bitfield';
export declare const enum PermissionsFlags {
    CreateInstantInvite = "CREATE_INSTANT_INVITE",
    KickMembers = "KICK_MEMBERS",
    BanMembers = "BAN_MEMBERS",
    Administrator = "ADMINISTRATOR",
    ManageChannels = "MANAGE_CHANNELS",
    ManageGuild = "MANAGE_GUILD",
    AddReactions = "ADD_REACTIONS",
    ViewAuditLog = "VIEW_AUDIT_LOG",
    PrioritySpeaker = "PRIORITY_SPEAKER",
    Stream = "STREAM",
    ViewChannel = "VIEW_CHANNEL",
    SendMessages = "SEND_MESSAGES",
    SendTTSMessages = "SEND_TTS_MESSAGES",
    ManageMessages = "MANAGE_MESSAGES",
    EmbedLinks = "EMBED_LINKS",
    AttachFiles = "ATTACH_FILES",
    ReadMessageHistory = "READ_MESSAGE_HISTORY",
    MentionEveryone = "MENTION_EVERYONE",
    UseExternalEmojis = "USE_EXTERNAL_EMOJIS",
    ViewGuildInsights = "VIEW_GUILD_INSIGHTS",
    Connect = "CONNECT",
    Speak = "SPEAK",
    MuteMembers = "MUTE_MEMBERS",
    DeafenMembers = "DEAFEN_MEMBERS",
    MoveMembers = "MOVE_MEMBERS",
    UseVAD = "USE_VAD",
    ChangeNickname = "CHANGE_NICKNAME",
    ManageNicknames = "MANAGE_NICKNAMES",
    ManageRoles = "MANAGE_ROLES",
    ManageWebhooks = "MANAGE_WEBHOOKS",
    ManageEmojis = "MANAGE_EMOJIS"
}
export declare type PermissionsResolvable = PermissionsFlags | number | BitFieldObject | (PermissionsFlags | number | BitFieldObject)[];
/**
 * Handles Permission BitFields in Klasa-Core
 */
export declare class Permissions extends BitField<PermissionsResolvable> {
    /**
     * The Permissions flags
     */
    static FLAGS: {
        readonly CREATE_INSTANT_INVITE: number;
        readonly KICK_MEMBERS: number;
        readonly BAN_MEMBERS: number;
        readonly ADMINISTRATOR: number;
        readonly MANAGE_CHANNELS: number;
        readonly MANAGE_GUILD: number;
        readonly ADD_REACTIONS: number;
        readonly VIEW_AUDIT_LOG: number;
        readonly PRIORITY_SPEAKER: number;
        readonly STREAM: number;
        readonly VIEW_CHANNEL: number;
        readonly SEND_MESSAGES: number;
        readonly SEND_TTS_MESSAGES: number;
        readonly MANAGE_MESSAGES: number;
        readonly EMBED_LINKS: number;
        readonly ATTACH_FILES: number;
        readonly READ_MESSAGE_HISTORY: number;
        readonly MENTION_EVERYONE: number;
        readonly USE_EXTERNAL_EMOJIS: number;
        readonly VIEW_GUILD_INSIGHTS: number;
        readonly CONNECT: number;
        readonly SPEAK: number;
        readonly MUTE_MEMBERS: number;
        readonly DEAFEN_MEMBERS: number;
        readonly MOVE_MEMBERS: number;
        readonly USE_VAD: number;
        readonly CHANGE_NICKNAME: number;
        readonly MANAGE_NICKNAMES: number;
        readonly MANAGE_ROLES: number;
        readonly MANAGE_WEBHOOKS: number;
        readonly MANAGE_EMOJIS: number;
    };
    /**
     * The default permissions granted
     */
    static DEFAULT: number;
}
