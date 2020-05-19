import { Cache } from '@klasa/cache';
import { Message } from '../../client/caching/structures/Message';
import { StructureCollector } from './base/StructureCollector';
import { MessageReaction } from '../../client/caching/structures/messages/reactions/MessageReaction';
import { ReactionIterator } from '../iterators/ReactionIterator';

export interface ReactionCollectorOptions {
	idle?: number;
	filter?: (reaction: MessageReaction, collected: Cache<string, MessageReaction>) => boolean;
}

export class ReactionCollector extends StructureCollector<MessageReaction, ReactionIterator> {

	public constructor(message: Message, limit: number, options: ReactionCollectorOptions = {}) {
		const { idle, filter = (): boolean => true } = options;

		super(new ReactionIterator(message, limit, {
			idle,
			filter: (react): boolean => react.message === message && filter(react, this.collected)
		}));
	}

}
