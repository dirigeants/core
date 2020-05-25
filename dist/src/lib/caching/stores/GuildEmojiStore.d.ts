import { RequestOptions } from '@klasa/rest';
import { DataStore } from './base/DataStore';
import { ImageBufferResolvable } from '../../util/ImageUtil';
import type { APIEmojiData } from '@klasa/dapi-types';
import type { Client } from '../../client/Client';
import type { GuildEmoji } from '../structures/guilds/GuildEmoji';
import type { Guild } from '../structures/guilds/Guild';
/**
 * The store for {@link GuildEmoji guild emojis}.
 * @since 0.0.1
 */
export declare class GuildEmojiStore extends DataStore<GuildEmoji> {
    /**
     * The {@link Guild guild} this store belongs to.
     * @since 0.0.1
     */
    readonly guild: Guild;
    /**
     * Builds the store.
     * @since 0.0.1
     * @param client The {@link Client client} this store belongs to.
     */
    constructor(client: Client, guild: Guild);
    /**
     * Creates a new emoji into the {@link Guild guild} and returns it.
     * @since 0.0.1
     * @param data The settings for the new emoji.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/emoji#create-guild-emoji
     */
    add({ image, ...options }: GuildEmojiStoreAddData, requestOptions?: RequestOptions): Promise<GuildEmoji>;
    /**
     * Deletes an emoji from the {@link Guild guild}.
     * @since 0.0.1
     * @param emojiID The {@link GuildEmoji guild emoji} ID.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/emoji#create-guild-emoji
     */
    remove(emojiID: string, requestOptions?: RequestOptions): Promise<this>;
    /**
     * Returns all the emojis for the guild.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/emoji#list-guild-emojis
     */
    fetch(): Promise<this>;
    /**
     * Returns an emoji given its identifier.
     * @since 0.0.1
     * @param emoji The {@link GuildEmoji guild emoji} to fetch.
     * @see https://discord.com/developers/docs/resources/emoji#get-guild-emoji
     */
    fetch(emoji: string): Promise<GuildEmoji>;
    /**
     * Adds a new structure to this DataStore
     * @param data The data packet to add
     */
    protected _add(data: APIEmojiData): GuildEmoji;
}
/**
 * The settings used for {@link GuildEmojiStore#add}.
 * @see https://discord.com/developers/docs/resources/emoji#create-guild-emoji-json-params
 */
export interface GuildEmojiStoreAddData {
    /**
     * The name of the emoji.
     */
    name: string;
    /**
     * The 128x128 emoji image.
     */
    image: ImageBufferResolvable;
    /**
     * The roles for which this emoji will be whitelisted.
     */
    roles?: readonly string[];
}
