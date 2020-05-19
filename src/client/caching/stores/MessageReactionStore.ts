/* eslint-disable no-dupe-class-members */
import { Routes } from '@klasa/rest';
import { DataStore } from './base/DataStore';
import { extender } from '../../../util/Extender';
import { EmojiResolvable, resolveEmoji } from '../../../util/Util';

import type { Client } from '../../Client';
import type { MessageReaction } from '../structures/messages/reactions/MessageReaction';
import type { Message } from '../structures/Message';

/**
 * The store for {@link MessageReaction message reactions}.
 * @since 0.0.1
 */
export class MessageReactionStore extends DataStore<MessageReaction> {

	/**
	 * The {@link Message message} this store belongs to.
	 * @since 0.0.1
	 */
	public readonly message: Message;

	/**
	 * Builds the store.
	 * @since 0.0.1
	 * @param client The {@link Client client} this store belongs to.
	 * @param message The {@link Message message} this store belongs to.
	 */
	public constructor(client: Client, message: Message) {
		super(client, extender.get('MessageReaction'), client.options.cache.limits.reactions);
		this.message = message;
	}

	/**
	 * Adds a reaction to the message.
	 * @param emoji The emoji to be added as a reaction to this message.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/channel#create-reaction
	 */
	public async add(emoji: EmojiResolvable): Promise<this> {
		await this.client.api.put(Routes.messageReactionUser(this.message.channel.id, this.message.id, resolveEmoji(emoji), '@me'));
		return this;
	}

	/**
	 * Deletes all reactions on a message.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/channel#delete-all-reactions
	 */
	public remove(): Promise<this>;
	/**
	 * Deletes a reaction from a message.
	 * @since 0.0.1
	 * @param emoji The emoji to remove from the message's reactions.
	 * @see https://discord.com/developers/docs/resources/channel#delete-all-reactions-for-emoji
	 */
	public remove(emoji: EmojiResolvable): Promise<this>;
	public async remove(emoji?: EmojiResolvable): Promise<this> {
		await this.client.api.delete(emoji ?
			Routes.messageReaction(this.message.channel.id, this.message.id, resolveEmoji(emoji)) :
			Routes.messageReactions(this.message.channel.id, this.message.id));
		return this;
	}

}
