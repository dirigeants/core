import { Structure } from '../base/Structure';
import { Message } from '../Message';
import { APIEmojiPartial, APIReactionData } from '@klasa/dapi-types';
import { Client } from '../../../Client';
import { Routes } from '@klasa/rest';

export class MessageReaction extends Structure {

	/**
     * Either the reaction id of a custom emoji or the unicode emoji.
     */
	public id: string;

	/**
     * Whether the client has reacted with this emoji
     */
	public me!: boolean;
	/**
     * How many users have reacted to this emoji
     */
	public count?: number;
	// TODO: Make this a store, else kyra will be mad
	/**
     * An array of user IDs that have reacted with this emoji
     */
	public users: string[] = [];
	/**
     * The actual emoji used to react
     */
	public emoji!: APIEmojiPartial;
	/**
     * The message this reaction belongs to
     */
	public message!: Message;

	public constructor(client: Client, data: APIReactionData) {
		super(client);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		this.id = data.emoji.id === null ? data.emoji.id! : data.emoji.name!;
		this.me = data.me;
		this.emoji = data.emoji;
		this.count = data.count;
	}

	public _patch(_data: any): this {
		return this;
	}

	public async remove(userId?: string): Promise<unknown> {
		if (this.me) {
			return this.client.api.delete(`${Routes.message(this.message.channel!.id, this.message.id)}/reactions/${this.id}/@me`);
		}

		// TODO: Better errors
		if (!userId) throw `No user ID provided`;
		return this.client.api.delete(`${Routes.reaction(this.message.channel!.id, this.message.id, userId)}`);
	}

	public _add(userId: string): void {
		this.users.push(userId);
	}

	public _remove(userId: string): void {
		this.users.filter(id => id !== userId);
	}

}
