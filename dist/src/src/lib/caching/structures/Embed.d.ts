import type { APIEmbedAuthorData, APIEmbedData, APIEmbedFieldData, APIEmbedFooterData, APIEmbedImageData, APIEmbedProviderData, APIEmbedVideoData, EmbedType } from '@klasa/dapi-types';
export interface StringResolvable {
    toString(): string;
}
/**
 * Handles Embed creation and received embeds
 */
export declare class Embed implements APIEmbedData {
    /**
     * Embed Fields.
     * @since 0.0.1
     */
    fields: APIEmbedFieldData[];
    /**
     * The type of embed.
     * @since 0.0.1
     */
    type?: EmbedType;
    /**
     * The embed title.
     * @since 0.0.1
     */
    title?: string;
    /**
     * The embed description.
     * @since 0.0.1
     */
    description?: string;
    /**
     * The embed url.
     * @since 0.0.1
     */
    url?: string;
    /**
     * The embed bar color.
     * @since 0.0.1
     */
    color?: number;
    /**
     * The timestamp of the embed.
     * @since 0.0.1
     */
    timestamp?: string;
    /**
     * The embed thumbnail data.
     * @since 0.0.1
     */
    thumbnail?: APIEmbedImageData;
    /**
     * The embed image data.
     * @since 0.0.1
     */
    image?: APIEmbedImageData;
    /**
     * Received video data.
     * @since 0.0.1
     */
    video?: APIEmbedVideoData;
    /**
     * The embed author data.
     * @since 0.0.1
     */
    author?: APIEmbedAuthorData;
    /**
     * Received data about the embed provider.
     * @since 0.0.1
     */
    provider?: APIEmbedProviderData;
    /**
     * The embed footer data.
     * @since 0.0.1
     */
    footer?: APIEmbedFooterData;
    constructor(data?: APIEmbedData);
    /**
     * JS Date of the embed timestamp
     */
    get createdAt(): Date | null;
    /**
     * The color as hex
     */
    get hexColor(): string | null;
    /**
     * Adds a field to the embed
     * @param name The field name
     * @param value The field value
     * @param inline If the field should be inline with other fields
     */
    addField(name: StringResolvable, value: StringResolvable, inline?: boolean): this;
    /**
     * Adds a blank field to the embed
     * @param inline If the field should be inline with other fields
     */
    addBlankField(inline?: boolean): this;
    /**
     * Deletes and/or inserts fields by index in the embed
     * @param index The index to start at
     * @param deleteCount How many fields to delete
     * @param name The field name to insert
     * @param value The field value to insert
     * @param inline If the inserted field is inline
     */
    spliceField(index: number, deleteCount: number, name?: StringResolvable, value?: StringResolvable, inline?: boolean): this;
    /**
     * Sets the author with new data
     * @param name The author's name
     * @param iconURL The icon url for the author
     * @param url The url for clicking on the author
     */
    setAuthor(name?: StringResolvable, iconURL?: StringResolvable, url?: StringResolvable): this;
    /**
     * Updates existing author data fields
     * @param data The fields you want to update
     */
    updateAuthor(data: APIEmbedAuthorData): this;
    /**
     * Sets the color of the embed bar
     * @param color The color to set the bar
     */
    setColor(color?: number): this;
    /**
     * Sets the footer to new data
     * @param text The footer text
     * @param iconURL The url for the footer icon
     */
    setFooter(text?: StringResolvable, iconURL?: StringResolvable): this;
    /**
     * Updates the footer to new data
     * @param data The fields you want to update
     */
    updateFooter(data: APIEmbedFooterData): this;
    /**
     * Sets the image url you would like
     * @param url The url of the image
     */
    setImage(url?: StringResolvable): this;
    /**
     * Updates the image data you would like
     * @param data The fields you want to update
     */
    updateImage(data: APIEmbedImageData): this;
    /**
     * Sets the image url you would like
     * @param url The url of the image
     */
    setThumbnail(url?: StringResolvable): this;
    /**
     * Updates the image data you would like
     * @param data The fields you want to update
     */
    updateThumbnail(data: APIEmbedImageData): this;
    /**
     * Sets the timestamp for the Embed
     * @param timestamp The timestamp you want to set
     */
    setTimestamp(timestamp?: number | Date): this;
    /**
     * Sets the timestamp to now
     */
    updateTimestamp(): this;
    /**
     * Sets the title of the embed
     * @param title The title you want
     */
    setTitle(title?: StringResolvable): this;
    /**
     * Sets the title of the embed
     * @param description The description you want
     */
    setDescription(description?: StringResolvable): this;
    /**
     * Sets the url of the embed
     * @param url The url to click on
     */
    setURL(url?: StringResolvable): this;
    /**
     * Checks for valid field input and resolves strings
     * @param name The name of the field
     * @param value The value of the field
     * @param inline Set the field to display inline
     */
    private static checkField;
}
