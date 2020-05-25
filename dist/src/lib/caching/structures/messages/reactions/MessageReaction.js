"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageReaction = void 0;
const MessageReactionEmoji_1 = require("./MessageReactionEmoji");
const Structure_1 = require("../../base/Structure");
const MessageReactionUserStore_1 = require("../../../stores/MessageReactionUserStore");
/**
 * @see https://discord.com/developers/docs/resources/channel#reaction-object
 */
class MessageReaction extends Structure_1.Structure {
    constructor(client, data, message) {
        var _a;
        super(client);
        this.id = (_a = data.emoji.id) !== null && _a !== void 0 ? _a : data.emoji.name;
        this.message = message;
        this.emoji = new MessageReactionEmoji_1.MessageReactionEmoji(client, data.emoji);
        this.users = new MessageReactionUserStore_1.MessageReactionUserStore(this);
        this._patch(data);
    }
    /**
     * The emoji as shown in Discord.
     * @since 0.0.1
     */
    toString() {
        return this.emoji.toString();
    }
    /**
     * Defines the JSON.stringify behavior of this structure.
     * @since 0.0.1
     */
    toJSON() {
        return {
            me: this.me,
            count: this.count,
            emoji: this.emoji.toJSON()
        };
    }
    _patch(data) {
        this.me = data.me;
        this.count = data.count;
        return this;
    }
}
exports.MessageReaction = MessageReaction;
//# sourceMappingURL=MessageReaction.js.map