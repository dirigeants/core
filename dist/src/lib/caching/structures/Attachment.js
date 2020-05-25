"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attachment = void 0;
const path_1 = require("path");
const stream_1 = require("stream");
const fs_1 = require("fs");
const node_fetch_1 = require("node-fetch");
const fs_nextra_1 = require("fs-nextra");
const MessageAttachment_1 = require("./messages/MessageAttachment");
class Attachment {
    constructor(attachment = {}) {
        this.name = attachment.name;
        this.file = attachment.file;
    }
    /**
     * Allows you to set the name of the attachment
     * @param name The name of the Attachment
     */
    setName(name) {
        this.name = name;
        return this;
    }
    /**
     * Allows you to set the file of the attachment
     * @param file The unresolved file to send to the api
     */
    setFile(file) {
        this.file = file;
        return this;
    }
    /**
     * Resolves a stream, url, file location, or text into a buffer we can send to the api
     */
    async resolve() {
        if (!this.file)
            throw new Error('Cannot resolve a FileAttachment that doesn\'t include a file');
        if (this.file instanceof stream_1.Readable) {
            this.name = this.name || 'file.dat';
            const buffers = [];
            for await (const buffer of this.file)
                buffers.push(buffer);
            this.file = Buffer.concat(buffers);
        }
        else if (Buffer.isBuffer(this.file)) {
            this.name = this.name || 'file.txt';
        }
        else if (this.file instanceof MessageAttachment_1.MessageAttachment) {
            this.name = this.file.filename;
            this.file = await (await node_fetch_1.default(this.file.url)).buffer();
        }
        else if (/^https?:\/\//.test(this.file)) {
            this.name = this.name || path_1.basename(this.file);
            this.file = await (await node_fetch_1.default(this.file)).buffer();
        }
        else if (await fs_nextra_1.pathExists(this.file)) {
            this.name = this.name || path_1.basename(this.file);
            this.file = await fs_1.promises.readFile(this.file);
        }
        else {
            this.name = this.name || 'file.txt';
            this.file = Buffer.from(this.file);
        }
        return this;
    }
}
exports.Attachment = Attachment;
//# sourceMappingURL=Attachment.js.map