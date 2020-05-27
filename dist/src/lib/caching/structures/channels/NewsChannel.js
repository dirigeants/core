"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsChannel = void 0;
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
        this.type = 5 /* GuildAnnouncement */;
    }
    /**
     * Subscribes a channel to crossposted messages from this channel.
     * @param channel The {@link GuildTextChannel channel} that should follow this NewsChannel.
     * @since 0.0.4
     */
    async follow(channel) {
        // eslint-disable-next-line @typescript-eslint/camelcase
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
//# sourceMappingURL=NewsChannel.js.map