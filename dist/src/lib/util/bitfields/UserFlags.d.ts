import { BitField, BitFieldObject } from '@klasa/bitfield';
export declare const enum UserFlagsFlags {
    DiscordEmployee = "DISCORD_EMPLOYEE",
    DiscordPartner = "DISCORD_PARTNER",
    HypesquadEvents = "HYPESQUAD_EVENTS",
    BugHunterLevel1 = "BUG_HUNTER_LEVEL_1",
    HouseBravery = "HOUSE_BRAVERY",
    HouseBrilliance = "HOUSE_BRILLIANCE",
    HouseBalance = "HOUSE_BALANCE",
    EarlySupporter = "EARLY_SUPPORTER",
    TeamUser = "TEAM_USER",
    System = "SYSTEM",
    BugHunterLevel2 = "BUG_HUNTER_LEVEL_2"
}
export declare type UserFlagsResolvable = UserFlagsFlags | number | BitFieldObject | (UserFlagsFlags | number | BitFieldObject)[];
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
