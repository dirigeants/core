"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permissions = void 0;
const bitfield_1 = require("@klasa/bitfield");
/* eslint-disable no-bitwise */
/**
 * Handles Permission BitFields in Klasa-Core
 */
class Permissions extends bitfield_1.BitField {
}
exports.Permissions = Permissions;
/**
 * The Permissions flags
 */
Permissions.FLAGS = {
    ["CREATE_INSTANT_INVITE" /* CreateInstantInvite */]: 1 << 0,
    ["KICK_MEMBERS" /* KickMembers */]: 1 << 1,
    ["BAN_MEMBERS" /* BanMembers */]: 1 << 2,
    ["ADMINISTRATOR" /* Administrator */]: 1 << 3,
    ["MANAGE_CHANNELS" /* ManageChannels */]: 1 << 4,
    ["MANAGE_GUILD" /* ManageGuild */]: 1 << 5,
    ["ADD_REACTIONS" /* AddReactions */]: 1 << 6,
    ["VIEW_AUDIT_LOG" /* ViewAuditLog */]: 1 << 7,
    ["PRIORITY_SPEAKER" /* PrioritySpeaker */]: 1 << 8,
    ["STREAM" /* Stream */]: 1 << 9,
    ["VIEW_CHANNEL" /* ViewChannel */]: 1 << 10,
    ["SEND_MESSAGES" /* SendMessages */]: 1 << 11,
    ["SEND_TTS_MESSAGES" /* SendTTSMessages */]: 1 << 12,
    ["MANAGE_MESSAGES" /* ManageMessages */]: 1 << 13,
    ["EMBED_LINKS" /* EmbedLinks */]: 1 << 14,
    ["ATTACH_FILES" /* AttachFiles */]: 1 << 15,
    ["READ_MESSAGE_HISTORY" /* ReadMessageHistory */]: 1 << 16,
    ["MENTION_EVERYONE" /* MentionEveryone */]: 1 << 17,
    ["USE_EXTERNAL_EMOJIS" /* UseExternalEmojis */]: 1 << 18,
    ["VIEW_GUILD_INSIGHTS" /* ViewGuildInsights */]: 1 << 19,
    ["CONNECT" /* Connect */]: 1 << 20,
    ["SPEAK" /* Speak */]: 1 << 21,
    ["MUTE_MEMBERS" /* MuteMembers */]: 1 << 22,
    ["DEAFEN_MEMBERS" /* DeafenMembers */]: 1 << 23,
    ["MOVE_MEMBERS" /* MoveMembers */]: 1 << 24,
    ["USE_VAD" /* UseVAD */]: 1 << 25,
    ["CHANGE_NICKNAME" /* ChangeNickname */]: 1 << 26,
    ["MANAGE_NICKNAMES" /* ManageNicknames */]: 1 << 27,
    ["MANAGE_ROLES" /* ManageRoles */]: 1 << 28,
    ["MANAGE_WEBHOOKS" /* ManageWebhooks */]: 1 << 29,
    ["MANAGE_EMOJIS" /* ManageEmojis */]: 1 << 30
};
/**
 * The default permissions granted
 */
Permissions.DEFAULT = 104324673;
/**
 * Permissions that cannot be influenced by channel overwrites, even if explicitly set.
 */
Permissions.GUILD_SCOPE_PERMISSIONS = 1275592878;
//# sourceMappingURL=Permissions.js.map