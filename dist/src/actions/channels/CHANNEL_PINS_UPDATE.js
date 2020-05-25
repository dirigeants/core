"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("../../lib/pieces/Action");
const Util_1 = require("../../lib/util/Util");
class CoreAction extends Action_1.Action {
    /**
     * Processes the event data from the websocket.
     * @since 0.0.1
     * @param data The raw data from {@link Client#ws}
     */
    run(data) {
        var _a;
        const guild = (_a = (data.d.guild_id && this.client.guilds.get(data.d.guild_id))) !== null && _a !== void 0 ? _a : null;
        const channel = guild ? guild.channels.get(data.d.channel_id) : this.client.dms.get(data.d.channel_id);
        if (!channel || !Util_1.isTextBasedChannel(channel))
            return;
        this.client.emit(this.clientEvent, channel, this.parseDate(data.d.last_pin_timestamp));
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
    parseDate(date) {
        if (!date)
            return null;
        const parsed = new Date(date);
        return Number.isNaN(parsed.getTime()) ? null : parsed;
    }
}
exports.default = CoreAction;
//# sourceMappingURL=CHANNEL_PINS_UPDATE.js.map