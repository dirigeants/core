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
        var _a, _b, _c;
        // TODO(VladFrangu): refactor this to remove code dupe from other actions
        const guild = (_a = (data.d.guild_id && this.client.guilds.get(data.d.guild_id))) !== null && _a !== void 0 ? _a : null;
        const user = this.client.users.get(data.d.user_id);
        if (!user)
            return;
        const channel = guild ? guild.channels.get(data.d.channel_id) : this.client.dms.get(data.d.channel_id);
        if (!channel || !core_1.isTextBasedChannel(channel))
            return;
        const message = channel.messages.get(data.d.message_id);
        if (!message)
            return;
        const reactionID = (_b = data.d.emoji.id) !== null && _b !== void 0 ? _b : data.d.emoji.name;
        const reaction = message.reactions.get(reactionID);
        if (!reaction)
            return;
        if (reaction.users.delete(data.d.user_id) && --reaction.count === 0) {
            message.reactions.delete(reactionID);
        }
        if (user.id === ((_c = this.client.user) === null || _c === void 0 ? void 0 : _c.id)) {
            reaction.me = false;
        }
        this.client.emit(this.clientEvent, reaction, user);
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
//# sourceMappingURL=MESSAGE_REACTION_REMOVE.js.map