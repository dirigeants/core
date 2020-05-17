import { Routes } from '@klasa/rest';
import { MessageReactionEmoji } from './MessageReactionEmoji';
import { Structure } from '../base/Structure';
import { UserStore } from '../../stores/UserStore';

import type { APIReactionData, APIUserData } from '@klasa/dapi-types';
import type { Message } from '../Message';
import type { Client } from '../../../Client';

/**
 * @see https://discord.com/developers/docs/resources/channel#reaction-object
 */
export class MessageReaction extends Structure {

	/**
	 * The reaction ID.
	 * @since 0.0.1
	 */
	public readonly id: string;

	/**
	 * Whether or not the current user reacted using this emoji.
	 * @since 0.0.1
	 */
	public me!: boolean;

	/**
	 * Times this emoji has been used to react.
	 * @since 0.0.1
	 */
	public count!: number;

	/**
	 * Emoji information.
	 * @since 0.0.1
	 */
	public readonly emoji: MessageReactionEmoji;

	/**
	 * The users that reacted to this emoji.
	 * @since 0.0.1
	 */
	public readonly users: UserStore;

	/**
	 * The {@link Message message} instance this is tied to.
	 * @since 0.0.1
	 */
	public readonly message: Message;

	public constructor(client: Client, data: APIReactionData, message: Message) {
		super(client);
		this.id = data.emoji.id ?? data.emoji.name as string;
		this.message = message;
		this.emoji = new MessageReactionEmoji(client, data.emoji);
		this.users = new UserStore(client);
		this._patch(data);
	}

	/**
	 * Fetches all the users, populating {@link MessageReactionEmoji#users}.
	 * @since 0.0.1
	 * @param options The options for the fetch
	 */
	public async fetch(options?: MessageReactionFetchOptions): Promise<this> {
		const users = await this.client.api.get(Routes.messageReaction(this.message.channel.id, this.message.id, this.emoji.identifier), { query: options }) as APIUserData[];
		for (const user of users) {
			// eslint-disable-next-line dot-notation
			this.users.set(user.id, this.client.users['_add'](user));
		}
		return this;
	}

	/**
	 * The emoji as shown in Discord.
	 * @since 0.0.1
	 */
	public toString(): string {
		return this.emoji.toString();
	}

	/**
	 * Defines the JSON.stringify behavior of this structure.
	 * @since 0.0.1
	 */
	public toJSON(): object {
		return {
			me: this.me,
			count: this.count,
			emoji: this.emoji.toJSON()
		};
	}

	protected _patch(data: APIReactionData): this {
		this.me = data.me;
		this.count = data.count;
		return this;
	}

}

export interface MessageReaction {
	client: Client;
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
