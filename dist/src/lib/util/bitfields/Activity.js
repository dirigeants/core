"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const bitfield_1 = require("@klasa/bitfield");
/* eslint-disable no-bitwise */
/**
 * Handles Activity BitFields in Project-Blue
 */
class Activity extends bitfield_1.BitField {
}
exports.Activity = Activity;
/**
 * The Activity flags
 */
Activity.FLAGS = {
    INSTANCE: 1 << 0,
    JOIN: 1 << 1,
    SPECTATE: 1 << 2,
    JOIN_REQUEST: 1 << 3,
    SYNC: 1 << 4,
    PLAY: 1 << 5
};
/* eslint-enable no-bitwise */
//# sourceMappingURL=Activity.js.map