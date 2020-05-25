"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("../../lib/pieces/Action");
const Channel_1 = require("../../lib/caching/structures/channels/Channel");
const Util_1 = require("../../lib/util/Util");
class CoreAction extends Action_1.Action {
    check() {
        return null;
    }
    build(data) {
        return Channel_1.Channel.create(this.client, data.d, data.d.guild_id && this.client.guilds.get(data.d.guild_id));
    }
    cache(data) {
        if (this.client.options.cache.enabled) {
            this.client.channels.set(data.id, data);
            if (Util_1.isGuildChannel(data))
                data.guild.channels.set(data.id, data);
            else
                this.client.dms.set(data.id, data);
        }
    }
}
exports.default = CoreAction;
//# sourceMappingURL=CHANNEL_CREATE.js.map