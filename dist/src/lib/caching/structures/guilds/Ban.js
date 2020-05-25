"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ban = void 0;
const Structure_1 = require("../base/Structure");
/**
 * @see https://discord.com/developers/docs/resources/guild#ban-object
 */
class Ban extends Structure_1.Structure {
    constructor(client, data, guild) {
        super(client);
        /**
         * If the ban has been removed.
         * @since 0.0.1
         */
        this.deleted = false;
        // eslint-disable-next-line dot-notation
        this.id = this.client.users['_add'](data.user).id;
        this.reason = data.reason;
        this.guild = guild;
    }
    /**
     * Deletes the ban. (unbans the user)
     * @since 0.0.1
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#remove-guild-ban
     */
    async delete(requestOptions) {
        await this.guild.bans.remove(this.id, requestOptions);
        this.deleted = true;
        return this;
    }
    /**
     * The user.
     * @since 0.0.1
     */
    get user() {
        var _a;
        return (_a = this.client.users.get(this.id)) !== null && _a !== void 0 ? _a : null;
    }
    _patch() {
        return this;
    }
}
exports.Ban = Ban;
//# sourceMappingURL=Ban.js.map