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
        for (const guild of data.d.guilds) {
            // If we don't already have this guild cached on READY, and the cache is enabled
            // cache it now to prevent emitting a GUILD_CREATE event later when we get
            // the full object
            if (this.client.options.cache.enabled && !this.client.guilds.has(guild.id)) {
                // eslint-disable-next-line dot-notation
                const created = new (core_1.extender.get('Guild'))(this.client, guild, data.shard_id);
                this.client.guilds.set(created.id, created);
            }
        }
        const ClientUser = core_1.extender.get('ClientUser');
        this.client.user = new ClientUser(this.client, data.d.user);
        this.client.users.set(this.client.user.id, this.client.user);
        const shard = this.client.ws.shards.get(data.shard_id);
        if (shard)
            this.client.emit("shardReady" /* ShardReady */, shard);
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
//# sourceMappingURL=READY.js.map