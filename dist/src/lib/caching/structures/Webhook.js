"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Webhook = void 0;
/* eslint-disable no-dupe-class-members */
const snowflake_1 = require("@klasa/snowflake");
const rest_1 = require("@klasa/rest");
const WebhookMessageBuilder_1 = require("./messages/WebhookMessageBuilder");
const Structure_1 = require("./base/Structure");
const Extender_1 = require("../../util/Extender");
const WebhookMessage_1 = require("./messages/WebhookMessage");
class Webhook extends Structure_1.Structure {
    /**
     * @param client The client to manage this webhook
     * @param data The webhook data
     */
    constructor(client, data, token) {
        var _a;
        super(client);
        /**
         * The "user" of the webhook displayed on the webhook messages
         */
        this.user = null;
        /**
         * The name of the webhook
         */
        this.name = null;
        /**
         * The avatar used for this webhook
         */
        this.avatar = null;
        /**
         * If the webhook has been deleted
         */
        this.deleted = false;
        this.id = data.id;
        this.type = data.type;
        this.guildID = (_a = data.guild_id) !== null && _a !== void 0 ? _a : null;
        this.token = token !== null && token !== void 0 ? token : null;
        this._patch(data);
    }
    _patch(data) {
        var _a, _b, _c, _d;
        this.token = (_a = data.token) !== null && _a !== void 0 ? _a : this.token;
        this.name = (_b = data.name) !== null && _b !== void 0 ? _b : this.name;
        this.avatar = (_c = data.avatar) !== null && _c !== void 0 ? _c : this.avatar;
        this.channelID = (_d = data.channel_id) !== null && _d !== void 0 ? _d : this.channelID;
        if (data.user) {
            // eslint-disable-next-line dot-notation
            if (this.user)
                this.user['_patch'](data.user);
            else
                this.user = new (Extender_1.extender.get('User'))(this.client, data.user);
        }
        return this;
    }
    /**
     * The guild that this webhook is in
     */
    get guild() {
        var _a;
        return (this.guildID && ((_a = this.client.guilds) === null || _a === void 0 ? void 0 : _a.get(this.guildID))) || null;
    }
    /**
     * The channel of this webhook
     */
    get channel() {
        var _a, _b;
        return (_b = (_a = this.client.channels) === null || _a === void 0 ? void 0 : _a.get(this.channelID)) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The timestamp the webhook was created at
     */
    get createdTimestamp() {
        return new snowflake_1.Snowflake(this.id).timestamp;
    }
    /**
     * The time the webhook was created at
     */
    get createdAt() {
        return new snowflake_1.Snowflake(this.id).date;
    }
    // eslint-disable-next-line max-len
    async send(data, splitOptions) {
        if (!this.token)
            throw new Error('The token on this webhook is unknown. You cannot send messages.');
        const split = new WebhookMessageBuilder_1.WebhookMessageBuilder(typeof data === 'function' ? await data(new WebhookMessageBuilder_1.WebhookMessageBuilder()) : data).split(splitOptions);
        const endpoint = rest_1.Routes.webhookTokened(this.id, this.token);
        const responses = [];
        for (const message of split)
            responses.push(this.client.api.post(endpoint, { query: [['wait', true]], ...message }));
        const rawMessages = await Promise.all(responses);
        return rawMessages.map(msg => new WebhookMessage_1.WebhookMessage(this.client, msg));
    }
    /**
     * Modifies the webhook properties
     * @param webhookUpdateData Data to update the webhook with
     */
    async modify({ name, avatar, channelID }) {
        const updateData = await (channelID || !this.token ?
            // Requires MANAGE_WEBHOOKS permission to update channelID or to update without the token
            // eslint-disable-next-line camelcase
            this.client.api.patch(rest_1.Routes.webhook(this.id), { data: { name, avatar, channel_id: channelID } }) :
            // Doesn't require any permissions, but you cannot change the channelID
            this.client.api.patch(rest_1.Routes.webhookTokened(this.id, this.token), { auth: false, data: { name, avatar } }));
        return this._patch(updateData);
    }
    /**
     * Delete this webhook from the api
     */
    async delete() {
        await (this.token ?
            // If we know the webhook token, we can delete it with less permissions
            this.client.api.delete(rest_1.Routes.webhookTokened(this.id, this.token), { auth: false }) :
            // Requires MANAGE_WEBHOOKS permission
            this.client.api.delete(rest_1.Routes.webhook(this.id)));
        this.deleted = true;
    }
    static async fetch(client, id, token) {
        const webhookData = await (token ?
            client.api.get(rest_1.Routes.webhookTokened(id, token), { auth: false }) :
            client.api.get(rest_1.Routes.webhook(id)));
        return new this(client, webhookData, token);
    }
}
exports.Webhook = Webhook;
//# sourceMappingURL=Webhook.js.map