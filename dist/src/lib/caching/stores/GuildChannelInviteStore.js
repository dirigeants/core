"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildChannelInviteStore = void 0;
const rest_1 = require("@klasa/rest");
const cache_1 = require("@klasa/cache");
/**
 * The store for {@link Invite guild invites} the channel has.
 * @since 0.0.3
 */
class GuildChannelInviteStore extends cache_1.ProxyCache {
    /**
     * Builds the store.
     * @since 0.0.3
     * @param channel The {@link GuildChannel guild channel} this store belongs to.
     */
    constructor(channel, keys) {
        super(channel.client.invites, keys);
        this.client = channel.client;
        this.channel = channel;
    }
    /**
     * Creates an invite to the channel.
     * @since 0.0.3
     * @param data The invite options
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/channel#create-channel-invite
     */
    async add(data, requestOptions = {}) {
        const entry = await this.client.api.post(rest_1.Routes.channelInvites(this.channel.id), { ...requestOptions, data });
        this.set(entry.code);
        // eslint-disable-next-line dot-notation
        return this.client.invites['_add'](entry);
    }
    /**
     * Deletes an invite given its code.
     * @since 0.0.3
     * @param code The {@link Invite#code invite code}.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/invite#delete-invite
     */
    async remove(code, requestOptions = {}) {
        await this.client.api.delete(rest_1.Routes.invite(code), requestOptions);
        return this;
    }
    /**
     * Returns a list of {@link Invite invite}s with their metadata.
     * @since 0.0.3
     * @see https://discord.com/developers/docs/resources/guild#get-guild-invites
     */
    async fetch() {
        const entries = await this.client.api.get(rest_1.Routes.channelInvites(this.channel.id));
        for (const entry of entries) {
            // eslint-disable-next-line dot-notation
            this.client.invites['_add'](entry);
            this.set(entry.code);
        }
        return this;
    }
}
exports.GuildChannelInviteStore = GuildChannelInviteStore;
//# sourceMappingURL=GuildChannelInviteStore.js.map