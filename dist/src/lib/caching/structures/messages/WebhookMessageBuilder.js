"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookMessageBuilder = void 0;
/* eslint-disable no-dupe-class-members */
const utils_1 = require("@klasa/utils");
const MessageBuilder_1 = require("./MessageBuilder");
const Embed_1 = require("../Embed");
/* eslint-enable camelcase */
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
            // eslint-disable-next-line camelcase
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
        // eslint-disable-next-line camelcase
        this.data.avatar_url = avatar;
        return this;
    }
    /**
     * Splits this into multiple messages.
     * @param options Options to split the message by.
     */
    split(options = {}) {
        // If there isn't content, the message can't be split
        if (!this.data.content)
            return [this];
        const messages = this._split(options);
        // Don't send any possible empty messages, and return the array of RequestOptions
        return messages.filter(mes => mes).map((content, index) => index === 0 ?
            // first message has embed/s and files
            { data: { ...this.data, content }, files: this.files } :
            // Later messages have neither
            { data: { ...this.data, content, embeds: null } });
    }
}
exports.WebhookMessageBuilder = WebhookMessageBuilder;
//# sourceMappingURL=WebhookMessageBuilder.js.map