"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@klasa/core");
class CoreAction extends core_1.Action {
    check() {
        return null;
    }
    build(data) {
        var _a;
        const guild = data.d.guild_id ? this.client.guilds.get(data.d.guild_id) : null;
        const channel = (_a = (guild ? guild.channels.get(data.d.channel_id) : this.client.dms.get(data.d.channel_id))) !== null && _a !== void 0 ? _a : { id: data.d.channel_id };
        return new (core_1.extender.get('Invite'))(this.client, { ...data, guild, channel });
    }
    cache(data) {
        this.client.invites.delete(data.id);
        if (data.guild)
            data.guild.invites.delete(data.id);
    }
}
exports.default = CoreAction;
//# sourceMappingURL=INVITE_DELETE.js.map