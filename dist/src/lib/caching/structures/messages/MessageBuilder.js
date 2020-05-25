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
     */
    parseUsers() {
        this.data.allowed_mentions.parse.push('users');
        return this;
    }
    /**
     * Allows Role mentions to ping
     */
    parseRoles() {
        this.data.allowed_mentions.parse.push('roles');
        return this;
    }
    /**
     * Allows a set of users to be mentioned in a message (do not use with parseUsers())
     * @param ids user ids you want to mention
     */
    addUserMentions(...ids) {
        this.data.allowed_mentions.users.push(...ids);
        return this;
    }
    /**
     * Allows a set of roles to be mentioned in a message (do not use with parseRoles())
     * @param ids role ids you want to mention
     */
    addRoleMentions(...ids) {
        this.data.allowed_mentions.roles.push(...ids);
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
     * Splits this into multiple messages
     * @param param0 Options to split the message by
     */
    split({ maxLength = 2000, char = '\n', prepend = '', append = '' } = {}) {
        // If there isn't content, the message can't be split
        if (!this.data.content)
            return [this];
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
        // Don't send any possible empty messages, and return the array of RequestOptions
        return messages.filter(mes => mes).map((content, index) => index === 0 ?
            // first message has embed/s and files
            { data: { ...this.data, content }, files: this.files } :
            // Later messages have neither
            { data: { ...this.data, content, embed: undefined, embeds: undefined } });
    }
}
exports.MessageBuilder = MessageBuilder;
//# sourceMappingURL=MessageBuilder.js.map