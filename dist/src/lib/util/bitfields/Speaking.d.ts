import { BitField, BitFieldObject } from '@klasa/bitfield';
export declare type SpeakingResolvable = keyof typeof Speaking.FLAGS | number | BitFieldObject | ((keyof typeof Speaking.FLAGS) | number | BitFieldObject)[];
/**
 * Handles Speaking BitFields in Project-Blue
 */
export declare class Speaking extends BitField<SpeakingResolvable> {
    /**
     * The Speaking flags
     */
    static FLAGS: {
        readonly SPEAKING: number;
        readonly SOUNDSHARE: number;
    };
}
