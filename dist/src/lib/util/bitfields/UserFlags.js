"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFlags = void 0;
const bitfield_1 = require("@klasa/bitfield");
/* eslint-disable no-bitwise */
/**
 * Handles UserFlags BitFields in Klasa-Core
 */
class UserFlags extends bitfield_1.BitField {
}
exports.UserFlags = UserFlags;
/**
 * The UserFlags flags
 */
UserFlags.FLAGS = {
    DISCORD_EMPLOYEE: 1 << 0,
    DISCORD_PARTNER: 1 << 1,
    HYPESQUAD_EVENTS: 1 << 2,
    BUG_HUNTER_LEVEL_1: 1 << 3,
    HOUSE_BRAVERY: 1 << 6,
    HOUSE_BRILLIANCE: 1 << 7,
    HOUSE_BALANCE: 1 << 8,
    EARLY_SUPPORTER: 1 << 9,
    TEAM_USER: 1 << 10,
    SYSTEM: 1 << 12,
    BUG_HUNTER_LEVEL_2: 1 << 14
};
/* eslint-enable no-bitwise */
//# sourceMappingURL=UserFlags.js.map