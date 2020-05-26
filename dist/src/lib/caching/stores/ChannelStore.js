"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelStore = void 0;
const rest_1 = require("@klasa/rest");
const Channel_1 = require("../structures/channels/Channel");
const DataStore_1 = require("./base/DataStore");
const Extender_1 = require("../../util/Extender");
/**
 * The store for {@link GuildBasedChannel guild based channels}.
 * @since 0.0.1
 */
class ChannelStore extends DataStore_1.DataStore {
    /**
     * Builds the store.
     * @since 0.0.1
     * @param client The {@link Client client} this store belongs to.
     * @param guild The {@link Guild guild} this store belongs to.
     */
    constructor(client) {
        super(client, Extender_1.extender.get('Channel'), client.options.cache.limits.channels);
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
        const newChannel = Channel_1.Channel.create(this.client, channel);
        newChannel.deleted = true;
        return newChannel;
    }
    /**
     * Returns the list of channels as updated from Discord.
     * @param id The id for the channel you want to fetch
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/channel#get-channel
     */
    async fetch(id) {
        const existing = this.get(id);
        if (existing)
            return existing;
        const rawChannel = await this.client.api.get(rest_1.Routes.channel(id));
        const channel = this._add(rawChannel);
        return channel;
    }
    /**
     * Adds a new structure to this DataStore
     * @param data The data packet to add
     */
    _add(data, guild) {
        let entry;
        // eslint-disable-next-line dot-notation
        if (guild)
            entry = guild.channels['_add'](data);
        // eslint-disable-next-line dot-notation, @typescript-eslint/no-non-null-assertion
        else if (data.guild_id)
            entry = this.client.guilds.get(data.guild_id).channels['_add'](data);
        // eslint-disable-next-line dot-notation
        else
            entry = this.client.dms['_add'](data);
        if (this.client.options.cache.enabled)
            this.set(entry.id, entry);
        return entry;
    }
}
exports.ChannelStore = ChannelStore;
//# sourceMappingURL=ChannelStore.js.map