"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@klasa/core");
class CoreAction extends core_1.Action {
    /**
     * Processes the event data from the websocket.
     * @since 0.0.1
     * @param data The raw data from {@link Client#ws}
     */
    run(data) {
        const guild = data.d.guild_id ? this.client.guilds.get(data.d.guild_id) : undefined;
        const channel = guild ? guild.channels.get(data.d.channel_id) : this.client.dms.get(data.d.channel_id);
        if (!channel || !core_1.isTextBasedChannel(channel))
            return;
        const message = channel.messages.get(data.d.id);
        if (!message)
            return;
        const clone = message.clone();
        // eslint-disable-next-line dot-notation
        message['_patch'](data.d);
        this.client.emit(this.clientEvent, message, clone);
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
}
exports.default = CoreAction;
//# sourceMappingURL=MESSAGE_UPDATE.js.map