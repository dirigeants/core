"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const bitfield_1 = require("@klasa/bitfield");
/**
 * Handles Activity BitFields in Klasa-Core
 */
class Activity extends bitfield_1.BitField {
}
exports.Activity = Activity;
/**
 * The Activity flags
 */
Activity.FLAGS = {
    ["INSTANCE" /* Instance */]: 1 << 0,
    ["JOIN" /* Join */]: 1 << 1,
    ["SPECTATE" /* Spectate */]: 1 << 2,
    ["JOIN_REQUEST" /* JoinRequest */]: 1 << 3,
    ["SYNC" /* Sync */]: 1 << 4,
    ["PLAY" /* Play */]: 1 << 5
};
//# sourceMappingURL=Activity.js.map