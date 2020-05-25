"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceState = void 0;
const Structure_1 = require("../base/Structure");
/**
 * @see https://discord.com/developers/docs/resources/voice#voice-state-object
 */
class VoiceState extends Structure_1.Structure {
    constructor(client, data, guild) {
        super(client);
        this.id = data.user_id;
        this.guild = guild;
        this._patch(data);
    }
    _patch(data) {
        var _a;
        this.channelID = data.channel_id;
        this.sessionID = data.session_id;
        this.deaf = data.deaf;
        this.mute = data.mute;
        this.selfDeaf = data.self_deaf;
        this.selfMute = data.self_mute;
        this.selfStream = (_a = data.self_stream) !== null && _a !== void 0 ? _a : null;
        this.suppress = data.suppress;
        return this;
    }
}
exports.VoiceState = VoiceState;
//# sourceMappingURL=VoiceState.js.map