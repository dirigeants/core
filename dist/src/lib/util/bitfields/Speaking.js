"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Speaking = void 0;
const bitfield_1 = require("@klasa/bitfield");
/* eslint-disable no-bitwise */
/**
 * Handles Speaking BitFields in Project-Blue
 */
class Speaking extends bitfield_1.BitField {
}
exports.Speaking = Speaking;
/**
 * The Speaking flags
 */
Speaking.FLAGS = {
    SPEAKING: 1 << 0,
    SOUNDSHARE: 1 << 1
};
/* eslint-enable no-bitwise */
//# sourceMappingURL=Speaking.js.map