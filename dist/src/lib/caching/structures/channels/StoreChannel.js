"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreChannel = void 0;
require("@klasa/dapi-types");
const GuildChannel_1 = require("./GuildChannel");
/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
class StoreChannel extends GuildChannel_1.GuildChannel {
    constructor() {
        super(...arguments);
        /**
         * The type of channel.
         * @since 0.0.1
         * @see https://discord.com/developers/docs/resources/channel#channel-object-channel-types
         */
        this.type = 6 /* GuildStore */;
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
    _patch(data) {
        this.nsfw = data.nsfw;
        return super._patch(data);
    }
}
exports.StoreChannel = StoreChannel;
/* eslint-enable camelcase */
//# sourceMappingURL=StoreChannel.js.map