"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsChannel = void 0;
require("@klasa/dapi-types");
const rest_1 = require("@klasa/rest");
const GuildTextChannel_1 = require("./GuildTextChannel");
/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
class NewsChannel extends GuildTextChannel_1.GuildTextChannel {
    constructor() {
        super(...arguments);
        /**
         * The type of channel.
         * @since 0.0.1
         * @see https://discord.com/developers/docs/resources/channel#channel-object-channel-types
         */
        this.type = 5 /* GuildNews */;
    }
    /**
     * Crossposts a Message in this channel.
     * @param messageID The ID of the {@link Message message} that should be crossposted.
     * @since 0.0.1
     */
    async crosspost(messageID) {
        const messageData = await this.client.api.post(rest_1.Routes.crosspostMessage(this.id, messageID));
        // eslint-disable-next-line dot-notation
        return this.messages['_add'](messageData);
    }
    /*
     * Subscribes a channel to crossposted messages from this channel.
     * @param channel The {@link GuildTextChannel channel} that should follow this NewsChannel.
     * @since 0.0.4
     */
    async follow(channel) {
        // eslint-disable-next-line camelcase
        return this.client.api.post(rest_1.Routes.followChannel(this.id), { data: { webhook_channel_id: channel.id } });
    }
    /**
     * Modifies this channel.
     * @param data The channel modify options.
     * @param requestOptions The request options.
     * @since 0.0.1
     */
    modify(options, requestOptions = {}) {
        return super.modify(options, requestOptions);
    }
}
exports.NewsChannel = NewsChannel;
/* eslint-enable camelcase */
//# sourceMappingURL=NewsChannel.js.map