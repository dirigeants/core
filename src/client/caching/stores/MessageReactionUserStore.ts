/* eslint-disable no-dupe-class-members */
import { ProxyCache } from '@klasa/cache';
import { Routes } from '@klasa/rest';

import type { APIUserData } from '@klasa/dapi-types';
import type { MessageReaction } from '../structures/messages/reactions/MessageReaction';
import type { Message } from '../structures/Message';
import type { User } from '../structures/User';
import type { Client } from '../../Client';

export class MessageReactionUserStore extends ProxyCache<string, User> {

	public readonly reaction: MessageReaction;

	public constructor(reaction: MessageReaction) {
		super(reaction.client.users, []);
		this.reaction = reaction;
	}

	public get client(): Client {
		return this.reaction.client;
	}

	public get message(): Message {
		return this.reaction.message;
	}

	/**
	 * Fetches all the users, populating {@link MessageReactionEmoji#users}.
	 * @since 0.0.1
	 * @param options The options for the fetch
	 */
	public async fetch(options?: MessageReactionFetchOptions): Promise<this> {
		const users = await this.client.api.get(Routes.messageReaction(this.message.channel.id, this.message.id, this.reaction.emoji.identifier), {
			query: options
		}) as APIUserData[];
		for (const user of users) {
			// eslint-disable-next-line dot-notation
			this.client.users['_add'](user);
			this.set(user.id);
		}

		return this;
	}

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
	public async remove(userID?: string): Promise<this> {
		await this.client.api.delete(Routes.messageReactionUser(this.message.channel.id, this.message.id, this.reaction.emoji.identifier, userID === this.client.user?.id ? '@me' : userID));
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
