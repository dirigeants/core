"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const rest_1 = require("@klasa/rest");
const Team_1 = require("./Team");
const Util_1 = require("../../../util/Util");
/**
 * @see https://discord.com/developers/docs/topics/oauth2#get-current-application-information-response-structure
 */
class Application {
    constructor(client, data) {
        var _a, _b, _c, _d;
        this.client = client;
        this.id = data.id;
        this.name = data.name;
        this.icon = data.icon;
        this.description = data.description;
        if (Util_1.isSet(data, 'rpc_origins'))
            this.rpcOrigins = data.rpc_origins;
        this.botPublic = data.bot_public;
        this.botRequireCodeGrant = data.bot_require_code_grant;
        // eslint-disable-next-line dot-notation
        this.owner = this.client.users['_add'](data.owner);
        this.summary = data.summary;
        this.verifyKey = data.verify_key;
        this.team = data.team ? new Team_1.Team(client, data.team) : null;
        this.guildID = (_a = data.guild_id) !== null && _a !== void 0 ? _a : null;
        this.primarySkuID = (_b = data.primary_sku_id) !== null && _b !== void 0 ? _b : null;
        this.slug = (_c = data.slug) !== null && _c !== void 0 ? _c : null;
        this.coverImage = (_d = data.cover_image) !== null && _d !== void 0 ? _d : null;
    }
    /**
     * The guild for this application if applicable.
     * @since 0.0.4
     */
    get guild() {
        var _a;
        return this.guildID !== null ? (_a = this.client.guilds.get(this.guildID)) !== null && _a !== void 0 ? _a : null : null;
    }
    /**
     * Returns an {@link Application application}.
     * @since 0.0.1
     * @param client The {@link Client client} that will manage the created object.
     * @see https://discord.com/developers/docs/topics/oauth2#get-current-application-information
     */
    static async fetch(client) {
        const data = await client.api.get(rest_1.Routes.oauthApplication());
        return new this(client, data);
    }
}
exports.Application = Application;
//# sourceMappingURL=Application.js.map