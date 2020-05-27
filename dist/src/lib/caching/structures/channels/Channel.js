"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = void 0;
const Structure_1 = require("../base/Structure");
const Extender_1 = require("../../../util/Extender");
/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
class Channel extends Structure_1.Structure {
    constructor(client, data) {
        super(client);
        /**
         * Whether the DM channel is deleted.
         * @since 0.0.1
         */
        this.deleted = false;
        this.id = data.id;
        this._patch(data);
    }
    /**
     * Defines toString behavior for members.
     * @since 0.0.1
     */
    toString() {
        return `<#${this.id}>`;
    }
    static create(client, data, ...extra) {
        const name = Channel.types.get(data.type);
        if (name)
            return new (Extender_1.extender.get(name))(client, data, ...extra);
        client.emit("debug" /* Debug */, `[Channels] Received data with unknown type '${data.type}'.\n\tPayload: ${JSON.stringify(data)}`);
        return null;
    }
}
exports.Channel = Channel;
Channel.types = new Map([
    [0 /* GuildText */, 'TextChannel'],
    [1 /* DM */, 'DMChannel'],
    [2 /* GuildVoice */, 'VoiceChannel'],
    [3 /* GroupDM */, 'Channel'],
    [4 /* GuildCategory */, 'CategoryChannel'],
    [5 /* GuildNews */, 'NewsChannel'],
    [6 /* GuildStore */, 'StoreChannel']
]);
//# sourceMappingURL=Channel.js.map