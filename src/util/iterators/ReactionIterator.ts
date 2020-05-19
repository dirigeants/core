import { Cache } from '@klasa/cache';
import { Message } from '../../client/caching/structures/Message';
import { EventIterator } from '@klasa/event-iterator';
import { StructureIterator } from './base/StructureIterator';
import { ClientEvents } from '../types/Util';
import { MessageReaction } from '../../client/caching/structures/messages/reactions/MessageReaction';

export interface ReactionIteratorOptions {
	idle?: number;
	filter?: (reaction: MessageReaction, collected: Cache<string, MessageReaction>) => boolean;
}

export class ReactionIterator extends StructureIterator<MessageReaction> {

	public constructor(message: Message, limit: number, options: ReactionIteratorOptions = {}) {
		const { idle, filter = (): boolean => true } = options;
		super(new EventIterator(message.client, ClientEvents.MessageReactionAdd, limit, { idle, filter: (react): boolean => react.message === message && filter(react, this.collected) }));
	}

}
