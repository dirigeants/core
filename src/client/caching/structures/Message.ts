import { Structure } from './base/Structure';

import type { Client } from '../../Client';
import type { WebhookClient } from '../../WebhookClient';
import { APIMessageData, APIReactionData, APIMessageActivityData, APIMessageApplicationData, APIMessageReferenceData } from '@klasa/dapi-types';
import { MessageMentions } from './messages/MessageMentions';
import { Embed } from './Embed';
import { MessageFlags } from '../../../util/bitfields/MessageFlags';
import { GuildChannel } from './channels/GuildChannel';
import { User } from './User';
import { Guild } from './guilds/Guild';
import { Attachment } from './Attachment';
import { Cache } from '@klasa/cache';
import { MessageTypes } from '../../../util/Constants';

export class Message extends Structure {

	public id: string;
	public channel?: GuildChannel;
	public guild?: Guild | null;
	public author!: User;
	public member!: undefined | null;
	public content!: string;
	public createdAt!: Date;
	public editedAt!: Date | null;
	public tts!: boolean;
	public mentions!: MessageMentions;
	public attachments: Cache<string, Attachment> = new Cache();
	public embeds: Embed[] = [];
	public reactions?: APIReactionData[];
	public nonce?: string | null;
	public pinned!: boolean;
	public webhook_id?: string;
	public type!: string | null;
	public activity?: APIMessageActivityData;
	public application?: APIMessageApplicationData;
	public reference?: APIMessageReferenceData;
	public flags!: MessageFlags;

	public constructor(client: Client | WebhookClient, data: APIMessageData) {
		super(client);

		this.id = data.id;

		this._patch(data);
	}

	protected _patch(data: APIMessageData): this {
		this.channel = (this.client as Client).channels.get(data.channel_id);

		this.guild = data.guild_id ? (this.client as Client).guilds.get(data.guild_id) : null;

		this.author = (this.client as Client).users.add(data.author);

		this.member = data.member ? undefined : null;

		this.content = data.content;

		this.createdAt = new Date(data.timestamp);

		this.editedAt = data.edited_timestamp ? new Date(data.edited_timestamp) : null;

		this.tts = data.tts;

		this.mentions = new MessageMentions(this, data.mentions, data.mention_roles, data.mention_channels, data.mention_everyone);

		for (const attachment of data.attachments) this.attachments.set(attachment.id, new Attachment(attachment));

		if (data.embeds) for (const embed of data.embeds) this.embeds.push(new Embed(embed));

		this.reactions = data.reactions;

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
