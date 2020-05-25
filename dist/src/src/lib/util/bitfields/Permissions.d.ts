import { BitField, BitFieldObject } from '@klasa/bitfield';
export declare type PermissionsResolvable = keyof typeof Permissions.FLAGS | number | BitFieldObject | ((keyof typeof Permissions.FLAGS) | number | BitFieldObject)[];
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
