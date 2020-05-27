import { BitField, BitFieldObject } from '@klasa/bitfield';
export declare const enum SpeakingFlags {
    Speaking = "SPEAKING",
    Soundshare = "SOUNDSHARE"
}
export declare type SpeakingResolvable = SpeakingFlags | number | BitFieldObject | (SpeakingFlags | number | BitFieldObject)[];
/**
 * Handles Speaking BitFields in Klasa-Core
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
