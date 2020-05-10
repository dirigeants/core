import { Cache } from '@klasa/cache';

import { Client } from '../../../Client';
import { Structure } from '../../structures/base/Structure';

/**
 * The data caches with extra methods unique to each data store
 */
export class DataStore<S extends Structure, VConstructor extends new (...args: any[]) => S> extends Cache<string, S> {

	public constructor(public readonly client: Client, protected readonly Holds: VConstructor, iterable?: Iterable<S>) {
		super();
		if (iterable) for (const item of iterable) this.add(item);
	}

	/**
	 * Adds a new structure to this DataStore
	 * @param data The data packet to add
	 * @param cache If the data should be cached
	 */
	public add(data: { id: string, [k: string]: any }, cache = true): S {
		const existing = this.get(data.id);
		// eslint-disable-next-line dot-notation
		if (existing) return existing['_patch'](data);

		const entry = new this.Holds(this.client, data);
		if (cache) this.set(entry.id, entry);
		return entry;
	}

	/**
	 * Resolves data into Structures
	 * @param data The data to resolve
	 */
	public resolve(data: S | string): S | null {
		if (typeof data === 'string') return this.get(data) || null;
		if (data instanceof this.Holds) return data;
		return null;
	}

	/**
	 * Resolves data into ids
	 * @param data The data to resolve
	 */
	public resolveID(data: S | string): string | null {
		if (typeof data === 'string') return data;
		if (data instanceof this.Holds) return data.id;
		return null;
	}

	/**
	 * Defines the extensibility of DataStores
	 */
	public static get [Symbol.species](): typeof Cache {
		return Cache;
	}

}
