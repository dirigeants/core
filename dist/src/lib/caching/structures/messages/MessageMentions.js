"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageMentions = void 0;
const cache_1 = require("@klasa/cache");
class MessageMentions {
    constructor(message, users, roles, channels, everyone) {
        this.message = message;
        this.users = new cache_1.Cache();
        this.roles = new cache_1.Cache();
        this.channels = new cache_1.Cache();
        if (users) {
            for (const mention of users) {
                // eslint-disable-next-line dot-notation
                const user = this.message.client.users['_add'](mention);
                this.users.set(user.id, user);
                if (mention.member) {
                    // eslint-disable-next-line dot-notation
                    this.message.guild.members['_add']({ ...mention.member, user });
                }
            }
        }
        // Just for now why there is no role store setup
        if (roles)
            for (const role of roles)
                this.roles.set(role, role);
        if (channels)
            for (const mention of channels)
                this.channels.set(mention.id, mention);
        this.everyone = Boolean(everyone);
    }
    toJSON() {
        return {
            message: this.message.id,
            users: [...this.users.keys()],
            roles: [...this.roles.keys()],
            channels: [...this.channels.keys()],
            everyone: this.everyone
        };
    }
}
exports.MessageMentions = MessageMentions;
//# sourceMappingURL=MessageMentions.js.map