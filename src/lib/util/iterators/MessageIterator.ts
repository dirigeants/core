import { EventIterator, EventIteratorOptions } from '@klasa/event-iterator';
import { ClientEvents } from '../../client/Client';

import type { DMChannel } from '../../caching/structures/channels/DMChannel';
import type { GuildTextChannel } from '../../caching/structures/channels/GuildTextChannel';
import type { Message } from '../../caching/structures/messages/Message';

export type MessageIteratorOptions = EventIteratorOptions<[Message]>;

/**
 * An asynchronous iterator responsible for iterating over messages.
 * @since 0.0.1
 */
export class MessageIterator extends EventIterator<[Message]> {

	/**
	 * Construct's a new MessageIterator.
	 * @since 0.0.1
	 * @param channel The channel to listen for messages.
	 * @param options Any additional options to pass.
	 */
	public constructor(channel: GuildTextChannel | DMChannel, options: MessageIteratorOptions = {}) {
		const { limit, idle, filter = (): boolean => true } = options;

		super(channel.client, ClientEvents.MessageCreate, {
			limit,
			idle,
			filter: ([message]): boolean => message.channel === channel && filter([message])
		});
	}

}
