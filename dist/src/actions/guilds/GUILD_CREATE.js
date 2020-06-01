"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@klasa/core");
class CoreAction extends core_1.Action {
    /**
     * Processes the event data from the websocket.
     * @since 0.0.1
     * @param data The raw data from {@link Client#ws}
     */
    run(data) {
        const guild = this.client.guilds.get(data.d.id);
        // If the guild was not in cached, this is a new guild, emit GuildCreate
        if (!guild) {
            const created = new (core_1.extender.get('Guild'))(this.client, data.d, data.shard_id);
            if (this.client.options.cache.enabled) {
                this.client.guilds.set(created.id, created);
            }
            this.client.emit("guildCreate" /* GuildCreate */, created);
            return;
        }
        const { unavailable } = guild;
        // eslint-disable-next-line dot-notation
        guild['_patch'](data.d);
        // If it was unavailable and switches to available, emit GuildAvailable
        if (unavailable && !guild.unavailable) {
            this.client.emit("guildAvailable" /* GuildAvailable */, guild);
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
//# sourceMappingURL=GUILD_CREATE.js.map