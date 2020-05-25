"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("../lib/pieces/Action");
const Extender_1 = require("../lib/util/Extender");
class CoreAction extends Action_1.Action {
    /**
     * Processes the event data from the websocket.
     * @since 0.0.1
     * @param data The raw data from {@link Client#ws}
     */
    run(data) {
        for (const guild of data.d.guilds) {
            // eslint-disable-next-line dot-notation
            this.client.guilds['_add'](guild);
        }
        const ClientUser = Extender_1.extender.get('ClientUser');
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