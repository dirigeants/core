"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageFlags = void 0;
const bitfield_1 = require("@klasa/bitfield");
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
    ["CROSSPOSTED" /* Crossposted */]: 1 << 0,
    ["IS_CROSSPOST" /* IsCrosspost */]: 1 << 1,
    ["SUPPRESS_EMBEDS" /* SuppressEmbeds */]: 1 << 2,
    ["SOURCE_MESSAGE_DELETED" /* SourceMessageDeleted */]: 1 << 3,
    ["URGENT" /* Urgent */]: 1 << 4
};
//# sourceMappingURL=MessageFlags.js.map