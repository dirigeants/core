import { BitField, BitFieldObject } from '@klasa/bitfield';
export declare type ActivityResolvable = keyof typeof Activity.FLAGS | number | BitFieldObject | ((keyof typeof Activity.FLAGS) | number | BitFieldObject)[];
/**
 * Handles Activity BitFields in Project-Blue
 */
export declare class Activity extends BitField<ActivityResolvable> {
    /**
     * The Activity flags
     */
    static FLAGS: {
        readonly INSTANCE: number;
        readonly JOIN: number;
        readonly SPECTATE: number;
        readonly JOIN_REQUEST: number;
        readonly SYNC: number;
        readonly PLAY: number;
    };
}
