"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildTextChannel = void 0;
const GuildChannel_1 = require("./GuildChannel");
const MessageStore_1 = require("../../stores/MessageStore");
const MessageCollector_1 = require("../../../util/collectors/MessageCollector");
const Permissions_1 = require("../../../util/bitfields/Permissions");
const Typing_1 = require("../Typing");
/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
class GuildTextChannel extends GuildChannel_1.GuildChannel {
    constructor(client, data, guild) {
        super(client, data, guild);
        this.messages = new MessageStore_1.MessageStore(client, this);
        this.typing = new Typing_1.Typing(this);
    }
    /**
     * If the client can send message attachments in the channel.
     * @since 0.0.1
     */
    get attachable() {
        var _a, _b;
        return (_b = (_a = this.guild.me) === null || _a === void 0 ? void 0 : _a.permissionsIn(this).has([Permissions_1.Permissions.FLAGS.VIEW_CHANNEL, Permissions_1.Permissions.FLAGS.SEND_MESSAGES, Permissions_1.Permissions.FLAGS.ATTACH_FILES])) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * If the client can send messages in the channel.
     * @since 0.0.1
     */
    get postable() {
        var _a, _b;
        return (_b = (_a = this.guild.me) === null || _a === void 0 ? void 0 : _a.permissionsIn(this).has([Permissions_1.Permissions.FLAGS.VIEW_CHANNEL, Permissions_1.Permissions.FLAGS.SEND_MESSAGES])) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * If the client can send message embeds in the channel.
     * @since 0.0.1
     */
    get embedable() {
        var _a, _b;
        return (_b = (_a = this.guild.me) === null || _a === void 0 ? void 0 : _a.permissionsIn(this).has([Permissions_1.Permissions.FLAGS.VIEW_CHANNEL, Permissions_1.Permissions.FLAGS.SEND_MESSAGES, Permissions_1.Permissions.FLAGS.EMBED_LINKS])) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Awaits a group of messages.
     * @since 0.0.1
     * @param options The options to control what you receive
     */
    awaitMessages(options) {
        return new MessageCollector_1.MessageCollector(this, options).collect();
    }
    async send(data, options = {}) {
        // @ts-expect-error
        return this.messages.add(data, options);
    }
    _patch(data) {
        var _a, _b, _c;
        this.topic = (_a = data.topic) !== null && _a !== void 0 ? _a : null;
        this.nsfw = data.nsfw;
        this.lastMessageID = (_b = data.last_message_id) !== null && _b !== void 0 ? _b : null;
        this.lastPinTimestamp = (_c = data.last_pin_timestamp) !== null && _c !== void 0 ? _c : null;
        return super._patch(data);
    }
}
exports.GuildTextChannel = GuildTextChannel;
//# sourceMappingURL=GuildTextChannel.js.map