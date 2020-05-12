import { APIMessageAttachmentData } from '@klasa/dapi-types';
import { Stream } from 'stream';

/**
 * @see https://discord.com/developers/docs/resources/channel#attachment-object
 */
export class Attachment implements APIMessageAttachmentData {

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

	/**
	 * The file data.
	 * @since 0.0.1
	 */
	public file?: Buffer | string | Stream | null;

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

	/**
	 * Sets a file source, used to send attachments to Discord.
	 * @since 0.0.1
	 * @param file The file data source
	 */
	setFile(file: string | Stream | Buffer): this {
		this.file = file;
		return this;
	}

	/**
	 * Sets a file name.
	 * @since 0.0.1
	 * @param name The name of file attached
	 */
	setName(name: string): this {
		this.filename = name;
		return this;
	}

}
