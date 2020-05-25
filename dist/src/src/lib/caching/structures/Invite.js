"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invite = void 0;
const Structure_1 = require("./base/Structure");
/**
 * @see https://discord.com/developers/docs/resources/invite#invite-object
 */
class Invite extends Structure_1.Structure {
    constructor(client, data, channel, guild) {
        super(client);
        this.id = data.code;
        this.channel = channel;
        this.guild = guild !== null && guild !== void 0 ? guild : null;
        this._patch(data);
    }
    _patch(data) {
        var _a, _b, _c, _d, _e;
        this.inviter = (_a = (data.inviter && this.client.users.get(data.inviter.id))) !== null && _a !== void 0 ? _a : null;
        this.targetUser = (_b = (data.target_user && this.client.users.get(data.target_user.id))) !== null && _b !== void 0 ? _b : null;
        this.targetUserType = (_c = data.target_user_type) !== null && _c !== void 0 ? _c : null;
        this.approximatePresenceCount = (_d = data.approximate_presence_count) !== null && _d !== void 0 ? _d : null;
        this.approximateMemberCount = (_e = data.approximate_member_count) !== null && _e !== void 0 ? _e : null;
        return this;
    }
}
exports.Invite = Invite;
//# sourceMappingURL=Invite.js.map