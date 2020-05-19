import { Cache } from '@klasa/cache';
import { MessageIterator } from '../iterators/MessageIterator';
import { StructureCollector } from './base/StructureCollector';
import { Message } from '../../client/caching/structures/Message';
import { DMChannel } from '../../client/caching/structures/channels/DMChannel';
import { GuildTextChannel } from '../../client/caching/structures/channels/GuildTextChannel';

export interface MessageCollectorOptions {
	limit?: number;
	idle?: number;
	filter?: (message: Message, collected: Cache<string, Message>) => boolean;
}

export class MessageCollector extends StructureCollector<Message, MessageIterator> {

	public constructor(channel: GuildTextChannel | DMChannel, options: MessageCollectorOptions = {}) {
		if (!options.limit && !options.idle) throw new Error('Collectors need either a limit or idle, or the collector will collect forever.');
		const { limit, idle, filter = (): boolean => true } = options;

		super(new MessageIterator(channel, {
			limit,
			idle,
			filter: (message): boolean => filter(message, this.collected)
		}));
	}

}
