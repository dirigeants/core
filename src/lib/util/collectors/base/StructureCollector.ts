import { Cache } from '@klasa/cache';

import type { EventIterator } from '@klasa/event-iterator';
import type { Structure } from '../../../caching/structures/base/Structure';

/**
 * The base structure collector for asynchronously collecting values.
 * @since 0.0.1
 */
export class StructureCollector<T extends Structure, I extends EventIterator<T>> {

	/**
	 * The collected values.
	 * @since 0.0.1
	 */
	protected collected = new Cache<string, T>();

	/**
	 * The event iterator that's yielding values.
	 * @since 0.0.1
	 */
	#iterator: I;

	/**
	 * @since 0.0.1
	 * @param iterator The EventIterator that is yielding values.
	 */
	public constructor(iterator: I) {
		this.#iterator = iterator;
	}

	/**
	 * Collect's the values into the Collector's cache.
	 * @since 0.0.1
	 */
	public async collect(): Promise<Cache<string, T>> {
		for await (const struct of this.#iterator) this.collected.set(struct.id, struct);
		return this.collected;
	}

}
