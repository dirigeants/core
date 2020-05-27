"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Speaking = void 0;
const bitfield_1 = require("@klasa/bitfield");
/**
 * Handles Speaking BitFields in Klasa-Core
 */
class Speaking extends bitfield_1.BitField {
}
exports.Speaking = Speaking;
/**
 * The Speaking flags
 */
Speaking.FLAGS = {
    ["SPEAKING" /* Speaking */]: 1 << 0,
    ["SOUNDSHARE" /* Soundshare */]: 1 << 1
};
//# sourceMappingURL=Speaking.js.map