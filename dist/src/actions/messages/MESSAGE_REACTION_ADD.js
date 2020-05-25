"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("../../lib/pieces/Action");
const Util_1 = require("../../lib/util/Util");
const Extender_1 = require("../../lib/util/Extender");
class CoreAction extends Action_1.Action {
    /**
     * Processes the event data from the websocket.
     * @since 0.0.1
     * @param data The raw data from {@link Client#ws}
     */
    run(data) {
        var _a;
        const guild = data.d.guild_id ? this.client.guilds.get(data.d.guild_id) : undefined;
        if (data.d.member && guild) {
            // eslint-disable-next-line dot-notation
            guild.members['_add'](data.d.member);
        }
        const user = this.client.users.get(data.d.user_id);
        if (!user)
            return;
        const channel = guild ? guild.channels.get(data.d.channel_id) : this.client.dms.get(data.d.channel_id);
        if (!channel || !Util_1.isTextBasedChannel(channel))
            return;
        const message = channel.messages.get(data.d.message_id);
        if (!message)
            return;
        const reaction = this.ensureReaction(message, data);
        if (user.id === ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id))
            reaction.me = true;
        reaction.users.set(user.id);
        ++reaction.count;
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
    ensureReaction(message, data) {
        const reaction = message.reactions.get(data.d.emoji.id || data.d.emoji.name);
        if (reaction)
            return reaction;
        const built = new (Extender_1.extender.get('MessageReaction'))(this.client, data.d, message);
        message.reactions.set(built.id, built);
        return built;
    }
}
exports.default = CoreAction;
//# sourceMappingURL=MESSAGE_REACTION_ADD.js.map