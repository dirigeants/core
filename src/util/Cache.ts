/**
 * The cache structure Project-Blue uses
 */
export class Cache<K, V> extends Map<K, V> {

	/**
	 * The first item in this Cache
	 */
	public get first(): [K, V] | null {
		return this.size ? this.entries().next().value : null;
	}

	/**
	 * The first value of this cache
	 */
	public get firstValue(): V | null {
		return this.size ? this.values().next().value : null;
	}

	/**
	 * The first key of this cache
	 */
	public get firstKey(): K | null {
		return this.size ? this.keys().next().value : null;
	}

	/**
	 * The last item in this cache
	 */
	public get last(): [K, V] | null {
		return this.size ? [...this.entries()][this.size - 1] : null;
	}

	/**
	 * The last value of this cache
	 */
	public get lastValue(): V | null {
		return this.size ? [...this.values()][this.size - 1] : null;
	}

	/**
	 * The last key of this cache
	 */
	public get lastKey(): K | null {
		return this.size ? [...this.keys()][this.size - 1] : null;
	}

	/**
	 * Finds an entry from this Cache
	 * @param fn Function used to find what you are looking for
	 * @param thisArg Optional binding for the fn param
	 */
	public find(fn: (value: V, key: K, map: this) => boolean, thisArg?: any): [K, V] | void {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);

		for (const [key, val] of this) if (fn(val, key, this)) return [key, val];
		return undefined;
	}

	/**
	 * Finds a key from this Cache
	 * @param fn Function used to find what you are looking for
	 * @param thisArg Optional binding for the fn param
	 */
	public findKey(fn: (value: V, key: K, map: this) => boolean, thisArg?: any): K | void {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);

		for (const [key, val] of this) if (fn(val, key, this)) return key;
		return undefined;
	}

	/**
	 * Finds a value from this Cache
	 * @param fn Function used to find what you are looking for
	 * @param thisArg Optional binding for the fn param
	 */
	public findValue(fn: (value: V, key: K, map: this) => boolean, thisArg?: any): V | void {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);

		for (const [key, val] of this) if (fn(val, key, this)) return val;
		return undefined;
	}

	/**
	 * Sweeps entries from this Cache
	 * @param fn Function used to determine what entries are swept
	 * @param thisArg Optional binding for the fn param
	 */
	public sweep(fn: (value: V, key: K, map: this) => boolean, thisArg?: any): number {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);

		const previousSize = this.size;
		for (const [key, val] of this) if (fn(val, key, this)) this.delete(key);
		return previousSize - this.size;
	}

	/**
	 * Returns a new filtered Cache based on the filter function
	 * @param fn Function used to determine what entries are in the new Cache
	 * @param thisArg Optional binding for the fn param
	 */
	public filter(fn: (value: V, key: K, map: this) => boolean, thisArg?: any): Cache<K, V> {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);

		const results = new (this.constructor as typeof Cache)[Symbol.species]() as Cache<K, V>;
		for (const [key, val] of this) if (fn(val, key, this)) results.set(key, val);
		return results;
	}

	/**
	 * Maps this Cache to an array (like Array#map())
	 * @param fn Function to determine what is mapped to the new Array
	 * @param thisArg Optional binding for the fn param
	 */
	public map(fn: (value: V, key: K, map: this) => any, thisArg?: any): Array<any> {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);

		const arr = [];
		let i = 0;
		for (const [key, val] of this) arr[i++] = fn(val, key, this);
		return arr;
	}

	/**
	 * Tests if some entries in this cache meets a condition
	 * @param fn The function to test the condition
	 * @param thisArg Optional binding for the fn param
	 */
	public some(fn: (value: V, key: K, map: this) => boolean, thisArg?: any): boolean {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);

		for (const [key, val] of this) if (fn(val, key, this)) return true;
		return false;
	}

	/**
	 * Tests if every entry in this cache meets a condition
	 * @param fn The function to test the condition
	 * @param thisArg Optional binding for the fn param
	 */
	public every(fn: (value: V, key: K, map: this) => boolean, thisArg?: any): boolean {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);

		for (const [key, val] of this) if (!fn(val, key, this)) return false;
		return true;
	}

	/**
	 * Reduces this cache into a singularity
	 * @param fn The function to determine how this Cache is reduced
	 * @param initialValue The initial value
	 * @param thisArg Optional binding for the fn param
	 */
	public reduce<I>(fn: (accumulator: I, value: V, key: K, map: this) => I, initialValue: I, thisArg?: any): I {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		let accumulator = initialValue;

		for (const [key, val] of this) accumulator = fn(accumulator, val, key, this);
		return accumulator;
	}

	/**
	 * Returns a shallow clone of this Cache
	 */
	public clone(): Cache<K, V> {
		return new (this.constructor as typeof Cache)[Symbol.species](this) as Cache<K, V>;
	}

	/**
	 * Returns a new Cache with this and other caches together
	 * @param caches Other caches to include in the new cache
	 */
	public concat(...caches: Array<Cache<K, V>>): Cache<K, V> {
		const newColl = this.clone();
		for (const coll of caches) for (const [key, val] of coll) newColl.set(key, val);
		return newColl;
	}

	/**
	 * Naive equality compare function
	 * @param cache The cache to compare this against
	 */
	public equals(cache: Cache<K, V>): boolean {
		return this === cache || (this.size === cache.size && this.every((value, key) => cache.get(key) === value));
	}

	/**
	 * Sorts entries in this Cache
	 * @param compareFunction Function to determine how this Cache should be sorted
	 */
	public sort(compareFunction: (v0: V, v1: V, k0?: K, k1?: K) => number = (first, second): number => +(first > second) || +(first === second) - 1): this {
		const entries = [...this.entries()]
			.sort((e0, e1) => compareFunction(e0[1], e1[1], e0[0], e1[0]));
		this.clear();
		for (const [key, value] of entries) this.set(key, value);
		return this;
	}

}
