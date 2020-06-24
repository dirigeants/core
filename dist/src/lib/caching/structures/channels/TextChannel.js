"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextChannel = void 0;
require("@klasa/dapi-types");
const GuildTextChannel_1 = require("./GuildTextChannel");
/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
class TextChannel extends GuildTextChannel_1.GuildTextChannel {
    constructor() {
        super(...arguments);
        /**
         * The type of channel.
         * @since 0.0.1
         * @see https://discord.com/developers/docs/resources/channel#channel-object-channel-types
         */
        this.type = 0 /* GuildText */;
    }
    /**
     * Modifies this channel.
     * @param data The channel modify options.
     * @param requestOptions The request options.
     * @since 0.0.1
     */
    modify(data, requestOptions = {}) {
        return super.modify(data, requestOptions);
    }
    _patch(data) {
        this.rateLimitPerUser = data.rate_limit_per_user;
        return super._patch(data);
    }
}
exports.TextChannel = TextChannel;
/* eslint-enable camelcase */
//# sourceMappingURL=TextChannel.js.map