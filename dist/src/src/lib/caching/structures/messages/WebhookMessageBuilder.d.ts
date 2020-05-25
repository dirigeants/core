import { RequiredExcept, PartialRequired } from '@klasa/utils';
import type { File, RequestOptions } from '@klasa/rest';
import type { APIEmbedData } from '@klasa/dapi-types';
import { MessageBuilder, AllowedMentions } from './MessageBuilder';
import { Embed } from '../Embed';
export interface WebhookMessageData {
    content?: string;
    embeds?: APIEmbedData[];
    nonce?: string;
    tts?: boolean;
    username?: string;
    avatar_url?: string;
    allowed_mentions?: Required<AllowedMentions>;
}
export interface WebhookMessageOptions extends RequestOptions {
    data?: WebhookMessageData;
}
export declare class WebhookMessageBuilder extends MessageBuilder implements RequiredExcept<WebhookMessageOptions, 'auth' | 'query' | 'headers' | 'reason'> {
    /**
     * The Webhook Message data to send to the api
     */
    data: PartialRequired<WebhookMessageData, 'allowed_mentions'>;
    /**
     * The files to send to the api
     */
    files: File[];
    /**
     * Webhook messages don't use auth
     */
    auth: boolean;
    /**
     * @param webhookMessageOptions The options to create this
     */
    constructor({ data, files }?: WebhookMessageOptions);
    /**
     * WebhookMessages have multiple embeds, use the addEmbed or spliceEmbed methods instead.
     */
    setEmbed(): never;
    /**
     * Adds an embed to this webhook message
     * @param embed The field name
     */
    addEmbed(embed: APIEmbedData): this;
    addEmbed(embed: (embed: Embed) => Embed): this;
    /**
     * Deletes and/or inserts embeds by index in the webhook message
     * @param index The index to start at
     * @param deleteCount How many fields to delete
     * @param embed The field name to insert
     */
    spliceEmbed(index: number, deleteCount: number, embed?: APIEmbedData): this;
    spliceEmbed(index: number, deleteCount: number, embed?: (embed: Embed) => Embed): this;
    /**
     * Sets the username of the webhook message
     * @param username The username of the webhook message
     */
    setUsername(username?: string): this;
    /**
     * Sets the avatar of the webhook message
     * @param avatar The avatar for the webhook message
     */
    setAvatar(avatar?: string): this;
}
