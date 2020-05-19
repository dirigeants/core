import { Cache } from '@klasa/cache';
import { Message } from '../../client/caching/structures/Message';
import { EventIterator } from '@klasa/event-iterator';
import { ClientEvents } from '../types/Util';
import { MessageReaction } from '../../client/caching/structures/messages/reactions/MessageReaction';

export interface ReactionIteratorOptions {
	idle?: number;
	filter?: (reaction: MessageReaction, collected: Cache<string, MessageReaction>) => boolean;
}

export class ReactionIterator {

	public collected = new Cache<string, MessageReaction>();

	#iterator: EventIterator<MessageReaction>;

	public constructor(message: Message, limit: number, options: ReactionIteratorOptions = {}) {
		const { idle, filter = (): boolean => true } = options;
		this.#iterator = new EventIterator(message.client, ClientEvents.MessageReactionAdd, limit, { idle, filter: (react): boolean => react.message === message && filter(react, this.collected) });
	}

	public async collectAll(): Promise<Cache<string, MessageReaction>> {
		for await (const __ of this) {
			// noop
		}
		return this.collected;
	}

	public async *[Symbol.asyncIterator](): AsyncIterableIterator<MessageReaction> {
		for await (const reaction of this.#iterator) {
			this.collected.set(reaction.id, reaction);
			yield reaction;
		}
	}

}
