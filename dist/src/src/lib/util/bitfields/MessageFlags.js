"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageFlags = void 0;
const bitfield_1 = require("@klasa/bitfield");
/* eslint-disable no-bitwise */
/**
 * Handles MessageFlags BitFields in Klasa-Core
 */
class MessageFlags extends bitfield_1.BitField {
}
exports.MessageFlags = MessageFlags;
/**
 * The MessageFlags flags
 */
MessageFlags.FLAGS = {
    CROSSPOSTED: 1 << 0,
    IS_CROSSPOST: 1 << 1,
    SUPPRESS_EMBEDS: 1 << 2,
    SOURCE_MESSAGE_DELETED: 1 << 3,
    URGENT: 1 << 4
};
/* eslint-enable no-bitwise */
//# sourceMappingURL=MessageFlags.js.map