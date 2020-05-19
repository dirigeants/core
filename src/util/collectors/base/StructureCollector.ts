import { Cache } from '@klasa/cache';

import type { Structure } from '../../../client/caching/structures/base/Structure';
import type { StructureIterator } from '../../iterators/base/StructureIterator';

export class StructureCollector<T extends Structure, I extends StructureIterator<T>> {

	public collected = new Cache<string, T>();

	#iterator: I;

	public constructor(iterator: I) {
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
