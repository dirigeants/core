import type { APIMessageAttachmentData } from '@klasa/dapi-types';

/**
 * @see https://discord.com/developers/docs/resources/channel#attachment-object
 */
export class MessageAttachment implements APIMessageAttachmentData {

	/**
	 * Attachment id.
	 * @since 0.0.1
	 */
	public readonly id: string;

	/**
	 * Name of file attached.
	 * @since 0.0.1
	 */
	public filename: string;

	/**
	 * Size of file in bytes.
	 * @since 0.0.1
	 */
	public size: number;

	/**
	 * Source url of file.
	 * @since 0.0.1
	 */
	public url: string;

	/**
	 * A proxied url of file.
	 * @since 0.0.1
	 */
	public proxy_url: string;

	/**
	 * Height of file (if image).
	 * @since 0.0.1
	 */
	public height: number | null;

	/**
	 * Width of file (if image).
	 * @since 0.0.1
	 */
	public width: number | null;

	public constructor(attachment: APIMessageAttachmentData) {
		this.id = attachment.id;

		this.filename = attachment.filename;

		this.size = attachment.size;

		this.url = attachment.url;

		// eslint-disable-next-line @typescript-eslint/camelcase
		this.proxy_url = attachment.proxy_url;

		this.height = attachment.height || null;

		this.width = attachment.width || null;
	}

}
