import { EventIterator, EventIteratorOptions } from '@klasa/event-iterator';
import { ClientEvents } from '../../client/Client';

import type { Message } from '../../caching/structures/Message';
import type { MessageReaction } from '../../caching/structures/messages/reactions/MessageReaction';

/**
 * An asynchronous iterator responsible for iterating over reactions.
 * @since 0.0.1
 */
export class ReactionIterator extends EventIterator<MessageReaction> {

	/**
	 * Construct's a new ReactionIterator.
	 * @since 0.0.1
	 * @param channel The message to listen for reactions.
	 * @param options Any additional options to pass.
	 */
	public constructor(message: Message, options: EventIteratorOptions<MessageReaction> = {}) {
		const { limit, idle, filter = (): boolean => true } = options;

		super(message.client, ClientEvents.MessageReactionAdd, {
			limit,
			idle,
			filter: (react): boolean => react.message === message && filter(react)
		});
	}

}
