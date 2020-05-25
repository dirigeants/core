"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientUser = void 0;
const rest_1 = require("@klasa/rest");
const User_1 = require("./User");
const ClientPresence_1 = require("./presences/ClientPresence");
const ImageUtil_1 = require("../../util/ImageUtil");
/**
 * Represents the client's user account.
 * @see https://discord.com/developers/docs/resources/user#user-object
 */
class ClientUser extends User_1.User {
    constructor(client, data) {
        super(client, data);
        this.presence = new ClientPresence_1.ClientPresence(this.client, { user: { id: this.id } });
    }
    /**
     * Modifies the client user.
     * @since 0.0.1
     * @param options The options to be set.
     * @see https://discord.com/developers/docs/resources/user#modify-current-user
     */
    async modify({ avatar, ...options }) {
        const data = {
            avatar: avatar ? await ImageUtil_1.resolveImageToBase64(avatar) : avatar,
            ...options
        };
        const entry = await this.client.api.patch(rest_1.Routes.user(), { data });
        return this._patch(entry);
    }
    /**
     * Modifies the client user's username.
     * @since 0.0.1
     * @param username The username to be set.
     * @see https://discord.com/developers/docs/resources/user#modify-current-user
     */
    setUsername(username) {
        return this.modify({ username });
    }
    /**
     * Modifies the client user's avatar.
     * @since 0.0.1
     * @param avatar The avatar to be set.
     * @see https://discord.com/developers/docs/resources/user#modify-current-user
     */
    setAvatar(avatar) {
        return this.modify({ avatar });
    }
}
exports.ClientUser = ClientUser;
//# sourceMappingURL=ClientUser.js.map