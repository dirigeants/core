"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageBuilder = void 0;
/* eslint-disable no-dupe-class-members */
const utils_1 = require("@klasa/utils");
const Embed_1 = require("../Embed");
class MessageBuilder {
    /**
     * @param messageOptions The options to create this
     */
    constructor({ data = {}, files = [] } = {}) {
        const defaultedData = utils_1.mergeDefault({
            // eslint-disable-next-line @typescript-eslint/camelcase
            allowed_mentions: {
                parse: [],
                roles: [],
                users: []
            }
        }, data);
        this.data = defaultedData;
        this.files = files || [];
    }
    /**
     * Sets content of this message
     * @param content The content to set
     */
    setContent(content) {
        this.data.content = content;
        return this;
    }
    setEmbed(embed) {
        this.data.embed = typeof embed === 'function' ? embed(new Embed_1.Embed()) : embed;
        return this;
    }
    /**
     * Sets the nonce of this message
     * @param nonce The nonce to set
     */
    setNonce(nonce) {
        this.data.nonce = nonce;
        return this;
    }
    /**
     * Sets if this message should be tts
     * @param tts The tts of this message
     */
    setTTS(tts) {
        this.data.tts = tts;
        return this;
    }
    /**
     * Allows Everyone and Here mentions to ping
     */
    parseEveryone() {
        this.data.allowed_mentions.parse.push('everyone');
        return this;
    }
    /**
     * Allows User mentions to ping
     * @param ids user ids you want to mention
     * @example
     * messageBuilder.parseUsers();
     * // All users will be mentionable.
     * @example
     * messageBuilder.parseUsers('167383252271628289', '242043489611808769')
     * // Only those two users will be mentioned even if you mention other users in your message.
     */
    parseUsers(...ids) {
        if (ids.length)
            this.data.allowed_mentions.users.push(...ids);
        else
            this.data.allowed_mentions.parse.push('users');
        return this;
    }
    /**
     * Allows Role mentions to ping
     * @param ids role ids you want to mention
     * @example
     * messageBuilder.parseRoles();
     * // All roles will be mentionable.
     * @example
     * messageBuilder.parseRoles('339959033937264641', '339947394726625300')
     * // Only those two roles will be mentioned even if you mention other roles in your message.
     */
    parseRoles(...ids) {
        if (ids.length)
            this.data.allowed_mentions.roles.push(...ids);
        else
            this.data.allowed_mentions.parse.push('roles');
        return this;
    }
    /**
     * Adds a message attachment to this message
     * @param file The attachment
     */
    addFile(file) {
        this.files.push(file);
        return this;
    }
    /**
     * Splices a message attachment to this message
     * @param index The index to splice at
     * @param deleteCount The number of attachments to delete
     * @param file The attachment to add
     */
    spliceFile(index, deleteCount, file) {
        if (file)
            this.files.splice(index, deleteCount, file);
        else
            this.files.splice(index, deleteCount);
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
            { data: { ...this.data, content, embed: null } });
    }
    /**
     * Internal shared method to split the content by.
     * @param param0 Options to split the content.
     */
    _split({ maxLength = 2000, char = '\n', prepend = '', append = '' } = {}) {
        if (!this.data.content)
            return [];
        const text = this.data.content;
        const splitText = text.length <= maxLength ? [text] : text.split(char);
        const messages = [];
        if (splitText.some(chunk => chunk.length > maxLength))
            throw new RangeError('A split message chunk is too big');
        // The current message we are building until we are just under maxLength
        let msg = '';
        for (const chunk of splitText) {
            // If adding the current chunk will make the message too long, push what we have and start the next message
            if (msg && (msg.length + char.length + chunk.length + append.length > maxLength)) {
                messages.push(msg + append);
                msg = prepend;
            }
            // Add the split char and the current chunk to our current message
            msg += (msg && msg !== prepend ? char : '') + chunk;
        }
        // Push the last message we had when we ran out of chunks
        messages.push(msg);
        return messages;
    }
}
exports.MessageBuilder = MessageBuilder;
//# sourceMappingURL=MessageBuilder.js.map