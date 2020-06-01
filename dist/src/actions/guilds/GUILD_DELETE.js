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
        if (!guild) {
            if (!data.d.unavailable)
                return;
            const created = new (core_1.extender.get('Guild'))(this.client, data.d, data.shard_id);
            if (this.client.options.cache.enabled) {
                this.client.guilds.set(created.id, created);
            }
            this.client.emit("guildUnavailable" /* GuildUnavailable */, created);
            return;
        }
        const { unavailable } = data.d;
        guild.unavailable = unavailable;
        if (unavailable) {
            this.client.emit("guildUnavailable" /* GuildUnavailable */, guild);
        }
        else {
            guild.deleted = true;
            this.client.guilds.delete(guild.id);
            this.client.emit("guildDelete" /* GuildDelete */, guild);
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
//# sourceMappingURL=GUILD_DELETE.js.map