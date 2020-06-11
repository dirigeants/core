import type { APIMessageAttachmentData } from '@klasa/dapi-types';
/**
 * @see https://discord.com/developers/docs/resources/channel#attachment-object
 */
export declare class MessageAttachment implements APIMessageAttachmentData {
    /**
     * Attachment id.
     * @since 0.0.1
     */
    readonly id: string;
    /**
     * Name of file attached.
     * @since 0.0.1
     */
    filename: string;
    /**
     * Size of file in bytes.
     * @since 0.0.1
     */
    size: number;
    /**
     * Source url of file.
     * @since 0.0.1
     */
    url: string;
    /**
     * A proxied url of file.
     * @since 0.0.1
     */
    proxy_url: string;
    /**
     * Height of file (if image).
     * @since 0.0.1
     */
    height: number | null;
    /**
     * Width of file (if image).
     * @since 0.0.1
     */
    width: number | null;
    constructor(attachment: APIMessageAttachmentData);
}
