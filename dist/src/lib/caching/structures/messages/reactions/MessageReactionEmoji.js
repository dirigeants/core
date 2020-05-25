"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageReactionEmoji = void 0;
/**
 * @see https://discord.com/developers/docs/resources/emoji#emoji-object
 */
class MessageReactionEmoji {
    constructor(client, data) {
        var _a;
        this.client = client;
        this.id = data.id;
        this.name = data.name;
        this.animated = (_a = data.animated) !== null && _a !== void 0 ? _a : false;
    }
    /**
     * The identifier to be used for API requests.
     * @since 0.0.1
     */
    get identifier() {
        var _a;
        return (_a = this.id) !== null && _a !== void 0 ? _a : encodeURIComponent(this.name);
    }
    /**
     * The emoji as shown in Discord.
     * @since 0.0.1
     */
    toString() {
        return this.id ? `<${this.animated ? 'a' : ''}:${this.name}:${this.id}>` : this.name;
    }
    /**
     * Defines the JSON.stringify behavior of this structure.
     * @since 0.0.1
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            animated: this.animated
        };
    }
}
exports.MessageReactionEmoji = MessageReactionEmoji;
//# sourceMappingURL=MessageReactionEmoji.js.map