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
        const guild = data.d.guild_id ? this.client.guilds.get(data.d.guild_id) : null;
        const channel = guild ? guild.channels.get(data.d.channel_id) : this.client.dms.get(data.d.channel_id);
        if (!channel || !core_1.isTextBasedChannel(channel))
            return;
        const messages = [];
        for (const id of data.d.ids) {
            const message = channel.messages.get(id);
            if (message) {
                message.deleted = true;
                channel.messages.delete(id);
                messages.push(message);
            }
            else {
                // TODO(kyranet): Maybe make PartialMessage class?
                messages.push({ id });
            }
        }
        this.client.emit(this.clientEvent, messages, channel);
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
//# sourceMappingURL=MESSAGE_DELETE_BULK.js.map