import { Cache } from '@klasa/cache';
import { Message } from '../../client/caching/structures/Message';
import { EventIterator } from '@klasa/event-iterator';
import { DMChannel } from '../../client/caching/structures/channels/DMChannel';
import { ClientEvents } from '../types/Util';
import { GuildTextChannel } from '../../client/caching/structures/channels/GuildTextChannel';

export interface MessageIteratorOptions {
	idle?: number;
	filter?: (message: Message, collected: Cache<string, Message>) => boolean;
}

export class MessageIterator {

	public collected = new Cache<string, Message>();

	#iterator: EventIterator<Message>;

	public constructor(channel: GuildTextChannel | DMChannel, limit: number, options: MessageIteratorOptions = {}) {
		const { idle, filter = (): boolean => true } = options;
		this.#iterator = new EventIterator(channel.client, ClientEvents.MessageCreate, limit, { idle, filter: (message): boolean => message.channel === channel && filter(message, this.collected) });
	}

	public async collectAll(): Promise<Cache<string, Message>> {
		for await (const __ of this) {
			// noop
		}
		return this.collected;
	}

	public async *[Symbol.asyncIterator](): AsyncIterableIterator<Message> {
		for await (const message of this.#iterator) {
			this.collected.set(message.id, message);
			yield message;
		}
	}

}
