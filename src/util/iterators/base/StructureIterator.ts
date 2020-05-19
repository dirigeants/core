import { Cache } from '@klasa/cache';
import { EventIterator } from '@klasa/event-iterator';

import type { Structure } from '../../../client/caching/structures/base/Structure';

export class StructureIterator<T extends Structure> {

	public collected = new Cache<string, T>();

	#iterator: EventIterator<T>;

	public constructor(iterator: EventIterator<T>) {
		this.#iterator = iterator;
	}

	public async collectAll(): Promise<Cache<string, T>> {
		for await (const __ of this) {
			// noop
		}
		return this.collected;
	}

	public async *[Symbol.asyncIterator](): AsyncIterableIterator<T> {
		for await (const struct of this.#iterator) {
			this.collected.set(struct.id, struct);
			yield struct;
		}
	}

}
