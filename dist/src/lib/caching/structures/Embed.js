"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Embed = void 0;
const utils_1 = require("@klasa/utils");
/**
 * Handles Embed creation and received embeds
 */
class Embed {
    constructor(data = {}) {
        this.type = data.type;
        this.title = data.title;
        this.description = data.description;
        this.url = data.url;
        this.color = data.color;
        this.timestamp = data.timestamp ? new Date(data.timestamp).toISOString() : undefined;
        this.fields = data.fields ? data.fields.map(utils_1.deepClone) : [];
        this.thumbnail = data.thumbnail ? {
            url: data.thumbnail.url,
            // eslint-disable-next-line @typescript-eslint/camelcase
            proxy_url: data.thumbnail.proxy_url,
            height: data.thumbnail.height,
            width: data.thumbnail.width
        } : undefined;
        this.image = data.image ? {
            url: data.image.url,
            // eslint-disable-next-line @typescript-eslint/camelcase
            proxy_url: data.image.proxy_url,
            height: data.image.height,
            width: data.image.width
        } : undefined;
        this.video = data.video ? {
            url: data.video.url,
            height: data.video.height,
            width: data.video.width
        } : undefined;
        this.author = data.author ? {
            name: data.author.name,
            url: data.author.url,
            // eslint-disable-next-line @typescript-eslint/camelcase
            icon_url: data.author.icon_url,
            // eslint-disable-next-line @typescript-eslint/camelcase
            proxy_icon_url: data.author.proxy_icon_url
        } : undefined;
        this.provider = data.provider;
        this.footer = data.footer ? {
            text: data.footer.text,
            // eslint-disable-next-line @typescript-eslint/camelcase
            icon_url: data.footer.icon_url,
            // eslint-disable-next-line @typescript-eslint/camelcase
            proxy_icon_url: data.footer.proxy_icon_url
        } : undefined;
    }
    /**
     * JS Date of the embed timestamp
     */
    get createdAt() {
        return this.timestamp ? new Date(this.timestamp) : null;
    }
    /**
     * The color as hex
     */
    get hexColor() {
        return this.color ? `#${this.color.toString(16).padStart(6, '0')}` : null;
    }
    /**
     * Adds a field to the embed
     * @param name The field name
     * @param value The field value
     * @param inline If the field should be inline with other fields
     */
    addField(name, value, inline) {
        this.fields.push(Embed.checkField(name, value, inline));
        return this;
    }
    /**
     * Adds a blank field to the embed
     * @param inline If the field should be inline with other fields
     */
    addBlankField(inline) {
        return this.addField('\u200B', '\u200B', inline);
    }
    /**
     * Deletes and/or inserts fields by index in the embed
     * @param index The index to start at
     * @param deleteCount How many fields to delete
     * @param name The field name to insert
     * @param value The field value to insert
     * @param inline If the inserted field is inline
     */
    spliceField(index, deleteCount, name, value, inline) {
        if (name && value)
            this.fields.splice(index, deleteCount, Embed.checkField(name, value, inline));
        else
            this.fields.splice(index, deleteCount);
        return this;
    }
    /**
     * Sets the author with new data
     * @param name The author's name
     * @param iconURL The icon url for the author
     * @param url The url for clicking on the author
     */
    setAuthor(name, iconURL, url) {
        const icon = iconURL === undefined ? undefined : String(iconURL);
        const link = url === undefined ? undefined : String(url);
        // eslint-disable-next-line @typescript-eslint/camelcase
        this.author = name === undefined ? undefined : { name: String(name), icon_url: icon, url: link };
        return this;
    }
    /**
     * Updates existing author data fields
     * @param data The fields you want to update
     */
    updateAuthor(data) {
        this.author = { ...this.author, ...data };
        return this;
    }
    /**
     * Sets the color of the embed bar
     * @param color The color to set the bar
     */
    setColor(color) {
        this.color = color;
        return this;
    }
    /**
     * Sets the footer to new data
     * @param text The footer text
     * @param iconURL The url for the footer icon
     */
    setFooter(text, iconURL) {
        const icon = iconURL === undefined ? undefined : String(iconURL);
        // eslint-disable-next-line @typescript-eslint/camelcase
        this.footer = text === undefined ? undefined : { text: String(text), icon_url: icon };
        return this;
    }
    /**
     * Updates the footer to new data
     * @param data The fields you want to update
     */
    updateFooter(data) {
        this.footer = { ...this.footer, ...data };
        return this;
    }
    /**
     * Sets the image url you would like
     * @param url The url of the image
     */
    setImage(url) {
        this.image = url === undefined ? undefined : { url: String(url) };
        return this;
    }
    /**
     * Updates the image data you would like
     * @param data The fields you want to update
     */
    updateImage(data) {
        this.image = { ...this.image, ...data };
        return this;
    }
    /**
     * Sets the image url you would like
     * @param url The url of the image
     */
    setThumbnail(url) {
        this.thumbnail = url === undefined ? undefined : { url: String(url) };
        return this;
    }
    /**
     * Updates the image data you would like
     * @param data The fields you want to update
     */
    updateThumbnail(data) {
        this.thumbnail = { ...this.thumbnail, ...data };
        return this;
    }
    /**
     * Sets the timestamp for the Embed
     * @param timestamp The timestamp you want to set
     */
    setTimestamp(timestamp) {
        this.timestamp = timestamp === undefined ? undefined : new Date(timestamp).toISOString();
        return this;
    }
    /**
     * Sets the timestamp to now
     */
    updateTimestamp() {
        this.timestamp = new Date().toISOString();
        return this;
    }
    /**
     * Sets the title of the embed
     * @param title The title you want
     */
    setTitle(title) {
        this.title = title === undefined ? undefined : String(title);
        return this;
    }
    /**
     * Sets the title of the embed
     * @param description The description you want
     */
    setDescription(description) {
        this.description = description === undefined ? undefined : String(description);
        return this;
    }
    /**
     * Sets the url of the embed
     * @param url The url to click on
     */
    setURL(url) {
        this.url = url === undefined ? undefined : String(url);
        return this;
    }
    /**
     * Checks for valid field input and resolves strings
     * @param name The name of the field
     * @param value The value of the field
     * @param inline Set the field to display inline
     */
    static checkField(name, value, inline = false) {
        name = String(name);
        if (typeof name !== 'string')
            throw new TypeError(`Embed field name must be a string or have a toString() method, received: ${typeof name}`);
        value = String(value);
        if (typeof value !== 'string')
            throw new TypeError(`Embed field value must be a string or have a toString() method: ${typeof value}`);
        return { name, value, inline };
    }
}
exports.Embed = Embed;
//# sourceMappingURL=Embed.js.map