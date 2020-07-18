"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetStyle = exports.GuildWidget = void 0;
const rest_1 = require("@klasa/rest");
const url_1 = require("url");
/**
 * @see https://discord.com/developers/docs/resources/guild#guild-widget-object
 */
class GuildWidget {
    constructor(data, guild) {
        this.client = guild.client;
        this.guild = guild;
        this._patch(data);
    }
    /**
     * The widget {@link Channel channel}.
     * @since 0.0.1
     */
    get channel() {
        var _a;
        return this.channelID ? (_a = this.guild.channels.get(this.channelID)) !== null && _a !== void 0 ? _a : null : null;
    }
    /**
     * Returns a PNG image URL representing the image widget of the guild.
     * @since 0.0.1
     * @param options The options for the widget image.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-widget-image
     */
    getImageURL(options) {
        const path = rest_1.Routes.guildWidgetImage(this.guild.id);
        const url = new url_1.URL(`https://discord.com/api${path}`);
        if (options)
            for (const [key, value] of Object.entries(options))
                url.searchParams.append(key, value);
        return url.toString();
    }
    /**
     * Returns the updated {@link Guild guild} widget.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#get-guild-widget
     */
    async fetch() {
        const entry = await this.client.api.get(rest_1.Routes.guildWidget(this.guild.id));
        return this._patch(entry);
    }
    /**
     * Modifies the {@link Guild guild}'s widget.
     * @since 0.0.1
     * @param data The new data for the widget.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-widget
     */
    async modify(data, requestOptions = {}) {
        const updated = await this.client.api.patch(rest_1.Routes.guildWidget(this.guild.id), { ...requestOptions, data });
        return this._patch(updated);
    }
    toJSON() {
        return !!this.enabled;
    }
    _patch(data) {
        this.enabled = data.enabled;
        this.channelID = data.channel_id;
        return this;
    }
}
exports.GuildWidget = GuildWidget;
/**
 * The widget style options.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#get-guild-widget-image-widget-style-options
 */
var WidgetStyle;
(function (WidgetStyle) {
    /**
     * shield style widget with Discord icon and guild members online count
     * @since 0.0.1
     * @see https://discord.com/api/guilds/81384788765712384/widget.png?style=shield
     */
    WidgetStyle["Shield"] = "shield";
    /**
     * large image with guild icon, name and online count. "POWERED BY DISCORD" as the footer of the widget
     * @since 0.0.1
     * @see https://discord.com/api/guilds/81384788765712384/widget.png?style=banner1
     */
    WidgetStyle["Banner1"] = "banner1";
    /**
     * smaller widget style with guild icon, name and online count. Split on the right with Discord logo
     * @since 0.0.1
     * @see https://discord.com/api/guilds/81384788765712384/widget.png?style=banner2
     */
    WidgetStyle["Banner2"] = "banner2";
    /**
     * large image with guild icon, name and online count. In the footer, Discord logo on the left and "Chat Now" on the right
     * @since 0.0.1
     * @see https://discord.com/api/guilds/81384788765712384/widget.png?style=banner3
     */
    WidgetStyle["Banner3"] = "banner3";
    /**
     * large Discord logo at the top of the widget. Guild icon, name and online count in the middle portion of the widget and a "JOIN MY SERVER" button at the bottom
     * @since 0.0.1
     * @see https://discord.com/api/guilds/81384788765712384/widget.png?style=banner4
     */
    WidgetStyle["Banner4"] = "banner4";
})(WidgetStyle = exports.WidgetStyle || (exports.WidgetStyle = {}));
//# sourceMappingURL=GuildWidget.js.map