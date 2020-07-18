import { RequestOptions } from '@klasa/rest';
import type { APIGuildWidgetData } from '@klasa/dapi-types';
import type { Client } from '../../../client/Client';
import type { Guild } from './Guild';
import type { GuildBasedChannel } from '../../../util/Util';
/**
 * @see https://discord.com/developers/docs/resources/guild#guild-widget-object
 */
export declare class GuildWidget {
    /**
     * The {@link Client client} this store belongs to.
     * @since 0.0.1
     */
    readonly client: Client;
    /**
     * The {@link Guild guild} this store belongs to.
     * @since 0.0.1
     */
    readonly guild: Guild;
    /**
     * Whether the widget is enabled, it will be null in the initial state.
     * @since 0.0.1
     */
    enabled: boolean | null;
    /**
     * The widget {@link Channel channel} ID.
     * @since 0.0.1
     */
    channelID: string | null;
    constructor(data: WidgetData, guild: Guild);
    /**
     * The widget {@link Channel channel}.
     * @since 0.0.1
     */
    get channel(): GuildBasedChannel | null;
    /**
     * Returns a PNG image URL representing the image widget of the guild.
     * @since 0.0.1
     * @param options The options for the widget image.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-widget-image
     */
    getImageURL(options?: WidgetImageOptions): string;
    /**
     * Returns the updated {@link Guild guild} widget.
     * @since 0.0.1
     * @see https://discord.com/developers/docs/resources/guild#get-guild-widget
     */
    fetch(): Promise<this>;
    /**
     * Modifies the {@link Guild guild}'s widget.
     * @since 0.0.1
     * @param data The new data for the widget.
     * @param requestOptions The additional request options.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-widget
     */
    modify(data: APIGuildWidgetData, requestOptions?: RequestOptions): Promise<this>;
    toJSON(): boolean | null;
    protected _patch(data: WidgetData): this;
}
interface WidgetData extends Omit<APIGuildWidgetData, 'enabled'> {
    enabled: boolean | null;
}
/**
 * The options for the widget image.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#get-guild-widget-image-query-string-params
 */
export interface WidgetImageOptions {
    /**
     * Style of the widget image returned.
     * @since 0.0.1
     * @default WidgetStyle.Shield
     */
    style?: WidgetStyle;
}
/**
 * The widget style options.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/guild#get-guild-widget-image-widget-style-options
 */
export declare enum WidgetStyle {
    /**
     * shield style widget with Discord icon and guild members online count
     * @since 0.0.1
     * @see https://discord.com/api/guilds/81384788765712384/widget.png?style=shield
     */
    Shield = "shield",
    /**
     * large image with guild icon, name and online count. "POWERED BY DISCORD" as the footer of the widget
     * @since 0.0.1
     * @see https://discord.com/api/guilds/81384788765712384/widget.png?style=banner1
     */
    Banner1 = "banner1",
    /**
     * smaller widget style with guild icon, name and online count. Split on the right with Discord logo
     * @since 0.0.1
     * @see https://discord.com/api/guilds/81384788765712384/widget.png?style=banner2
     */
    Banner2 = "banner2",
    /**
     * large image with guild icon, name and online count. In the footer, Discord logo on the left and "Chat Now" on the right
     * @since 0.0.1
     * @see https://discord.com/api/guilds/81384788765712384/widget.png?style=banner3
     */
    Banner3 = "banner3",
    /**
     * large Discord logo at the top of the widget. Guild icon, name and online count in the middle portion of the widget and a "JOIN MY SERVER" button at the bottom
     * @since 0.0.1
     * @see https://discord.com/api/guilds/81384788765712384/widget.png?style=banner4
     */
    Banner4 = "banner4"
}
export {};
