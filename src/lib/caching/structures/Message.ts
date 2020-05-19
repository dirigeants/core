import { Cache } from '@klasa/cache';
import { Routes, RequestOptions } from '@klasa/rest';
import { Embed } from './Embed';
import { isSet } from '../../util/Util';
import { MessageAttachment } from './messages/MessageAttachment';
import { MessageFlags } from '../../util/bitfields/MessageFlags';
import { MessageMentions } from './messages/MessageMentions';
import { MessageReaction } from './messages/reactions/MessageReaction';
import { MessageReactionStore } from '../stores/MessageReactionStore';
import { Structure } from './base/Structure';
import { ReactionCollector, ReactionCollectorOptions } from '../../util/collectors/ReactionCollector';
import { MessageBuilder } from './messages/MessageBuilder';

import type { APIMessageData, APIMessageActivityData, APIMessageApplicationData, APIMessageReferenceData, MessageType } from '@klasa/dapi-types';
import type { User } from './User';
import type { Guild } from './guilds/Guild';
import type { Client } from '../../client/Client';
import type { DMChannel } from './channels/DMChannel';
import type { TextChannel } from './channels/TextChannel';
import type { NewsChannel } from './channels/NewsChannel';
import type { GuildMember } from './guilds/GuildMember';

export class Message extends Structure {

	/**
	 * Id of the message.
	 * @since 0.0.1
	 */
	public readonly id: string;

	/**
	 * The channel the message was sent in.
	 * @since 0.0.1
	 */
	public readonly channel: DMChannel | TextChannel | NewsChannel;

	/**
	 * The guild the message was sent in.
	 * @since 0.0.1
	 */
	public readonly guild: Guild | null;

	/**
	 * Author of this message.
	 * @since 0.0.1
	 */
	public readonly author: User;

	/**
	 * The author's member data, always null if {@link Message#guild} is null.
	 * @since 0.0.1
	 */
	public readonly member: GuildMember | null;

	/**
	 * When this message was sent.
	 * @since 0.0.1
	 */
	public readonly createdTimestamp!: number;

	/**
	 * The mentions.
	 * @since 0.0.1
	 */
	public readonly mentions: MessageMentions;

	/**
	 * The attached files.
	 * @since 0.0.1
	 */
	public readonly attachments: Cache<string, MessageAttachment>;

	/**
	 * Contents of the message.
	 * @since 0.0.1
	 */
	public content!: string;

	/**
	 * When this message was edited (or null if never).
	 * @since 0.0.1
	 */
	public editedTimestamp!: number | null;

	/**
	 * Whether or not this was a TTS message.
	 * @since 0.0.1
	 */
	public tts!: boolean;

	/**
	 * The embedded data.
	 * @since 0.0.1
	 */
	public embeds: Embed[] = [];

	/**
	 * Reactions to the message.
	 * @since 0.0.1
	 */
	public readonly reactions: MessageReactionStore;

	/**
	 * Used for validating a message was sent.
	 * @since 0.0.1
	 */
	public readonly nonce?: string | null;

	/**
	 * Whether or not this message is pinned.
	 * @since 0.0.1
	 */
	public pinned!: boolean;

	/**
	 * If the message is generated by a webhook, this is the webhook's id.
	 * @since 0.0.1
	 */
	public readonly webhookID?: string;

	/**
	 * The type of message.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/channel#message-object-message-types
	 */
	public readonly type: MessageType;

	/**
	 * Sent with Rich Presence-related chat embeds.
	 * @since 0.0.1
	 */
	public readonly activity?: APIMessageActivityData;

	/**
	 * Sent with Rich Presence-related chat embeds.
	 * @since 0.0.1
	 */
	public readonly application?: APIMessageApplicationData;

	/**
	 * Reference data sent with crossposted messages.
	 * @since 0.0.1
	 */
	public readonly reference?: APIMessageReferenceData;

	/**
	 * Describes extra features of the message.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/channel#message-object-message-flags
	 */
	public flags!: MessageFlags;

	/**
	 * Whether the message is deleted.
	 * @since 0.0.1
	 */
	public deleted = false;

	public constructor(client: Client, data: APIMessageData, guild?: Guild) {
		super(client);
		this.id = data.id;
		this.attachments = new Cache();
		this.reactions = new MessageReactionStore(client, this);
		this.guild = guild || (data.guild_id ? this.client.guilds.get(data.guild_id) ?? null : null);
		this.channel = this.guild ? this.guild.channels.get(data.channel_id) as TextChannel | NewsChannel : this.client.dms.get(data.channel_id) as DMChannel;
		// eslint-disable-next-line dot-notation
		this.author = this.client.users['_add'](data.author);
		// eslint-disable-next-line dot-notation
		this.member = data.member && this.guild ? this.guild.members['_add']({ ...data.member, user: data.author }) : null;
		this.createdTimestamp = new Date(data.timestamp).getTime();
		this.mentions = new MessageMentions(this, data.mentions, data.mention_roles, data.mention_channels, data.mention_everyone);
		this.type = data.type;

		if (isSet(data, 'nonce')) this.nonce = data.nonce;
		if (isSet(data, 'webhook_id')) this.webhookID = data.webhook_id;
		if (isSet(data, 'activity')) this.activity = data.activity;
		if (isSet(data, 'application')) this.application = data.application;
		if (isSet(data, 'message_reference')) this.reference = data.message_reference;

		this._patch(data);
	}

	/**
	 * When this message was sent.
	 * @since 0.0.1
	 */
	public get createdAt(): Date {
		return new Date(this.createdTimestamp);
	}

	/**
	 * When this message was edited (or null if never).
	 * @since 0.0.1
	 */
	public get editedAt(): Date | null {
		return this.editedTimestamp ? new Date(this.editedTimestamp) : null;
	}

	/**
	 * Awaits a group of messages.
	 * @since 0.0.1
	 * @param limit The limit of filtered messages to await.
	 * @param options The options to control what you receive.
	 */
	public async awaitReactions(options: ReactionCollectorOptions = {}): Promise<Cache<string, MessageReaction>> {
		return new ReactionCollector(this, options).collect();
	}

	/**
	 * Edits the message.
	 * @param content The {@link MessageBuilder builder} to send.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/channel#edit-message
	 */
	public async edit(content: MessageBuilder | ((message: MessageBuilder) => MessageBuilder | Promise<MessageBuilder>)): Promise<Message> {
		content = typeof content === 'function' ? await content(new MessageBuilder()) : content;
		const data = await this.client.api.patch(Routes.channelMessage(this.channel.id, this.id), content) as APIMessageData;
		return this._patch(data) as Message;
	}

	/**
	 * Deletes the message.
	 * @param requestOptions The additional request options.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/channel#delete-message
	 */
	public async delete(requestOptions: RequestOptions = {}): Promise<this> {
		await this.channel.messages.remove(this.id, requestOptions);
		this.deleted = true;
		return this;
	}

	protected _patch(data: Partial<APIMessageData>): this {
		if (isSet(data, 'content')) this.content = data.content;
		if (isSet(data, 'edited_timestamp')) this.editedTimestamp = data.edited_timestamp ? new Date(data.edited_timestamp).getTime() : null;
		if (isSet(data, 'tts')) this.tts = data.tts;

		if (data.reactions) {
			this.reactions.clear();
			for (const reaction of data.reactions) {
				const messageReaction = new MessageReaction(this.client, reaction, this);
				this.reactions.set(messageReaction.id, messageReaction);
			}
		}

		if (data.attachments) for (const attachment of data.attachments) this.attachments.set(attachment.id, new MessageAttachment(attachment));
		if (data.embeds) for (const embed of data.embeds) this.embeds.push(new Embed(embed));

		if (isSet(data, 'pinned')) this.pinned = data.pinned;
		if (isSet(data, 'flags')) this.flags = new MessageFlags(data.flags);
		return this;
	}

}
