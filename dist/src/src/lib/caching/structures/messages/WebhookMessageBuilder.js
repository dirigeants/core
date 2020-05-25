"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookMessageBuilder = void 0;
/* eslint-disable no-dupe-class-members */
const utils_1 = require("@klasa/utils");
const MessageBuilder_1 = require("./MessageBuilder");
const Embed_1 = require("../Embed");
class WebhookMessageBuilder extends MessageBuilder_1.MessageBuilder {
    /**
     * @param webhookMessageOptions The options to create this
     */
    constructor({ data = {}, files = [] } = {}) {
        super();
        /**
         * Webhook messages don't use auth
         */
        this.auth = false;
        const defaultedData = utils_1.mergeDefault({
            // eslint-disable-next-line @typescript-eslint/camelcase
            allowed_mentions: {
                parse: [],
                roles: [],
                users: []
            }
        }, data);
        this.data = defaultedData;
        this.files = files;
    }
    /**
     * WebhookMessages have multiple embeds, use the addEmbed or spliceEmbed methods instead.
     */
    setEmbed() {
        throw new Error('WebhookMessages have multiple embeds, use the addEmbed or spliceEmbed methods instead.');
    }
    addEmbed(embed) {
        if (!this.data.embeds)
            this.data.embeds = [];
        this.data.embeds.push(typeof embed === 'function' ? embed(new Embed_1.Embed()) : embed);
        return this;
    }
    spliceEmbed(index, deleteCount, embed) {
        if (!this.data.embeds)
            this.data.embeds = [];
        if (embed)
            this.data.embeds.splice(index, deleteCount, typeof embed === 'function' ? embed(new Embed_1.Embed()) : embed);
        else
            this.data.embeds.splice(index, deleteCount);
        return this;
    }
    /**
     * Sets the username of the webhook message
     * @param username The username of the webhook message
     */
    setUsername(username) {
        this.data.username = username;
        return this;
    }
    /**
     * Sets the avatar of the webhook message
     * @param avatar The avatar for the webhook message
     */
    setAvatar(avatar) {
        // eslint-disable-next-line @typescript-eslint/camelcase
        this.data.avatar_url = avatar;
        return this;
    }
}
exports.WebhookMessageBuilder = WebhookMessageBuilder;
//# sourceMappingURL=WebhookMessageBuilder.js.map