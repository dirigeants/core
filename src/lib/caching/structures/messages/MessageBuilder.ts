/* eslint-disable no-dupe-class-members */
import { mergeDefault } from '@klasa/utils';

import { Embed } from '../Embed';

import type { File, RequestOptions } from '@klasa/rest';
import type { APIEmbedData } from '@klasa/dapi-types';

import type { RequiredExcept, PartialRequired } from '../../../util/types/Util';

export interface MessageData {
	content?: string;
	embed?: APIEmbedData;
	nonce?: number | string;
	tts?: boolean;
	allowed_mentions?: Required<AllowedMentions>;
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

export class MessageBuilder implements RequiredExcept<MessageOptions, 'auth' | 'query' | 'headers' | 'reason'> {

	/**
	 * The Message data to send to the api
	 */
	public data: PartialRequired<MessageData, 'allowed_mentions'>;

	/**
	 * The files to send to the api
	 */
	public files: File[];

	/**
	 * @param messageOptions The options to create this
	 */
	public constructor({ data = {}, files = [] }: MessageOptions = {}) {
		const defaultedData = mergeDefault({
			// eslint-disable-next-line @typescript-eslint/camelcase
			allowed_mentions: {
				parse: [] as ('users' | 'roles' | 'everyone')[],
				roles: [] as string[],
				users: [] as string[]
			}
		} as PartialRequired<MessageData, 'allowed_mentions'>, data);

		this.data = defaultedData;
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
	public setEmbed(embed?: APIEmbedData): this
	public setEmbed(embed?: (embed: Embed) => Embed): this
	public setEmbed(embed?: APIEmbedData | ((embed: Embed) => Embed)): this {
		this.data.embed = typeof embed === 'function' ? embed(new Embed()) : embed;
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
		this.data.allowed_mentions.parse.push('everyone');
		return this;
	}

	/**
	 * Allows User mentions to ping
	 */
	public parseUsers(): this {
		this.data.allowed_mentions.parse.push('users');
		return this;
	}

	/**
	 * Allows Role mentions to ping
	 */
	public parseRoles(): this {
		this.data.allowed_mentions.parse.push('roles');
		return this;
	}


	/**
	 * Allows a set of users to be mentioned in a message (do not use with parseUsers())
	 * @param ids user ids you want to mention
	 */
	public addUserMentions(...ids: string[]): this {
		this.data.allowed_mentions.users.push(...ids);
		return this;
	}


	/**
	 * Allows a set of roles to be mentioned in a message (do not use with parseRoles())
	 * @param ids role ids you want to mention
	 */
	public addRoleMentions(...ids: string[]): this {
		this.data.allowed_mentions.roles.push(...ids);
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
	public split({ maxLength = 2000, char = '\n', prepend = '', append = '' }: SplitOptions = {}): RequestOptions[] {
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

}
