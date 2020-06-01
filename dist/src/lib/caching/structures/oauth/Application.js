"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const rest_1 = require("@klasa/rest");
const Team_1 = require("./Team");
/**
 * @see https://discord.com/developers/docs/topics/oauth2#get-current-application-information-response-structure
 */
class Application {
    constructor(client, data) {
        var _a, _b, _c, _d, _e;
        this.client = client;
        this.id = data.id;
        this.name = data.name;
        this.icon = data.icon;
        this.description = data.description;
        this.rpcOrigins = (_a = data.rpc_origins) !== null && _a !== void 0 ? _a : [];
        this.botPublic = data.bot_public;
        this.botRequireCodeGrant = data.bot_require_code_grant;
        // eslint-disable-next-line dot-notation
        this.owner = this.client.users['_add'](data.owner);
        this.summary = data.summary;
        this.verifyKey = data.verify_key;
        this.team = data.team ? new Team_1.Team(client, data.team) : null;
        this.guildID = (_b = data.guild_id) !== null && _b !== void 0 ? _b : null;
        this.primarySkuID = (_c = data.primary_sku_id) !== null && _c !== void 0 ? _c : null;
        this.slug = (_d = data.slug) !== null && _d !== void 0 ? _d : null;
        this.coverImage = (_e = data.cover_image) !== null && _e !== void 0 ? _e : null;
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