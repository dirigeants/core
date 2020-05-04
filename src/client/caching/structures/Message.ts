import { Structure } from './base/Structure';

import type { Client } from '../../Client';
import type { WebhookClient } from '../../WebhookClient';
import type { APIMessageData } from '@klasa/dapi-types';
import { MessageMentions } from './MessageMentions';
import { MessageEmbed } from './messages/MessageEmbed';

export class Message extends Structure {

	public id: string;
	public content!: string;

	public embeds: MessageEmbed[] = [];

	public constructor(client: Client | WebhookClient, data: APIMessageData) {
		super(client);

		this.id = data.id;

		this._patch(data);
	}

	protected _patch(data: APIMessageData): this {
		this.channelID = data.channel_id;

		// TODO: More logic here
		this.guildID = data.guild_id;

		this.author = data.author;

		// TODO: When Guild, GuildStore & GuildMemberStore is done, rewrite this
		this.member = data.member;

		this.content = data.content;

		this.timestamp = data.timestamp;

		this.edited_timestamp = data.edited_timestamp;

		this.tts = data.tts;

		this.mentions = new MessageMentions(this, data.mentions, data.mention_roles, data.mention_channels, data.mention_everyone);

		// TODO: Implement Attachment
		this.attachments = data.attachments;

		if (data.embeds) for (const embed of data.embeds) this.embeds.push(new MessageEmbed(embed));

		this.reactions = data.reactions;

		this.nonce = data.nonce;

		this.pinned = data.pinned;

		this.type = data.type;

		return this;
	}

}
