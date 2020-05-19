import { EventIterator, EventIteratorOptions } from '@klasa/event-iterator';
import { Message } from '../../caching/structures/Message';
import { DMChannel } from '../../caching/structures/channels/DMChannel';
import { ClientEvents } from '../types/Util';
import { GuildTextChannel } from '../../caching/structures/channels/GuildTextChannel';

export class MessageIterator extends EventIterator<Message> {

	public constructor(channel: GuildTextChannel | DMChannel, options: EventIteratorOptions<Message> = {}) {
		const { limit, idle, filter = (): boolean => true } = options;

		super(channel.client, ClientEvents.MessageCreate, {
			limit,
			idle,
			filter: (message): boolean => message.channel === channel && filter(message)
		});
	}

}
