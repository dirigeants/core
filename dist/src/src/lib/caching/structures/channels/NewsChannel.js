"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsChannel = void 0;
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