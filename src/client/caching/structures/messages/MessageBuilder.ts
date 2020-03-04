import { basename } from 'path';
import { Readable } from 'stream';
import fetch from 'node-fetch';
import { readFile, pathExists } from 'fs-nextra';
import { mergeDefault } from '@klasa/utils';

import type { File, RequestOptions } from '@klasa/rest';
import type { APIEmbedData } from '../../../../util/types/DiscordAPI';

export interface MessageData {
	content?: string;
	embed?: APIEmbedData;
	nonce?: number | string;
	tts?: boolean;
	allowed_mentions?: AllowedMentions;
}

export interface AllowedMentions {
	parse?: ('users' | 'roles' | 'everyone')[];
	roles?: string[];
	users?: string[];
}

export interface MessageOptions extends RequestOptions {
	data?: MessageData;
}

export interface SplitOptions {
	maxLength?: number;
	char?: string;
	prepend?: string;
	append?: string;
}

export class MessageBuilder implements MessageOptions {

	/**
	 * The Message data to send to the api
	 */
	public data: MessageData;

	/**
	 * The files to send to the api
	 */
	public files: File[];

	/**
	 * @param messageOptions The options to create this
	 */
	public constructor({ data = {}, files = [] }: MessageOptions = {}) {
		this.data = data;
		// eslint-disable-next-line @typescript-eslint/camelcase
		this.data.allowed_mentions = mergeDefault({
			parse: [] as ('users' | 'roles' | 'everyone')[],
			roles: [] as string[],
			users: [] as string[]
		// eslint-disable-next-line @typescript-eslint/camelcase
		}, data.allowed_mentions) as Required<AllowedMentions>;
		this.files = files || [];
	}

	/**
	 * Sets content of this message
	 * @param content The content to set
	 */
	public setContent(content?: string): this {
		this.data.content = content;
		return this;
	}

	/**
	 * Sets the embed of this message
	 * @param embed The embed to set
	 */
	public setEmbed(embed?: APIEmbedData): this {
		this.data.embed = embed;
		return this;
	}

	/**
	 * Sets the nonce of this message
	 * @param nonce The nonce to set
	 */
	public setNonce(nonce?: number | string): this {
		this.data.nonce = nonce;
		return this;
	}

	/**
	 * Sets if this message should be tts
	 * @param tts The tts of this message
	 */
	public setTTS(tts: boolean): this {
		this.data.tts = tts;
		return this;
	}

	/**
	 * Allows Everyone and Here mentions to ping
	 */
	public parseEveryone(): this {
		// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-non-null-assertion
		this.data.allowed_mentions!.parse!.push('everyone');
		return this;
	}

	/**
	 * Allows User mentions to ping
	 */
	public parseUsers(): this {
		// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-non-null-assertion
		this.data.allowed_mentions!.parse!.push('users');
		return this;
	}

	/**
	 * Allows Role mentions to ping
	 */
	public parseRoles(): this {
		// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-non-null-assertion
		this.data.allowed_mentions!.parse!.push('roles');
		return this;
	}


	/**
	 * Allows a set of users to be mentioned in a message (do not use with parseUsers())
	 * @param ids user ids you want to mention
	 */
	public addUserMentions(...ids: string[]): this {
		// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-non-null-assertion
		this.data.allowed_mentions!.users!.push(...ids);
		return this;
	}


	/**
	 * Allows a set of roles to be mentioned in a message (do not use with parseRoles())
	 * @param ids role ids you want to mention
	 */
	public addRoleMentions(...ids: string[]): this {
		// eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-non-null-assertion
		this.data.allowed_mentions!.roles!.push(...ids);
		return this;
	}

	/**
	 * Adds a message attachment to this message
	 * @param file The attachment
	 */
	public addFile(file: File): this {
		this.files.push(file);
		return this;
	}

	/**
	 * Splices a message attachment to this message
	 * @param index The index to splice at
	 * @param deleteCount The number of attachments to delete
	 * @param file The attachment to add
	 */
	public spliceFile(index: number, deleteCount: number, file?: File): this {
		if (file) this.files.splice(index, deleteCount, file);
		else this.files.splice(index, deleteCount);
		return this;
	}

	/**
	 * Splits this into multiple messages
	 * @param param0 Options to split the message by
	 */
	public split({ maxLength = 2000, char = '\n', prepend = '', append = '' }: SplitOptions): RequestOptions[] {
		// If there isn't content, the message can't be split
		if (!this.data.content) return [this];

		const text = this.data.content;
		const splitText = text.length <= maxLength ? [text] : text.split(char);
		const messages = [];

		if (splitText.some(chunk => chunk.length > maxLength)) throw new RangeError('A split message chunk is too big');

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

	/**
	 * Resolves a stream, url, file location, or text into a buffer we can send to the api
	 * @param file A stream, url, file location, or text blob to send as an attachment
	 * @param name The name of the attachment
	 */
	public static async resolveFile(file: string | Readable | Buffer, name?: string): Promise<File> {
		let resolvedFile: Buffer;
		let resolvedName: string;

		if (file instanceof Readable) {
			const buffers = [];
			for await (const buffer of file) buffers.push(buffer);
			resolvedFile = Buffer.concat(buffers);
			resolvedName = name || 'file.dat';
		} else if (Buffer.isBuffer(file)) {
			resolvedFile = file;
			resolvedName = name || 'file.txt';
		} else if (/^https?:\/\//.test(file)) {
			resolvedFile = await (await fetch(file)).buffer();
			resolvedName = name || basename(file);
		} else if (await pathExists(file)) {
			resolvedFile = await readFile(file);
			resolvedName = name || basename(file);
		} else {
			resolvedFile = Buffer.from(file);
			resolvedName = name || 'file.txt';
		}

		return { file: resolvedFile, name: resolvedName };
	}

}
