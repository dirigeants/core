import type { File, RequestOptions } from '@klasa/rest';

import { MessageBuilder } from './MessageBuilder';

import type { APIEmbedData } from '../../../../util/types/DiscordAPI';

export interface WebhookMessageData {
	content?: string;
	embeds?: APIEmbedData[];
	nonce?: string;
	tts?: boolean;
	username?: string;
	avatar_url?: string;
}

export interface WebhookMessageOptions extends RequestOptions {
	data?: WebhookMessageData;
}

export class WebhookMessageBuilder extends MessageBuilder implements WebhookMessageOptions {

	/**
	 * The Webhook Message data to send to the api
	 */
	public data: WebhookMessageData;

	/**
	 * The files to send to the api
	 */
	public files: File[];

	/**
	 * Webhook messages don't use auth
	 */
	public auth = false;

	/**
	 * @param webhookMessageOptions The options to create this
	 */
	public constructor({ data = {}, files = [] }: WebhookMessageOptions = {}) {
		super();
		this.data = data;
		this.files = files;
	}

	/**
	 * WebhookMessages have multiple embeds, use the addEmbed or spliceEmbed methods instead.
	 */
	public setEmbed(): never {
		throw new Error('WebhookMessages have multiple embeds, use the addEmbed or spliceEmbed methods instead.');
	}

	/**
	 * Adds an embed to this webhook message
	 * @param embed The field name
	 */
	public addEmbed(embed: APIEmbedData): this {
		if (!this.data.embeds) this.data.embeds = [];
		this.data.embeds.push(embed);
		return this;
	}

	/**
	 * Deletes and/or inserts embeds by index in the webhook message
	 * @param index The index to start at
	 * @param deleteCount How many fields to delete
	 * @param embed The field name to insert
	 */
	public spliceEmbed(index: number, deleteCount: number, embed?: APIEmbedData): this {
		if (!this.data.embeds) this.data.embeds = [];
		if (embed) this.data.embeds.splice(index, deleteCount, embed);
		else this.data.embeds.splice(index, deleteCount);
		return this;
	}

	/**
	 * Sets the username of the webhook message
	 * @param username The username of the webhook message
	 */
	public setUsername(username?: string): this {
		this.data.username = username;
		return this;
	}

	/**
	 * Sets the avatar of the webhook message
	 * @param avatar The avatar for the webhook message
	 */
	public setAvatar(avatar?: string): this {
		// eslint-disable-next-line @typescript-eslint/camelcase
		this.data.avatar_url = avatar;
		return this;
	}

}