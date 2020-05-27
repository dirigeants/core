import { BitField, BitFieldObject } from '@klasa/bitfield';
export declare const enum MessageFlagsFlags {
    Crossposted = "CROSSPOSTED",
    IsCrosspost = "IS_CROSSPOST",
    SuppressEmbeds = "SUPPRESS_EMBEDS",
    SourceMessageDeleted = "SOURCE_MESSAGE_DELETED",
    Urgent = "URGENT"
}
export declare type MessageFlagsResolvable = MessageFlagsFlags | number | BitFieldObject | (MessageFlagsFlags | number | BitFieldObject)[];
/**
 * Handles MessageFlags BitFields in Klasa-Core
 */
export declare class MessageFlags extends BitField<MessageFlagsResolvable> {
    /**
     * The MessageFlags flags
     */
    static FLAGS: {
        readonly CROSSPOSTED: number;
        readonly IS_CROSSPOST: number;
        readonly SUPPRESS_EMBEDS: number;
        readonly SOURCE_MESSAGE_DELETED: number;
        readonly URGENT: number;
    };
}
