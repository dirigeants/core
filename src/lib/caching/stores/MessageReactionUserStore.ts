/* eslint-disable no-dupe-class-members */
import { ProxyCache } from '@klasa/cache';
import { Routes } from '@klasa/rest';

import type { APIUserData } from '@klasa/dapi-types';
import type { MessageReaction } from '../structures/messages/reactions/MessageReaction';
import type { Message } from '../structures/messages/Message';
import type { User } from '../structures/User';
import type { Client } from '../../client/Client';

/**
 * The store for {@link MessageReaction message reaction} {@link User users}.
 * @since 0.0.1
 */
export class MessageReactionUserStore extends ProxyCache<string, User> {

	/**
	 * The {@link Client client} this store belongs to.
	 * @since 0.0.1
	 */
	public readonly client: Client;

	/**
	 * The {@link MessageReaction message reaction} this store belongs to.
	 * @since 0.0.1
	 */
	public readonly reaction: MessageReaction;

	/**
	 * Builds the store.
	 * @since 0.0.1
	 * @param reaction The {@link MessageReaction message reaction} this store belongs to.
	 */
	public constructor(reaction: MessageReaction) {
		super(reaction.client.users, []);
		this.client = reaction.client;
		this.reaction = reaction;
	}

	/**
	 * The {@link Message message} this store belongs to.
	 * @since 0.0.1
	 */
	public get message(): Message {
		return this.reaction.message;
	}

	/**
	 * Adds a reaction to the message.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/channel#create-reaction
	 */
	public async add(): Promise<this> {
		await this.message.reactions.add(this.reaction.emoji);
		return this;
	}

	/**
	 * Removes a reaction from the {@link Client#user client user}.
	 * @since 0.0.1
	 * @param userID The bot {@link User user}'s ID or `@me`.
	 * @see https://discord.com/developers/docs/resources/channel#delete-own-reaction
	 */
	public remove(userID?: '@me'): Promise<this>;
	/**
	 * Remove a reaction from a user.
	 * @since 0.0.1
	 * @param userID The {@link User user}'s ID.
	 * @see https://discord.com/developers/docs/resources/channel#delete-user-reaction
	 */
	public remove(userID: string): Promise<this>;
	public async remove(userID = '@me'): Promise<this> {
		await this.client.api.delete(Routes.messageReactionUser(this.message.channel.id, this.message.id, this.reaction.emoji.identifier, userID === this.client.user?.id ? '@me' : userID));
		return this;
	}

	/**
	 * Fetches all the users, populating {@link MessageReactionEmoji#users}.
	 * @since 0.0.1
	 * @param options The options for the fetch
	 */
	public async fetch(options?: MessageReactionFetchOptions): Promise<this> {
		const users = await this.client.api.get(Routes.messageReaction(this.message.channel.id, this.message.id, this.reaction.emoji.identifier), {
			query: options && Object.entries(options)
		}) as APIUserData[];
		for (const user of users) {
			// eslint-disable-next-line dot-notation
			this.client.users['_add'](user);
			this.set(user.id);
		}

		return this;
	}

}

/**
 * @see https://discord.com/developers/docs/resources/channel#get-reactions-query-string-params
 */
export interface MessageReactionFetchOptions {
	/**
	 * Get users before this user ID.
	 * @since 0.0.1
	 */
	before?: string;

	/**
	 * Get users after this user ID.
	 * @since 0.0.1
	 */
	after?: string;

	/**
	 * Max number of users to return (1-100).
	 * @since 0.0.1
	 */
	limit?: number;
}
