"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildEmojiStore = void 0;
/* eslint-disable no-dupe-class-members */
const rest_1 = require("@klasa/rest");
const DataStore_1 = require("./base/DataStore");
const Extender_1 = require("../../util/Extender");
const ImageUtil_1 = require("../../util/ImageUtil");
/**
 * The store for {@link GuildEmoji guild emojis}.
 * @since 0.0.1
 */
class GuildEmojiStore extends DataStore_1.DataStore {
    /**
     * Builds the store.
     * @since 0.0.1
     * @param client The {@link Client client} this store belongs to.
     */
    constructor(client, guild) {
        super(client, Extender_1.extender.get('GuildEmoji'), client.options.cache.limits.emojis);
        this.guild = guild;
    }
    /**
     * Creates a new emoji into the {@link Guild guild} and returns it.
     * @since 0.0.1
     * @param data The settings for the new emoji.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/emoji#create-guild-emoji
     */
    async add({ image, ...options }, requestOptions = {}) {
        const data = {
            image: await ImageUtil_1.resolveImageToBase64(image),
            ...options
        };
        const entry = await this.client.api.post(rest_1.Routes.guildEmojis(this.guild.id), { ...requestOptions, data });
        return this._add(entry);
    }
    /**
     * Deletes an emoji from the {@link Guild guild}.
     * @since 0.0.1
     * @param emojiID The {@link GuildEmoji guild emoji} ID.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/emoji#create-guild-emoji
     */
    async remove(emojiID, requestOptions = {}) {
        await this.client.api.post(rest_1.Routes.guildEmoji(this.guild.id, emojiID), requestOptions);
        return this;
    }
    async fetch(emoji) {
        if (emoji) {
            const entry = await this.client.api.get(rest_1.Routes.guildEmoji(this.guild.id, emoji));
            return this._add(entry);
        }
        const entries = await this.client.api.get(rest_1.Routes.guildEmojis(this.guild.id));
        for (const entry of entries)
            this._add(entry);
        return this;
    }
    /**
     * Adds a new structure to this DataStore
     * @param data The data packet to add
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    _add(data) {
        const existing = this.get(data.id);
        // eslint-disable-next-line dot-notation
        if (existing)
            return existing['_patch'](data);
        const entry = new this.Holds(this.client, data, this.guild);
        if (this.client.options.cache.enabled)
            this.set(entry.id, entry);
        return entry;
    }
}
exports.GuildEmojiStore = GuildEmojiStore;
//# sourceMappingURL=GuildEmojiStore.js.map