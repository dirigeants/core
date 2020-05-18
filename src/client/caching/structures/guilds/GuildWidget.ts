import { Routes, RequestOptions } from '@klasa/rest';

import type { APIGuildWidgetData } from '@klasa/dapi-types';
import type { Client } from '../../../Client';
import type { Guild } from './Guild';
import type { GuildBasedChannel } from '../../../../util/Util';

/**
 * @see https://discord.com/developers/docs/resources/guild#guild-widget-object
 */
export class GuildWidget {

	/**
	 * Whether the widget is enabled.
	 * @since 0.0.1
	 */
	public enabled!: boolean;

	/**
	 * The widget {@link Channel channel} ID.
	 * @since 0.0.1
	 */
	public channelID!: string | null;
	public readonly guild: Guild;

	public constructor(data: APIGuildWidgetData, guild: Guild) {
		this.guild = guild;
		this._patch(data);
	}

	public get client(): Client {
		return this.guild.client;
	}

	/**
	 * The widget {@link Channel channel}.
	 * @since 0.0.1
	 */
	public get channel(): GuildBasedChannel | null {
		return this.channelID ? this.guild.channels.get(this.channelID) ?? null : null;
	}

	/**
	 * Modifies the {@link Guild guild}'s widget.
	 * @since 0.0.1
	 * @param data The new data for the widget.
	 * @see https://discord.com/developers/docs/resources/guild#modify-guild-widget
	 */
	public async edit(data: APIGuildWidgetData, requestOptions: RequestOptions = {}): Promise<this> {
		const updated = await this.client.api.patch(Routes.guildWidget(this.guild.id), { ...requestOptions, data }) as APIGuildWidgetData;
		return this._patch(updated);
	}

	protected _patch(data: APIGuildWidgetData): this {
		this.enabled = data.enabled;
		this.channelID = data.channel_id;
		return this;
	}

}
