import { basename } from 'path';
import { Readable } from 'stream';
import { promises as fsp } from 'fs';
import fetch from 'node-fetch';
import { pathExists } from 'fs-nextra';
import { MessageAttachment } from './messages/MessageAttachment';

import type { File } from '@klasa/rest';

export class Attachment {

	/**
	 * The name of the Attachment
	 */
	public name?: string;

	/**
	 * The unresolved file to send to the api
	 */
	public file?: string | Readable | Buffer | MessageAttachment;

	public constructor(attachment: Partial<Attachment> = {}) {
		this.name = attachment.name;
		this.file = attachment.file;
	}

	/**
	 * Allows you to set the name of the attachment
	 * @param name The name of the Attachment
	 */
	public setName(name: string): this {
		this.name = name;
		return this;
	}

	/**
	 * Allows you to set the file of the attachment
	 * @param file The unresolved file to send to the api
	 */
	public setFile(file: string | Readable | Buffer | MessageAttachment): this {
		this.file = file;
		return this;
	}

	/**
	 * Resolves a stream, url, file location, or text into a buffer we can send to the api
	 */
	public async resolve(): Promise<File> {
		if (!this.file) throw new Error('Cannot resolve a FileAttachment that doesn\'t include a file');

		if (this.file instanceof Readable) {
			this.name = this.name || 'file.dat';
			const buffers = [];
			for await (const buffer of this.file) buffers.push(buffer);
			this.file = Buffer.concat(buffers);
		} else if (Buffer.isBuffer(this.file)) {
			this.name = this.name || 'file.txt';
		} else if (this.file instanceof MessageAttachment) {
			this.name = this.file.filename;
			this.file = await (await fetch(this.file.url)).buffer();
		} else if (/^https?:\/\//.test(this.file)) {
			this.name = this.name || basename(this.file);
			this.file = await (await fetch(this.file)).buffer();
		} else if (await pathExists(this.file)) {
			this.name = this.name || basename(this.file);
			this.file = await fsp.readFile(this.file);
		} else {
			this.name = this.name || 'file.txt';
			this.file = Buffer.from(this.file);
		}

		return this as File;
	}

}
