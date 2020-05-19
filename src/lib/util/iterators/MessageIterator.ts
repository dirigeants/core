import { EventIterator, EventIteratorOptions } from '@klasa/event-iterator';
import { Message } from '../../caching/structures/Message';
import { DMChannel } from '../../caching/structures/channels/DMChannel';
import { ClientEvents } from '../types/Util';
import { GuildTextChannel } from '../../caching/structures/channels/GuildTextChannel';

/**
 * An asynchronous iterator responsible for iterating over messages.
 * @since 0.0.1
 */
export class MessageIterator extends EventIterator<Message> {

	/**
	 * Construct's a new MessageIterator.
	 * @since 0.0.1
	 * @param channel The channel to listen for messages.
	 * @param options Any additional options to pass.
	 */
	public constructor(channel: GuildTextChannel | DMChannel, options: EventIteratorOptions<Message> = {}) {
		const { limit, idle, filter = (): boolean => true } = options;

		super(channel.client, ClientEvents.MessageCreate, {
			limit,
			idle,
			filter: (message): boolean => message.channel === channel && filter(message)
		});
	}

}
