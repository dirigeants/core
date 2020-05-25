import { BitField, BitFieldObject } from '@klasa/bitfield';
export declare type MessageFlagsResolvable = keyof typeof MessageFlags.FLAGS | number | BitFieldObject | ((keyof typeof MessageFlags.FLAGS) | number | BitFieldObject)[];
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
