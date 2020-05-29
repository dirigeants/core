"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@klasa/core");
class CoreAction extends core_1.Action {
    check() {
        return null;
    }
    build(data) {
        const guild = this.client.guilds.get(data.d.guild_id);
        if (!guild)
            return null;
        return new (core_1.extender.get('Role'))(this.client, data.d.role, guild);
    }
    cache(data) {
        if (this.client.options.cache.enabled) {
            data.guild.roles.set(data.id, data);
        }
    }
}
exports.default = CoreAction;
//# sourceMappingURL=GUILD_ROLE_CREATE.js.map