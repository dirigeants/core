"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageAttachment = void 0;
/* eslint-disable camelcase */
/**
 * @see https://discord.com/developers/docs/resources/channel#attachment-object
 */
class MessageAttachment {
    constructor(attachment) {
        this.id = attachment.id;
        this.filename = attachment.filename;
        this.size = attachment.size;
        this.url = attachment.url;
        // eslint-disable-next-line camelcase
        this.proxy_url = attachment.proxy_url;
        this.height = attachment.height || null;
        this.width = attachment.width || null;
    }
}
exports.MessageAttachment = MessageAttachment;
/* eslint-enable camelcase */
//# sourceMappingURL=MessageAttachment.js.map