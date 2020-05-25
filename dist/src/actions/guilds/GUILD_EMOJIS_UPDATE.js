"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@klasa/utils");
const Action_1 = require("../../lib/pieces/Action");
class CoreAction extends Action_1.Action {
    /**
     * Processes the event data from the websocket.
     * @since 0.0.1
     * @param data The raw data from {@link Client#ws}
     */
    run(data) {
        var _a;
        const guild = this.client.guilds.get(data.d.guild_id);
        if (!guild)
            return;
        for (const emoji of data.d.emojis) {
            const previous = guild.emojis.get(emoji.id);
            if (!previous) {
                // eslint-disable-next-line dot-notation
                const built = guild.emojis['_add'](emoji);
                this.client.emit("guildEmojiCreate" /* GuildEmojiCreate */, built, guild);
                continue;
            }
            if (emoji.name !== previous.name || emoji.available !== previous.available || !utils_1.arrayStrictEquals((_a = emoji.roles) !== null && _a !== void 0 ? _a : [], previous.roleIDs)) {
                const clone = previous.clone();
                // eslint-disable-next-line dot-notation
                previous['_patch'](emoji);
                this.client.emit("guildEmojiUpdate" /* GuildEmojiUpdate */, clone, previous, guild);
            }
        }
        for (const emoji of guild.emojis.values()) {
            const exists = data.d.emojis.some(value => value.id === emoji.id);
            if (!exists) {
                guild.emojis.delete(emoji.id);
                this.client.emit("guildEmojiDelete" /* GuildEmojiDelete */, emoji, guild);
            }
        }
    }
    check() {
        return null;
    }
    build() {
        return null;
    }
    cache() {
        // noop
    }
}
exports.default = CoreAction;
//# sourceMappingURL=GUILD_EMOJIS_UPDATE.js.map