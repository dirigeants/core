import { Cache } from '@klasa/cache';
import { MessageIterator } from '../iterators/MessageIterator';
import { StructureCollector } from './base/StructureCollector';
import { Message } from '../../client/caching/structures/Message';
import { DMChannel } from '../../client/caching/structures/channels/DMChannel';
import { GuildTextChannel } from '../../client/caching/structures/channels/GuildTextChannel';

export interface MessageCollectorOptions {
	idle?: number;
	filter?: (message: Message, collected: Cache<string, Message>) => boolean;
}

export class MessageCollector extends StructureCollector<Message, MessageIterator> {

	public constructor(channel: GuildTextChannel | DMChannel, limit: number, options: MessageCollectorOptions = {}) {
		const { idle, filter = (): boolean => true } = options;

		super(new MessageIterator(channel, limit, {
			idle,
			filter: (message): boolean => filter(message, this.collected)
		}));
	}

}
