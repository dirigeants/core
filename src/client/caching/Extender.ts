import { Cache } from '@klasa/cache';

/**
 * The extender class that allows the extension of built-in structures from Project-Blue and plugins.
 */
class Extender extends Cache<keyof ExtenderStructures, ExtenderStructures[keyof ExtenderStructures]> {

	/**
	 * Adds a new entry to this instance so it can be extended. Throws if a structure with the same name was already set.
	 * @param key The name of the structure to be set
	 * @param fn The class to be added to the registry
	 */
	public add<K extends keyof ExtenderStructures, V>(key: K, fn: V): this {
		if (super.has(key)) throw new Error(`The structure ${key} already exists.`);
		super.set(key, fn as unknown as ExtenderStructures[keyof ExtenderStructures]);
		return this;
	}

	/**
	 * The overriden set method, this will always throw. Use {@link Extender#add} for adding new structures, or {@link Extender#extend} to extend an existing one.
	 * @internal
	 */
	public set(): never {
		throw new Error('Cannot set keys to this extender.');
	}

	/**
	 * The overriden delete method, this will always throw.
	 * @internal
	 */
	public delete(): never {
		throw new Error('Cannot delete keys from this extender.');
	}

	/**
	 * The overriden get method, this extension makes it type-safe.
	 * @param key The structure to get from its name
	 */
	public get<K extends keyof ExtenderStructures>(key: K): ExtenderStructures[K] | undefined {
		return super.get(key);
	}

	/**
	 * Extends a structure by its registered name.
	 * @param key The name of the structure to be extended
	 * @param fn A callback returning the extended class
	 * @example
	 * const { extender } = require('@klasa/project-blue');
	 * const { Settings } = require('@klasa/project-red');
	 *
	 * extender.extend('TextChannel', (TextChannel) => class extends TextChannel {
	 *
	 *   constructor(...args) {
	 *     super(...args);
	 *     this.settings = new Settings(this.client, 'textChannels', this.id);
	 *   }
	 *
	 * });
	 */
	public extend<K extends keyof ExtenderStructures, R extends ExtenderStructures[K]>(key: K, fn: (structure: ExtenderStructures[K]) => R): this {
		const structure = this.get(key);
		if (typeof structure === 'undefined') throw new TypeError(`The structure ${key} does not exist.`);
		super.set(key, fn(structure));
		return this;
	}

}

/**
 * The context data for Extender.
 */
export interface ExtenderStructures {
	// TODO(): add actual structures and remove this line. It is only there so `keyof T` does not error.
	[K: string]: never;
}

/**
 * The exported singleton instance of the {@link Extender} class.
 */
export const extender = new Extender();
