"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryChannel = void 0;
const GuildChannel_1 = require("./GuildChannel");
/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
class CategoryChannel extends GuildChannel_1.GuildChannel {
    constructor() {
        super(...arguments);
        /**
         * The type of channel.
         * @since 0.0.1
         * @see https://discord.com/developers/docs/resources/channel#channel-object-channel-types
         */
        this.type = 4 /* GuildCategory */;
    }
}
exports.CategoryChannel = CategoryChannel;
//# sourceMappingURL=CategoryChannel.js.map