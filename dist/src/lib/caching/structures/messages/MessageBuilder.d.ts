import { RequiredExcept, PartialRequired } from '@klasa/utils';
import { Embed } from '../Embed';
import type { File, RequestOptions } from '@klasa/rest';
import type { APIEmbedData } from '@klasa/dapi-types';
export interface MessageData {
    content?: string | null;
    embed?: APIEmbedData | null;
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
export declare class MessageBuilder implements RequiredExcept<MessageOptions, 'auth' | 'query' | 'headers' | 'reason'> {
    /**
     * The Message data to send to the api
     */
    data: PartialRequired<MessageData, 'allowed_mentions'>;
    /**
     * The files to send to the api
     */
    files: File[];
    /**
     * @param messageOptions The options to create this
     */
    constructor({ data, files }?: MessageOptions);
    /**
     * Sets content of this message
     * @param content The content to set
     */
    setContent(content?: string | null): this;
    /**
     * Sets the embed of this message
     * @param embed The embed to set
     */
    setEmbed(embed?: APIEmbedData | null): this;
    setEmbed(embed?: (embed: Embed) => Embed): this;
    /**
     * Sets the nonce of this message
     * @param nonce The nonce to set
     */
    setNonce(nonce?: number | string): this;
    /**
     * Sets if this message should be tts
     * @param tts The tts of this message
     */
    setTTS(tts: boolean): this;
    /**
     * Allows Everyone and Here mentions to ping
     */
    parseEveryone(): this;
    /**
     * Allows User mentions to ping
     */
    parseUsers(): this;
    /**
     * Allows Role mentions to ping
     */
    parseRoles(): this;
    /**
     * Allows a set of users to be mentioned in a message (do not use with parseUsers())
     * @param ids user ids you want to mention
     */
    addUserMentions(...ids: string[]): this;
    /**
     * Allows a set of roles to be mentioned in a message (do not use with parseRoles())
     * @param ids role ids you want to mention
     */
    addRoleMentions(...ids: string[]): this;
    /**
     * Adds a message attachment to this message
     * @param file The attachment
     */
    addFile(file: File): this;
    /**
     * Splices a message attachment to this message
     * @param index The index to splice at
     * @param deleteCount The number of attachments to delete
     * @param file The attachment to add
     */
    spliceFile(index: number, deleteCount: number, file?: File): this;
    /**
     * Splits this into multiple messages.
     * @param options Options to split the message by.
     */
    split(options?: SplitOptions): RequestOptions[];
    /**
     * Internal shared method to split the content by.
     * @param param0 Options to split the content.
     */
    protected _split({ maxLength, char, prepend, append }?: SplitOptions): string[];
}
