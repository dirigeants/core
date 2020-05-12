import { APIChannelData } from '@klasa/dapi-types';
import { GuildChannel } from './GuildChannel';
import { Client } from '../../../Client';
import { MessageStore } from '../../../caching/stores/MessageStore';

/**
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
export abstract class GuildTextChannel extends GuildChannel {

	/**
	 * The message store for this channel.
	 * @since 0.0.1
	 */
	public readonly messages: MessageStore;

	/**
	 * The channel topic (0-1024 characters).
	 * @since 0.0.1
	 */
	public topic!: string | null;

	/**
	 * Whether or not the channel is nsfw.
	 * @since 0.0.1
	 */
	public nsfw!: boolean;

	/**
	 * The id of the last message sent in this channel (may not point to an existing or valid message).
	 * @since 0.0.1
	 */
	public lastMessageID!: string | null;

	/**
	 * When the last pinned message was pinned.
	 * @since 0.0.1
	 */
	public lastPinTimestamp!: string | null;

	public constructor(client: Client, data: APIChannelData) {
		super(client, data);
		this.messages = new MessageStore(client);
		this._patch(data);
	}

	protected _patch(data: APIChannelData): this {
		this.topic = data.topic ?? null;
		this.nsfw = data.nsfw as boolean;
		this.lastMessageID = data.last_message_id ?? null;
		this.lastPinTimestamp = data.last_pin_timestamp ?? null;
		return super._patch(data);
	}

}
