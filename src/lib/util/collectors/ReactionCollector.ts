import { Cache } from '@klasa/cache';
import { Message } from '../../caching/structures/Message';
import { StructureCollector } from './base/StructureCollector';
import { MessageReaction } from '../../caching/structures/messages/reactions/MessageReaction';
import { ReactionIterator } from '../iterators/ReactionIterator';

export interface ReactionCollectorOptions {
	limit?: number;
	idle?: number;
	filter?: (reaction: MessageReaction, collected: Cache<string, MessageReaction>) => boolean;
}

export class ReactionCollector extends StructureCollector<MessageReaction, ReactionIterator> {

	public constructor(message: Message, options: ReactionCollectorOptions = {}) {
		if (!options.limit && !options.idle) throw new Error('Collectors need either a limit or idle, or the collector will collect forever.');
		const { limit, idle, filter = (): boolean => true } = options;

		super(new ReactionIterator(message, {
			limit,
			idle,
			filter: (react): boolean => react.message === message && filter(react, this.collected)
		}));
	}

}
