import { BitField, BitFieldObject } from '@klasa/bitfield';
export declare type UserFlagsResolvable = keyof typeof UserFlags.FLAGS | number | BitFieldObject | ((keyof typeof UserFlags.FLAGS) | number | BitFieldObject)[];
/**
 * Handles UserFlags BitFields in Klasa-Core
 */
export declare class UserFlags extends BitField<UserFlagsResolvable> {
    /**
     * The UserFlags flags
     */
    static FLAGS: {
        readonly DISCORD_EMPLOYEE: number;
        readonly DISCORD_PARTNER: number;
        readonly HYPESQUAD_EVENTS: number;
        readonly BUG_HUNTER_LEVEL_1: number;
        readonly HOUSE_BRAVERY: number;
        readonly HOUSE_BRILLIANCE: number;
        readonly HOUSE_BALANCE: number;
        readonly EARLY_SUPPORTER: number;
        readonly TEAM_USER: number;
        readonly SYSTEM: number;
        readonly BUG_HUNTER_LEVEL_2: number;
    };
}
