import { Cache } from '@klasa/cache';
import { EventIterator } from '@klasa/event-iterator';
import { StructureIterator } from './base/StructureIterator';
import { Message } from '../../client/caching/structures/Message';
import { DMChannel } from '../../client/caching/structures/channels/DMChannel';
import { ClientEvents } from '../types/Util';
import { GuildTextChannel } from '../../client/caching/structures/channels/GuildTextChannel';

export interface MessageIteratorOptions {
	idle?: number;
	filter?: (message: Message, collected: Cache<string, Message>) => boolean;
}

export class MessageIterator extends StructureIterator<Message> {

	public constructor(channel: GuildTextChannel | DMChannel, limit: number, options: MessageIteratorOptions = {}) {
		const { idle, filter = (): boolean => true } = options;

		super(new EventIterator(channel.client, ClientEvents.MessageCreate, limit, {
			idle,
			filter: (message): boolean => message.channel === channel && filter(message, this.collected)
		}));
	}

}
