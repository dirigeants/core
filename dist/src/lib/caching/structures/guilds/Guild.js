"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guild = void 0;
/* eslint-disable no-dupe-class-members */
const url_1 = require("url");
const rest_1 = require("@klasa/rest");
const BanStore_1 = require("../../stores/BanStore");
const GuildChannelStore_1 = require("../../stores/GuildChannelStore");
const GuildEmojiStore_1 = require("../../stores/GuildEmojiStore");
const GuildInviteStore_1 = require("../../stores/GuildInviteStore");
const GuildMemberStore_1 = require("../../stores/GuildMemberStore");
const GuildWidget_1 = require("./GuildWidget");
const IntegrationStore_1 = require("../../stores/IntegrationStore");
const Util_1 = require("../../../util/Util");
const PresenceStore_1 = require("../../stores/PresenceStore");
const RoleStore_1 = require("../../stores/RoleStore");
const Structure_1 = require("../base/Structure");
const VoiceStateStore_1 = require("../../stores/VoiceStateStore");
const ImageUtil_1 = require("../../../util/ImageUtil");
/**
 * @see https://discord.com/developers/docs/resources/guild#guild-object
 */
class Guild extends Structure_1.Structure {
    constructor(client, data, shardID) {
        var _a;
        super(client);
        /**
         * Whether the guild is deleted.
         * @since 0.0.1
         */
        this.deleted = false;
        this.id = data.id;
        this.bans = new BanStore_1.BanStore(client, this);
        this.roles = new RoleStore_1.RoleStore(client, this);
        this.emojis = new GuildEmojiStore_1.GuildEmojiStore(client, this);
        this.invites = new GuildInviteStore_1.GuildInviteStore(client, this);
        this.integrations = new IntegrationStore_1.IntegrationStore(client, this);
        this.voiceStates = new VoiceStateStore_1.VoiceStateStore(client, this);
        this.members = new GuildMemberStore_1.GuildMemberStore(client, this);
        this.channels = new GuildChannelStore_1.GuildChannelStore(client, this);
        this.presences = new PresenceStore_1.PresenceStore(client, this);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.shard = this.client.ws.shards.get(shardID);
        // eslint-disable-next-line @typescript-eslint/camelcase
        this.widget = new GuildWidget_1.GuildWidget({ enabled: null, channel_id: null }, this);
        this.unavailable = (_a = data.unavailable) !== null && _a !== void 0 ? _a : false;
        if (!this.unavailable) {
            this._patch(data);
        }
    }
    /**
     * When this guild was joined at, as a Date.
     * @since 0.0.1
     */
    get joinedAt() {
        return this.joinedTimestamp === null ? null : new Date(this.joinedTimestamp);
    }
    /**
     * The Client's member of this guild.
     * @since 0.0.1
     */
    get me() {
        var _a;
        if (!this.client.user)
            return null;
        return (_a = this.members.get(this.client.user.id)) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * The owner of this guild.
     * @since 0.0.1
     */
    get owner() {
        var _a;
        return (_a = this.members.get(this.ownerID)) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Returns the guild preview.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#get-guild-preview
     */
    fetchPreview() {
        return this.client.api.get(rest_1.Routes.guildPreview(this.id));
    }
    /**
     * Modifies the guild's settings.
     * @since 0.0.1
     * @param data The settings to be applied to the guild.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild
     */
    async modify({ icon, splash, banner, ...options }, requestOptions = {}) {
        const data = {
            icon: icon ? await ImageUtil_1.resolveImageToBase64(icon) : icon,
            splash: splash ? await ImageUtil_1.resolveImageToBase64(splash) : splash,
            banner: banner ? await ImageUtil_1.resolveImageToBase64(banner) : banner,
            ...options
        };
        const result = await this.client.api.patch(rest_1.Routes.guild(this.id), { ...requestOptions, data });
        return this._patch(result);
    }
    /**
     * Deletes the guild permanently.
     * @since 0.0.1
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#delete-guild
     */
    async delete(requestOptions = {}) {
        await this.client.guilds.remove(this.id, requestOptions);
        this.deleted = true;
        return this;
    }
    async prune(options, requestOptions = {}) {
        const query = new url_1.URLSearchParams();
        if (Util_1.isSet(options, 'days'))
            query.append('days', options.days.toString());
        if (Util_1.isSet(options, 'includeRoles'))
            for (const role of options.includeRoles)
                query.append('include_roles', role);
        if (options.dry) {
            const result = await this.client.api.get(rest_1.Routes.guildPrune(this.id), { ...requestOptions, query: [...query] });
            return result.pruned;
        }
        if (Util_1.isSet(options, 'computePruneCount'))
            query.append('compute_prune_count', options.computePruneCount.toString());
        const result = await this.client.api.post(rest_1.Routes.guildPrune(this.id), { ...requestOptions, query: [...query] });
        return result.pruned;
    }
    /**
     * Returns a list of voice region objects for the guild.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#get-guild-voice-regions
     */
    async fetchRegions() {
        const results = await this.client.api.get(rest_1.Routes.guildVoiceRegions(this.id));
        return results;
    }
    /**
     * Makes the client leave the guild.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/user#leave-guild
     */
    async leave() {
        await this.client.api.delete(rest_1.Routes.leaveGuild(this.id));
        return this;
    }
    /**
     * Returns a partial {@link Invite invite} for guilds that have the feature enabled.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#get-guild-vanity-url
     */
    async fetchVanityURL() {
        return this.client.api.get(rest_1.Routes.guildVanityURL(this.id));
    }
    /**
     * Returns the icon url for the guild if one is available.
     * @param options The image size and format options.
     */
    iconURL(options) {
        return this.icon ? this.client.api.cdn.guildIcon(this.id, this.icon, options) : null;
    }
    /**
     * Defines the toString behavior of this structure.
     * @since 0.0.4
     */
    toString() {
        return this.name;
    }
    _patch(data) {
        var _a, _b, _c;
        this.name = data.name;
        this.ownerID = data.owner_id;
        this.region = data.name;
        this.icon = data.icon;
        this.splash = data.splash;
        this.discoverySplash = data.discovery_splash;
        this.afkChannelID = data.afk_channel_id;
        this.verificationLevel = data.verification_level;
        this.defaultMessageNotification = data.default_message_notifications;
        this.explicitContentFilter = data.explicit_content_filter;
        if (data.roles) {
            this.roles.clear();
            // eslint-disable-next-line dot-notation
            for (const role of data.roles)
                this.roles['_add'](role);
        }
        if (data.emojis) {
            this.emojis.clear();
            // eslint-disable-next-line dot-notation
            for (const emoji of data.emojis)
                this.emojis['_add'](emoji);
        }
        if (data.members) {
            this.members.clear();
            // eslint-disable-next-line dot-notation
            for (const member of data.members)
                this.members['_add'](member);
        }
        if (data.channels) {
            this.channels.clear();
            // eslint-disable-next-line dot-notation, @typescript-eslint/camelcase
            for (const channel of data.channels)
                this.client.channels['_add'](channel, this);
        }
        this.features = data.features;
        this.mfaLevel = data.mfa_level;
        this.widgetEnabled = (_a = data.widget_enabled) !== null && _a !== void 0 ? _a : false;
        this.widgetChannelID = (_b = data.widget_channel_id) !== null && _b !== void 0 ? _b : null;
        this.systemChannelID = data.system_channel_id;
        this.systemChannelFlags = data.system_channel_flags;
        this.rulesChannelID = data.rules_channel_id;
        this.joinedTimestamp = data.joined_at ? new Date(data.joined_at).getTime() : null;
        this.large = Boolean('large' in data ? data.large : this.large);
        this.vanityUrlCode = data.vanity_url_code;
        this.banner = data.banner;
        this.premiumTier = data.premium_tier;
        this.premiumSubscriptionCount = (_c = data.premium_subscription_count) !== null && _c !== void 0 ? _c : null;
        this.preferredLocale = data.preferred_locale;
        this.description = data.description;
        this.publicUpdatesChannel = data.public_updates_channel_id;
        this.approximateMemberCount = data.approximate_member_count;
        this.approximatePresenceCount = data.approximate_presence_status;
        return this;
    }
}
exports.Guild = Guild;
//# sourceMappingURL=Guild.js.map