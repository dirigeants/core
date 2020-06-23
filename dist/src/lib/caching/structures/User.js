"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Structure_1 = require("./base/Structure");
const Util_1 = require("../../util/Util");
const Client_1 = require("../../client/Client");
/**
 * @see https://discord.com/developers/docs/resources/user#user-object
 */
class User extends Structure_1.Structure {
    constructor(client, data) {
        super(client);
        this.id = data.id;
        this._patch(data);
    }
    /**
     * Gets an existing DMChannel from the cache.
     * @since 0.0.1
     */
    get channel() {
        var _a;
        if (!(this.client instanceof Client_1.Client))
            throw new Error('DMs can only be opened by bot clients.');
        return (_a = this.client.dms.findValue(dm => dm.recipients.includes(this))) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Returns the users username and discriminator.
     * @since 0.0.1
     */
    get tag() {
        return `${this.username}#${this.discriminator}`;
    }
    /**
     * Gets or Fetches a DM channel for this user.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/user#create-dm
     */
    async openDM() {
        if (!(this.client instanceof Client_1.Client))
            throw new Error('DMs can only be opened by bot clients.');
        const existing = this.client.dms.findValue(dm => dm.recipients.includes(this));
        if (existing)
            return Promise.resolve(existing);
        return this.client.dms.add(this.id);
    }
    /**
     * Closes a DM channel for this user if one exists.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/channel#deleteclose-channel
     */
    closeDM() {
        const existing = this.channel;
        return existing ? existing.delete() : Promise.resolve(null);
    }
    /**
     * Returns the users avatar url.
     * @param options The image size, format and other options.
     */
    avatarURL(options) {
        if (!this.avatar || !(this.client instanceof Client_1.Client))
            return null;
        return this.client.api.cdn.userAvatar(this.id, this.avatar, options);
    }
    /**
     * Returns the users avatar url or the default discord avatar url if they don't have a avatar.
     * @param options The image size, format and other options.
     */
    displayAvatarURL(options) {
        if (!(this.client instanceof Client_1.Client))
            return null;
        return this.avatar ?
            this.avatarURL(options) :
            this.defaultAvatarURL;
    }
    /**
     * Returns the default discord avatar url for the user's discriminator.
     */
    get defaultAvatarURL() {
        if (!(this.client instanceof Client_1.Client))
            return null;
        return this.client.api.cdn.defaultAvatar(Number(this.discriminator));
    }
    /**
     * Defines toString behavior for members.
     * @since 0.0.1
     */
    toString() {
        return `<@${this.id}>`;
    }
    _patch(data) {
        var _a;
        this.username = data.username;
        this.discriminator = data.discriminator;
        this.avatar = data.avatar;
        this.bot = (_a = data.bot) !== null && _a !== void 0 ? _a : false;
        if (Util_1.isSet(data, 'system'))
            this.system = data.system;
        if (Util_1.isSet(data, 'mfa_enabled'))
            this.mfaEnabled = data.mfa_enabled;
        if (Util_1.isSet(data, 'locale'))
            this.locale = data.locale;
        if (Util_1.isSet(data, 'verified'))
            this.verified = data.verified;
        if (Util_1.isSet(data, 'email'))
            this.email = data.email;
        if (Util_1.isSet(data, 'flags'))
            this.flags = data.flags;
        if (Util_1.isSet(data, 'premium_type'))
            this.premiumType = data.premium_type;
        if (Util_1.isSet(data, 'public_flags'))
            this.publicFlags = data.public_flags;
        return this;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map