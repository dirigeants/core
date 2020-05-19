import { EventIterator, EventIteratorOptions } from '@klasa/event-iterator';
import { Message } from '../../client/caching/structures/Message';
import { ClientEvents } from '../types/Util';
import { MessageReaction } from '../../client/caching/structures/messages/reactions/MessageReaction';

export class ReactionIterator extends EventIterator<MessageReaction> {

	public constructor(message: Message, options: EventIteratorOptions<MessageReaction> = {}) {
		const { limit, idle, filter = (): boolean => true } = options;

		super(message.client, ClientEvents.MessageReactionAdd, {
			limit,
			idle,
			filter: (react): boolean => react.message === message && filter(react)
		});
	}

}
