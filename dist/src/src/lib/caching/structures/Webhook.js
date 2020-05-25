"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Webhook = void 0;
/* eslint-disable no-dupe-class-members */
const snowflake_1 = require("@klasa/snowflake");
const rest_1 = require("@klasa/rest");
const WebhookMessageBuilder_1 = require("./messages/WebhookMessageBuilder");
const Structure_1 = require("./base/Structure");
const Extender_1 = require("../../util/Extender");
class Webhook extends Structure_1.Structure {
    /**
     * @param client The client to manage this webhook
     * @param data The webhook data
     */
    constructor(client, data) {
        super(client);
        /**
         * The name of the webhook
         */
        this.name = null;
        /**
         * The avatar used for this webhook
         */
        this.avatar = null;
        this.id = data.id;
        this.type = data.type;
        this.guildID = data.guild_id;
        this._patch(data);
    }
    _patch(data) {
        this.token = data.token || this.token;
        this.name = data.name || this.name;
        this.avatar = data.avatar || this.avatar;
        this.channelID = data.channel_id || this.channelID;
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
        return (this.guildID && this.client.guilds.get(this.guildID)) || null;
    }
    /**
     * The channel of this webhook
     */
    get channel() {
        var _a, _b;
        return (_b = (_a = this.client) === null || _a === void 0 ? void 0 : _a.channels.get(this.channelID)) !== null && _b !== void 0 ? _b : null;
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
    async send(data, splitOptions) {
        if (!this.token)
            throw new Error('The token on this webhook is unknown. You cannot send messages.');
        const split = new WebhookMessageBuilder_1.WebhookMessageBuilder(typeof data === 'function' ? await data(new WebhookMessageBuilder_1.WebhookMessageBuilder()) : data).split(splitOptions);
        const endpoint = rest_1.Routes.webhookTokened(this.id, this.token);
        const responses = [];
        for (const message of split)
            responses.push(this.client.api.post(endpoint, message));
        const rawMessages = await Promise.all(responses);
        const MessageConstructor = Extender_1.extender.get('Message');
        return rawMessages.map(msg => new MessageConstructor(this.client, msg));
    }
    /**
     * Updates the webhook properties
     * @param webhookUpdateData Data to update the webhook with
     */
    async update({ name, avatar, channelID }) {
        const updateData = await (channelID || !this.token ?
            // Requires MANAGE_WEBHOOKS permission to update channelID or to update without the token
            // eslint-disable-next-line @typescript-eslint/camelcase
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
    }
    static async fetch(client, id, token) {
        const webhookData = await (token ?
            client.api.get(rest_1.Routes.webhookTokened(id, token), { auth: false }) :
            client.api.get(rest_1.Routes.webhook(id)));
        return new this(client, webhookData);
    }
}
exports.Webhook = Webhook;
//# sourceMappingURL=Webhook.js.map