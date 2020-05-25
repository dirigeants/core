/// <reference types="node" />
import { Readable } from 'stream';
import { MessageAttachment } from '../caching/structures/messages/MessageAttachment';
export declare const enum ImageTypes {
    GIF = "image/gif",
    JPEG = "image/jpeg",
    PNG = "image/png",
    WEBP = "image/webp"
}
export declare type ImageBufferResolvable = Readable | Buffer | MessageAttachment | string;
/**
 * Determines whether or not a buffer corresponds to a GIF, JPG/JPEG, PNG, or WebP.
 * @since 0.0.1
 * @param buffer The buffer to sniff the magic numbers from.
 */
export declare function getImageType(buffer: Buffer): ImageTypes | null;
/**
 * Determines the image's file type based on its contents and provides a base 64 string.
 * @since 0.0.1
 * @param buffer The buffer to sniff and stringify into a Base 64 string.
 * @param fallback The default image type to fall back to.
 */
export declare function imageToBase64(buffer: Buffer, fallback?: ImageTypes): string;
/**
 * Converts a stream, buffer, message attachment, url, or filepath to a buffer.
 * @since 0.0.1
 * @param data The data to resolve into a buffer.
 */
export declare function resolveImageBuffer(data: ImageBufferResolvable): Promise<Buffer>;
/**
 * Determines the image's file type based on its contents and provides a base 64 string.
 * @since 0.0.1
 * @param data The data to resolve into a Base 64 string.
 * @param fallback The default image type to fall back to.
 */
export declare function resolveImageToBase64(data: ImageBufferResolvable, fallback?: ImageTypes): Promise<string>;
