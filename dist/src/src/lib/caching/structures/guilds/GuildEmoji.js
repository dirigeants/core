"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildEmoji = void 0;
const Structure_1 = require("../base/Structure");
/**
 * @see https://discord.com/developers/docs/resources/emoji#emoji-object
 */
class GuildEmoji extends Structure_1.Structure {
    constructor(client, data, guild) {
        super(client);
        /**
         * Whether the integration is deleted.
         * @since 0.0.1
         */
        this.deleted = false;
        this.id = data.id;
        this.guild = guild;
        this._patch(data);
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
     * Deletes an emoji from the {@link Guild guild}.
     * @since 0.0.1
     * @param emojiID The {@link GuildEmoji guild emoji} ID.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/emoji#create-guild-emoji
     */
    async delete(requestOptions = {}) {
        await this.guild.emojis.remove(this.id, requestOptions);
        this.deleted = true;
        return this;
    }
    _patch(data) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.animated = (_a = data.animated) !== null && _a !== void 0 ? _a : null;
        this.managed = (_b = data.managed) !== null && _b !== void 0 ? _b : null;
        this.name = data.name;
        this.requireColons = (_c = data.require_colons) !== null && _c !== void 0 ? _c : null;
        this.roleIDs = (_d = data.roles) !== null && _d !== void 0 ? _d : [];
        this.userID = (_f = (_e = data.user) === null || _e === void 0 ? void 0 : _e.id) !== null && _f !== void 0 ? _f : null;
        this.available = (_g = data.available) !== null && _g !== void 0 ? _g : true;
        return this;
    }
}
exports.GuildEmoji = GuildEmoji;
//# sourceMappingURL=GuildEmoji.js.map