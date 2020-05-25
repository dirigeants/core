"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveImageToBase64 = exports.resolveImageBuffer = exports.imageToBase64 = exports.getImageType = void 0;
const node_fetch_1 = require("node-fetch");
const stream_1 = require("stream");
const fs_nextra_1 = require("fs-nextra");
const fs_1 = require("fs");
const MessageAttachment_1 = require("../caching/structures/messages/MessageAttachment");
/**
 * @param buffer The buffer the sniff the magic numbers from.
 * @see https://en.wikipedia.org/wiki/GIF
 * @private
 */
function isGif(buffer) {
    // 0x47 0x49 0x46 0x38 0x39 0x61
    return buffer.length > 6 &&
        buffer[0] === 0x47 &&
        buffer[1] === 0x49 &&
        buffer[2] === 0x46 &&
        buffer[3] === 0x38 &&
        buffer[4] === 0x39 &&
        buffer[5] === 0x61;
}
/**
 * @param buffer The buffer the sniff the magic numbers from.
 * @see https://en.wikipedia.org/wiki/JPEG
 * @private
 */
function isJpeg(buffer) {
    // 0xFF 0xD8 0xFF
    return buffer.length > 3 &&
        buffer[0] === 0xFF &&
        buffer[1] === 0xD8 &&
        buffer[2] === 0xFF;
}
/**
 * @param buffer The buffer the sniff the magic numbers from.
 * @see https://en.wikipedia.org/wiki/Portable_Network_Graphics
 * @private
 */
function isPng(buffer) {
    // 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A
    return buffer.length > 8 &&
        buffer[0] === 0x89 &&
        buffer[1] === 0x50 &&
        buffer[2] === 0x4E &&
        buffer[3] === 0x47 &&
        buffer[4] === 0x0D &&
        buffer[5] === 0x0A &&
        buffer[6] === 0x1A &&
        buffer[7] === 0x0A;
}
/**
 * @param buffer The buffer the sniff the magic numbers from.
 * @see https://en.wikipedia.org/wiki/WebP
 * @private
 */
function isWebp(buffer) {
    // 0x52 0x49 0x46 0x46 0x__ 0x__ 0x__ 0x__ 0x57 0x45 0x42 0x50
    return buffer.length > 12 &&
        buffer[0] === 0x52 &&
        buffer[1] === 0x49 &&
        buffer[2] === 0x46 &&
        buffer[3] === 0x46 &&
        buffer[8] === 0x57 &&
        buffer[9] === 0x45 &&
        buffer[10] === 0x42 &&
        buffer[11] === 0x50;
}
/**
 * Determines whether or not a buffer corresponds to a GIF, JPG/JPEG, PNG, or WebP.
 * @since 0.0.1
 * @param buffer The buffer to sniff the magic numbers from.
 */
function getImageType(buffer) {
    if (isGif(buffer))
        return "image/gif" /* GIF */;
    if (isJpeg(buffer))
        return "image/jpeg" /* JPEG */;
    if (isPng(buffer))
        return "image/png" /* PNG */;
    if (isWebp(buffer))
        return "image/webp" /* WEBP */;
    return null;
}
exports.getImageType = getImageType;
/**
 * Determines the image's file type based on its contents and provides a base 64 string.
 * @since 0.0.1
 * @param buffer The buffer to sniff and stringify into a Base 64 string.
 * @param fallback The default image type to fall back to.
 */
function imageToBase64(buffer, fallback = "image/jpeg" /* JPEG */) {
    var _a;
    return `data:${(_a = getImageType(buffer)) !== null && _a !== void 0 ? _a : fallback};base64,${buffer.toString('base64')}`;
}
exports.imageToBase64 = imageToBase64;
/**
 * Converts a stream, buffer, message attachment, url, or filepath to a buffer.
 * @since 0.0.1
 * @param data The data to resolve into a buffer.
 */
async function resolveImageBuffer(data) {
    if (data instanceof stream_1.Readable) {
        const buffers = [];
        for await (const buffer of data)
            buffers.push(buffer);
        return Buffer.concat(buffers);
    }
    if (Buffer.isBuffer(data))
        return data;
    if (data instanceof MessageAttachment_1.MessageAttachment)
        return (await node_fetch_1.default(data.url)).buffer();
    if (/^https?:\/\//.test(data))
        return (await node_fetch_1.default(data)).buffer();
    if (await fs_nextra_1.pathExists(data))
        return fs_1.promises.readFile(data);
    return Buffer.from(data);
}
exports.resolveImageBuffer = resolveImageBuffer;
/**
 * Determines the image's file type based on its contents and provides a base 64 string.
 * @since 0.0.1
 * @param data The data to resolve into a Base 64 string.
 * @param fallback The default image type to fall back to.
 */
async function resolveImageToBase64(data, fallback) {
    const resolved = await resolveImageBuffer(data);
    return imageToBase64(resolved, fallback);
}
exports.resolveImageToBase64 = resolveImageToBase64;
//# sourceMappingURL=ImageUtil.js.map