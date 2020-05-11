import { UserStore } from '../../stores/UserStore';
import { Routes } from '@klasa/rest';

import type { Client } from '../../../Client';
import type { APIEmojiPartial, APIUserData } from '@klasa/dapi-types';
import type { MessageReaction } from './MessageReaction';

/**
 * @see https://discord.com/developers/docs/resources/emoji#emoji-object
 */
export class MessageReactionEmoji implements APIEmojiPartial {

	/**
	 * The emoji's ID.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/reference#image-formatting
	 */
	public readonly id: string | null;

	/**
	 * Emoji name.
	 * @since 0.0.1
	 */
	public readonly name: string | null;

	/**
	 * Whether this emoji is animated.
	 * @since 0.0.1
	 */
	public readonly animated: boolean;

	/**
	 * The reaction this entry belongs to.
	 * @since 0.0.1
	 */
	public readonly reaction: MessageReaction;

	/**
	 * The users that reacted to this emoji.
	 * @since 0.0.1
	 */
	public readonly users: UserStore;

	public constructor(public readonly client: Client, data: APIEmojiPartial, reaction: MessageReaction) {
		this.id = data.id;
		this.name = data.name;
		this.animated = data.animated ?? false;
		this.reaction = reaction;
		this.users = new UserStore(client);
	}

	/**
	 * The identifier to be used for API requests.
	 * @since 0.0.1
	 */
	public get identifier(): string {
		return this.id ?? encodeURIComponent(this.name as string);
	}

	/**
	 * The emoji as shown in Discord.
	 * @since 0.0.1
	 */
	public toString(): string {
		return this.id ? `<${this.animated ? 'a' : ''}:${this.name}:${this.id}>` : this.name as string;
	}

	/**
	 * Defines the JSON.stringify behavior of this structure.
	 * @since 0.0.1
	 */
	public toJSON(): object {
		return {
			id: this.id,
			name: this.name,
			animated: this.animated,
			users: [...this.users.keys()]
		};
	}

	/**
	 * Fetches all the users, populating {@link MessageReactionEmoji#users}.
	 * @since 0.0.1
	 * @param options The options for the fetch
	 */
	public async fetch(options?: MessageReactionEmojiFetchOptions): Promise<this> {
		const endpoint = Routes.messageReaction(this.reaction.message.channel.id, this.reaction.message.id, this.identifier);
		const users = await this.client.api.get(endpoint, { query: options }) as APIUserData[];
		for (const user of users) this.users.add(user);
		return this;
	}

}

/**
 * @see https://discord.com/developers/docs/resources/channel#get-reactions-query-string-params
 */
export interface MessageReactionEmojiFetchOptions {
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
