"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Integration = void 0;
const rest_1 = require("@klasa/rest");
const Structure_1 = require("../base/Structure");
const Util_1 = require("../../../util/Util");
/**
 * @see https://discord.com/developers/docs/resources/guild#integration-object
 */
class Integration extends Structure_1.Structure {
    constructor(client, data, guild) {
        super(client);
        /**
         * Whether the integration is deleted.
         * @since 0.0.1
         */
        this.deleted = false;
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.enabled = data.enabled;
        this.syncing = data.syncing;
        this.roleID = data.role_id;
        this.account = data.account;
        // eslint-disable-next-line dot-notation
        this.userID = this.client.users['_add'](data.user).id;
        this.guild = guild;
    }
    /**
     * The {@link User user} for this integration.
     * @since 0.0.1
     */
    get user() {
        var _a;
        return (_a = this.client.users.get(this.userID)) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * The {@link Role role} that this integration uses for "subscribers".
     * @since 0.0.1
     */
    get role() {
        var _a;
        return (_a = this.guild.roles.get(this.roleID)) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Modifies the behaviour and settings of the integration.
     * @since 0.0.1
     * @param options The settings to modify in the integration.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-integration
     */
    async modify(options, requestOptions = {}) {
        await this.client.api.patch(rest_1.Routes.guildIntegration(this.guild.id, this.id), { ...requestOptions, data: options });
        return this;
    }
    /**
     * Deletes the integration.
     * @since 0.0.1
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#delete-guild-integration
     */
    async delete(requestOptions = {}) {
        await this.guild.integrations.remove(this.id, requestOptions);
        this.deleted = true;
        return this;
    }
    /**
     * Synchronizes the integration.
     * @since 0.0.1
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#sync-guild-integration
     */
    async sync(requestOptions = {}) {
        await this.client.api.post(rest_1.Routes.guildIntegrationSync(this.guild.id, this.id), requestOptions);
        return this;
    }
    _patch(data) {
        var _a;
        if (Util_1.isSet(data, 'expire_behavior'))
            this.expireBehavior = data.expire_behavior;
        if (Util_1.isSet(data, 'expire_grace_period'))
            this.expireGracePeriod = data.expire_grace_period;
        if (Util_1.isSet(data, 'enable_emoticons'))
            this.enableEmoticons = (_a = data.enable_emoticons) !== null && _a !== void 0 ? _a : null;
        this.syncedTimestamp = new Date(data.synced_at).getTime();
        return this;
    }
}
exports.Integration = Integration;
/* eslint-enable camelcase */
//# sourceMappingURL=Integration.js.map