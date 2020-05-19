import { Cache } from '@klasa/cache';

import type { EventIterator } from '@klasa/event-iterator';
import type { Structure } from '../../../caching/structures/base/Structure';

export class StructureCollector<T extends Structure, I extends EventIterator<T>> {

	protected collected = new Cache<string, T>();

	#iterator: I;

	public constructor(iterator: I) {
		this.#iterator = iterator;
	}

	public async collect(): Promise<Cache<string, T>> {
		for await (const struct of this.#iterator) this.collected.set(struct.id, struct);
		return this.collected;
	}

}
