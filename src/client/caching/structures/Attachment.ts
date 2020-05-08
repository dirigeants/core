import { APIMessageAttachmentData } from '@klasa/dapi-types';
import { Stream } from 'stream';

export class Attachment implements APIMessageAttachmentData {

	public id: string;
	public filename: string;
	public size: number;
	public url: string;
	public proxy_url: string;
	public height: number | null;
	public width: number | null;
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

	setFile(file: string | Stream | Buffer): this {
		this.file = file;
		return this;
	}

	setName(name: string): this {
		this.filename = name;
		return this;
	}

}
