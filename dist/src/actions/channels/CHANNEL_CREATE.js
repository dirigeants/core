"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@klasa/core");
class CoreAction extends core_1.Action {
    check() {
        return null;
    }
    build(data) {
        return core_1.Channel.create(this.client, data.d, data.d.guild_id && this.client.guilds.get(data.d.guild_id));
    }
    cache(data) {
        if (this.client.options.cache.enabled) {
            this.client.channels.set(data.id, data);
            if (core_1.isGuildChannel(data))
                data.guild.channels.set(data.id, data);
            else
                this.client.dms.set(data.id, data);
        }
    }
}
exports.default = CoreAction;
//# sourceMappingURL=CHANNEL_CREATE.js.map