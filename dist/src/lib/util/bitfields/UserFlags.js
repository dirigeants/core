"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFlags = void 0;
const bitfield_1 = require("@klasa/bitfield");
/**
 * Handles UserFlags BitFields in Klasa-Core
 */
let UserFlags = /** @class */ (() => {
    class UserFlags extends bitfield_1.BitField {
    }
    /**
     * The UserFlags flags
     */
    UserFlags.FLAGS = {
        ["DISCORD_EMPLOYEE" /* DiscordEmployee */]: 1 << 0,
        ["DISCORD_PARTNER" /* DiscordPartner */]: 1 << 1,
        ["HYPESQUAD_EVENTS" /* HypesquadEvents */]: 1 << 2,
        ["BUG_HUNTER_LEVEL_1" /* BugHunterLevel1 */]: 1 << 3,
        ["HOUSE_BRAVERY" /* HouseBravery */]: 1 << 6,
        ["HOUSE_BRILLIANCE" /* HouseBrilliance */]: 1 << 7,
        ["HOUSE_BALANCE" /* HouseBalance */]: 1 << 8,
        ["EARLY_SUPPORTER" /* EarlySupporter */]: 1 << 9,
        ["TEAM_USER" /* TeamUser */]: 1 << 10,
        ["SYSTEM" /* System */]: 1 << 12,
        ["BUG_HUNTER_LEVEL_2" /* BugHunterLevel2 */]: 1 << 14
    };
    return UserFlags;
})();
exports.UserFlags = UserFlags;
//# sourceMappingURL=UserFlags.js.map