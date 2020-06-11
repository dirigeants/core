"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientPresence = void 0;
/* eslint-disable no-dupe-class-members */
require("@klasa/ws");
const Presence_1 = require("../guilds/Presence");
const PresenceBuilder_1 = require("./PresenceBuilder");
/**
 * The {@link Presence presence} for the {@link ClientUser client user}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/topics/gateway#presence
 */
class ClientPresence extends Presence_1.Presence {
    modify(presence, shards) {
        const data = typeof presence === 'function' ? presence(new PresenceBuilder_1.PresenceBuilder()) : presence;
        // eslint-disable-next-line id-length
        const sent = { op: 3 /* STATUS_UPDATE */, d: data };
        // No shards specified
        if (typeof shards === 'undefined') {
            for (const shard of this.client.ws.shards.values())
                shard.send(sent);
            return this;
        }
        // One shard specified
        if (typeof shards === 'number') {
            const shard = this.client.ws.shards.get(shards);
            if (shard)
                shard.send(sent);
            return this;
        }
        // Multiple shards specified
        for (const shardID of shards) {
            const shard = this.client.ws.shards.get(shardID);
            if (shard)
                shard.send(sent);
        }
        return this;
    }
}
exports.ClientPresence = ClientPresence;
//# sourceMappingURL=ClientPresence.js.map