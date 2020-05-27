import { BitField, BitFieldObject } from '@klasa/bitfield';
export declare const enum ActivityFlags {
    Instance = "INSTANCE",
    Join = "JOIN",
    Spectate = "SPECTATE",
    JoinRequest = "JOIN_REQUEST",
    Sync = "SYNC",
    Play = "PLAY"
}
export declare type ActivityResolvable = ActivityFlags | number | BitFieldObject | (ActivityFlags | number | BitFieldObject)[];
/**
 * Handles Activity BitFields in Klasa-Core
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
