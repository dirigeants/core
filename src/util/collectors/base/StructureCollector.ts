import { Cache } from '@klasa/cache';

import type { Structure } from '../../../client/caching/structures/base/Structure';
import type { StructureIterator } from '../../iterators/base/StructureIterator';

export class StructureCollector<T extends Structure, I extends StructureIterator<T>> {

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
