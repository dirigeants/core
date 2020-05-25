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
        this.client = client;
        this.id = data.id;
        this.name = data.name;
        this.icon = data.icon;
        this.description = data.description;
        if (Util_1.isSet(data, 'rpc_origins'))
            this.rpcOrigins = data.rpc_origins;
        this.botPublic = data.bot_public;
        this.botRequireCodeGrant = data.bot_require_code_grant;
        this.owner = data.owner;
        this.summary = data.summary;
        this.verifyKey = data.verify_key;
        this.team = data.team ? new Team_1.Team(client, data.team) : null;
        if (Util_1.isSet(data, 'guild_id'))
            this.guildID = data.guild_id;
        if (Util_1.isSet(data, 'primary_sku_id'))
            this.primarySkuID = data.primary_sku_id;
        if (Util_1.isSet(data, 'slug'))
            this.slug = data.slug;
        if (Util_1.isSet(data, 'cover_image'))
            this.coverImage = data.cover_image;
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