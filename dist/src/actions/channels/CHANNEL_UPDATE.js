"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("../../lib/pieces/Action");
const Channel_1 = require("../../lib/caching/structures/channels/Channel");
const Util_1 = require("../../lib/util/Util");
class CoreAction extends Action_1.Action {
    check(data) {
        var _a;
        const guild = data.d.guild_id ? this.client.guilds.get(data.d.guild_id) : undefined;
        return (_a = (guild ? guild.channels.get(data.d.id) : this.client.dms.get(data.d.id))) !== null && _a !== void 0 ? _a : null;
    }
    build(data) {
        return Channel_1.Channel.create(this.client, data.d);
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
//# sourceMappingURL=CHANNEL_UPDATE.js.map