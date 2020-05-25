"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceChannel = void 0;
const GuildChannel_1 = require("./GuildChannel");
const Permissions_1 = require("../../../util/bitfields/Permissions");
/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
class VoiceChannel extends GuildChannel_1.GuildChannel {
    constructor() {
        super(...arguments);
        /**
         * The type of channel.
         * @since 0.0.1
         * @see https://discord.com/developers/docs/resources/channel#channel-object-channel-types
         */
        this.type = 2 /* GuildVoice */;
    }
    /**
     * If the client can delete the channel.
     * @since 0.0.1
     */
    get deletable() {
        return !this.deleted && this.manageable;
    }
    /**
     * If the client can manage the channel.
     * @since 0.0.1
     */
    get manageable() {
        var _a, _b;
        return (_b = (_a = this.guild.me) === null || _a === void 0 ? void 0 : _a.permissionsIn(this).has([Permissions_1.Permissions.FLAGS.CONNECT, Permissions_1.Permissions.FLAGS.VIEW_CHANNEL, Permissions_1.Permissions.FLAGS.MANAGE_CHANNELS])) !== null && _b !== void 0 ? _b : null;
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
        this.bitrate = data.bitrate;
        this.userLimit = data.user_limit;
        return super._patch(data);
    }
}
exports.VoiceChannel = VoiceChannel;
//# sourceMappingURL=VoiceChannel.js.map