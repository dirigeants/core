"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@klasa/core");
class CoreAction extends core_1.Action {
    check(data) {
        var _a, _b;
        return (_b = (_a = this.client.guilds.get(data.d.guild_id)) === null || _a === void 0 ? void 0 : _a.voiceStates.get(data.d.user_id)) !== null && _b !== void 0 ? _b : null;
    }
    build(data) {
        const guild = this.client.guilds.get(data.d.guild_id);
        return guild ? new (core_1.extender.get('VoiceState'))(this.client, data.d, guild) : null;
    }
    cache(data) {
        if (this.client.options.cache.enabled && data.guild) {
            data.guild.voiceStates.set(data.id, data);
        }
    }
}
exports.default = CoreAction;
//# sourceMappingURL=VOICE_STATE_UPDATE.js.map