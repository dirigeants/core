import { EventIterator } from '@klasa/event-iterator';

import type { Structure } from '../../../client/caching/structures/base/Structure';

export class StructureIterator<T extends Structure> {

	#iterator: EventIterator<T>;

	public constructor(iterator: EventIterator<T>) {
		this.#iterator = iterator;
	}

	public async *[Symbol.asyncIterator](): AsyncIterableIterator<T> {
		yield* this.#iterator;
	}

}
