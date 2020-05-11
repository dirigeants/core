import { Cache } from '@klasa/cache';
import { Structure } from './base/Structure';
import { MessageMentions } from './messages/MessageMentions';
import { Embed } from './Embed';
import { MessageFlags } from '../../../util/bitfields/MessageFlags';
import { Attachment } from './Attachment';
import { MessageTypes } from '../../../util/Constants';
import { MessageReactionStore } from '../stores/MessageReactionStore';
import { MessageReaction } from './messages/MessageReaction';

import type { APIMessageData, APIMessageActivityData, APIMessageApplicationData, APIMessageReferenceData } from '@klasa/dapi-types';
import type { User } from './User';
import type { Guild } from './guilds/Guild';
import type { Channel } from './channels/Channel';
import type { Client } from '../../Client';

export class Message extends Structure {

	public readonly id: string;
	public channel!: Channel;
	public guild!: Guild | null;
	public author!: User;
	public member!: undefined | null;
	public content!: string;
	public createdAt!: Date;
	public editedAt!: Date | null;
	public tts!: boolean;
	public mentions!: MessageMentions;
	public attachments: Cache<string, Attachment> = new Cache();
	public embeds: Embed[] = [];
	public reactions: MessageReactionStore;
	public nonce?: string | null;
	public pinned!: boolean;
	public webhook_id?: string;
	public type!: string | null;
	public activity?: APIMessageActivityData;
	public application?: APIMessageApplicationData;
	public reference?: APIMessageReferenceData;
	public flags!: MessageFlags;

	public constructor(client: Client, data: APIMessageData) {
		super(client);
		this.id = data.id;
		this.reactions = new MessageReactionStore(client);
		this._patch(data);
	}

	protected _patch(data: APIMessageData): this {
		this.channel = this.client.channels.get(data.channel_id) as Channel;
		this.guild = data.guild_id ? this.client.guilds.get(data.guild_id) ?? null : null;
		this.author = this.client.users.add(data.author);
		this.member = data.member ? undefined : null;
		this.content = data.content;
		this.createdAt = new Date(data.timestamp);
		this.editedAt = data.edited_timestamp ? new Date(data.edited_timestamp) : null;
		this.tts = data.tts;
		this.mentions = new MessageMentions(this, data.mentions, data.mention_roles, data.mention_channels, data.mention_everyone);

		if (data.reactions) {
			this.reactions.clear();
			for (const reaction of data.reactions) {
				const messageReaction = new MessageReaction(this.client, reaction, this);
				this.reactions.set(messageReaction.id, messageReaction);
			}
		}

		if (data.attachments) for (const attachment of data.attachments) this.attachments.set(attachment.id, new Attachment(attachment));
		if (data.embeds) for (const embed of data.embeds) this.embeds.push(new Embed(embed));

		this.nonce = data.nonce;
		this.pinned = data.pinned;
		this.type = MessageTypes[data.type];
		this.activity = data.activity;
		this.application = data.application;
		this.reference = data.message_reference;
		this.flags = new MessageFlags(data.flags);

		return this;
	}

}

export interface Message {
	readonly client: Client;
}
