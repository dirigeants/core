"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookClient = void 0;
const BaseClient_1 = require("./BaseClient");
const Webhook_1 = require("../caching/structures/Webhook");
const cache_1 = require("@klasa/cache");
/**
 * The Klasa-Core Webhook Client used to manipulate webhooks
 */
class WebhookClient extends BaseClient_1.BaseClient {
    constructor() {
        super(...arguments);
        /**
         * Cache of all fetched webhooks
         */
        this.webhooks = new cache_1.Cache();
    }
    /**
     * Fetches a webhook from the api
     * @param id The webhook id
     * @param token The webhook token
     */
    async fetch(id, token) {
        // @ts-expect-error
        const webhook = await Webhook_1.Webhook.fetch(this, id, token);
        this.webhooks.set(id, webhook);
        return webhook;
    }
}
exports.WebhookClient = WebhookClient;
//# sourceMappingURL=WebhookClient.js.map