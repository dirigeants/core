"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@klasa/core");
class CoreAction extends core_1.Action {
    check() {
        return null;
    }
    build(data) {
        const guild = data.d.guild_id ? this.client.guilds.get(data.d.guild_id) : null;
        const channel = this.client.channels.get(data.d.channel_id);
        return new (core_1.extender.get('Invite'))(this.client, data, channel, guild);
    }
    cache(data) {
        if (this.client.options.cache.enabled) {
            this.client.invites.set(data.id, data);
            if (data.guild)
                data.guild.invites.set(data.id, data);
        }
    }
}
exports.default = CoreAction;
//# sourceMappingURL=INVITE_CREATE.js.map