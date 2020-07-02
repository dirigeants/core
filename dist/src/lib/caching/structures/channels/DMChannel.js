"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DMChannel = void 0;
/* eslint-disable no-dupe-class-members */
require("@klasa/dapi-types");
const Channel_1 = require("./Channel");
const MessageStore_1 = require("../../stores/MessageStore");
const MessageCollector_1 = require("../../../util/collectors/MessageCollector");
const Typing_1 = require("../Typing");
const ChannelPinsStore_1 = require("../../stores/ChannelPinsStore");
/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
class DMChannel extends Channel_1.Channel {
    constructor(client, data) {
        super(client, data);
        /**
         * The type of channel.
         * @since 0.0.1
         * @see https://discord.com/developers/docs/resources/channel#channel-object-channel-types
         */
        this.type = 1 /* DM */;
        /**
         * Whether the DM channel is deleted.
         * @since 0.0.1
         */
        this.deleted = false;
        this.messages = new MessageStore_1.MessageStore(client, this);
        this.typing = new Typing_1.Typing(this);
        this.pins = new ChannelPinsStore_1.ChannelPinsStore(this, []);
    }
    /**
     * If the client can send message attachments in the channel.
     * @since 0.0.1
     */
    get attachable() {
        // always true here
        return true;
    }
    /**
     * If the client can send messages in the channel.
     * @since 0.0.1
     */
    get postable() {
        // always true here
        return true;
    }
    /**
     * If the client can send message embeds in the channel.
     * @since 0.0.1
     */
    get embedable() {
        // always true here
        return true;
    }
    /**
     * Awaits a group of messages.
     * @since 0.0.1
     * @param options The options to control what you receive
     */
    awaitMessages(options) {
        return new MessageCollector_1.MessageCollector(this, options).collect();
    }
    /**
     * Closes the channel.
     * @since 0.0.1
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/channel#deleteclose-channel
     */
    async delete(requestOptions = {}) {
        await this.client.dms.remove(this.id, requestOptions);
        this.deleted = true;
        return this;
    }
    async send(data, options = {}) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return this.messages.add(data, options);
    }
    _patch(data) {
        // eslint-disable-next-line dot-notation
        this.recipients = data.recipients.map(user => this.client.users['_add'](user));
        this.lastMessageID = data.last_message_id;
        return this;
    }
}
exports.DMChannel = DMChannel;
//# sourceMappingURL=DMChannel.js.map