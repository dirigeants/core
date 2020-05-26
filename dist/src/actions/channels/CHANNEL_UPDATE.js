"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@klasa/core");
class CoreAction extends core_1.Action {
    check(data) {
        var _a;
        const guild = data.d.guild_id ? this.client.guilds.get(data.d.guild_id) : undefined;
        return (_a = (guild ? guild.channels.get(data.d.id) : this.client.dms.get(data.d.id))) !== null && _a !== void 0 ? _a : null;
    }
    build(data) {
        return core_1.Channel.create(this.client, data.d);
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
//# sourceMappingURL=CHANNEL_UPDATE.js.map