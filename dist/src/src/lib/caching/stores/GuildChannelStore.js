"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildChannelStore = void 0;
const rest_1 = require("@klasa/rest");
const Channel_1 = require("../structures/channels/Channel");
const DataStore_1 = require("./base/DataStore");
const Extender_1 = require("../../util/Extender");
/**
 * The store for {@link GuildBasedChannel guild based channels}.
 * @since 0.0.1
 */
class GuildChannelStore extends DataStore_1.DataStore {
    /**
     * Builds the store.
     * @since 0.0.1
     * @param client The {@link Client client} this store belongs to.
     * @param guild The {@link Guild guild} this store belongs to.
     */
    constructor(client, guild) {
        super(client, Extender_1.extender.get('GuildChannel'), client.options.cache.limits.channels);
        this.guild = guild;
    }
    /**
     * Create a new channel for the {@link Guild guild}.
     * @since 0.0.1
     * @param data The channel settings.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#create-guild-channel
     */
    async add(data, requestOptions = {}) {
        const channel = await this.client.api.post(rest_1.Routes.guildChannels(this.guild.id), { ...requestOptions, data });
        return this._add(channel);
    }
    /**
     * Removes a channel from the {@link Guild guild}.
     * @since 0.0.1
     * @param channelID The channel to remove.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/channel#deleteclose-channel
     */
    async remove(channelID, requestOptions = {}) {
        const channel = await this.client.api.delete(rest_1.Routes.channel(channelID), requestOptions);
        const newChannel = Channel_1.Channel.create(this.client, channel, this.guild);
        newChannel.deleted = true;
        return newChannel;
    }
    /**
     * Modifies the positions of the channels.
     * @since 0.0.1
     * @param data The set of channels and their positions for the {@link Guild guild}.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions
     */
    async modifyPositions(data, requestOptions = {}) {
        await this.client.api.patch(rest_1.Routes.guildChannels(this.guild.id), { ...requestOptions, data });
        return this;
    }
    /**
     * Returns the list of channels as updated from Discord.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#get-guild-channels
     */
    async fetch() {
        const channels = await this.client.api.get(rest_1.Routes.guildChannels(this.guild.id));
        for (const channel of channels)
            this._add(channel);
        return this;
    }
    /**
     * Adds a new structure to this DataStore
     * @param data The data packet to add
     */
    _add(data) {
        // You might ask... Why?!? Well, turns out that despite of ALL channels that make part of the GuildBasedChannel
        // union having a _patch method, TypeScript is just unable to retrieve their properties. So yeah, we need this.
        const existing = this.get(data.id);
        // eslint-disable-next-line dot-notation
        if (existing)
            return existing['_patch'](data);
        const entry = Channel_1.Channel.create(this.client, data, this.guild);
        if (this.client.options.cache.enabled)
            this.set(entry.id, entry);
        return entry;
    }
}
exports.GuildChannelStore = GuildChannelStore;
//# sourceMappingURL=GuildChannelStore.js.map