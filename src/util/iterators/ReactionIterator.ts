import { EventIterator, EventIteratorOptions } from '@klasa/event-iterator';
import { Message } from '../../client/caching/structures/Message';
import { StructureIterator } from './base/StructureIterator';
import { ClientEvents } from '../types/Util';
import { MessageReaction } from '../../client/caching/structures/messages/reactions/MessageReaction';

export class ReactionIterator extends StructureIterator<MessageReaction> {

	public constructor(message: Message, limit: number, options: EventIteratorOptions<MessageReaction> = {}) {
		const { idle, filter = (): boolean => true } = options;

		super(new EventIterator(message.client, ClientEvents.MessageReactionAdd, limit, {
			idle,
			filter: (react): boolean => react.message === message && filter(react)
		}));
	}

}
