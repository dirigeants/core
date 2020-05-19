import { EventIterator, EventIteratorOptions } from '@klasa/event-iterator';
import { StructureIterator } from './base/StructureIterator';
import { Message } from '../../client/caching/structures/Message';
import { DMChannel } from '../../client/caching/structures/channels/DMChannel';
import { ClientEvents } from '../types/Util';
import { GuildTextChannel } from '../../client/caching/structures/channels/GuildTextChannel';

export class MessageIterator extends StructureIterator<Message> {

	public constructor(channel: GuildTextChannel | DMChannel, options: EventIteratorOptions<Message> = {}) {
		const { limit, idle, filter = (): boolean => true } = options;

		super(new EventIterator(channel.client, ClientEvents.MessageCreate, {
			limit,
			idle,
			filter: (message): boolean => message.channel === channel && filter(message)
		}));
	}

}