import { Cache } from '@klasa/cache';

/**
 * The extender class that allows the extension of built-in structures from Project-Blue and plugins.
 */
class Extender<T extends ExtenderStructures> extends Cache<keyof T, T[keyof T]> {

	/**
	 * Adds a new entry to this instance so it can be extended. Throws if a structure with the same name was already set.
	 * @param key The name of the structure to be set
	 * @param fn The class to be added to the registry
	 */
	public add<K extends string, V>(key: K, fn: V): Extender<Added<T, K, V>> {
		if (super.has(key as keyof T)) throw new Error(`The structure ${key} already exists.`);
		super.set(key as keyof T, fn as unknown as T[keyof T]);
		return this as Extender<Added<T, K, V>>;
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
	public get<K extends keyof T>(key: K): T[K] | undefined {
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
	public extend<K extends keyof T, R extends T[K]>(key: K, fn: ExtenderCallback<T[K], R>): Extender<Extended<T, K, R>> {
		const structure = this.get(key);
		if (typeof structure === 'undefined') throw new TypeError(`The structure ${key} does not exist.`);
		super.set(key, fn(structure));
		return this as unknown as Extender<Extended<T, K, R>>;
	}

}

/**
 * The exported singleton instance of the {@link Extender} class.
 */
export const extender = new Extender();

/**
 * The context data for Extender.
 */
export interface ExtenderStructures {
	[K: string]: never;
}

/**
 * The callback definition.
 */
export interface ExtenderCallback<T, R extends T> {
	(structure: T): R;
}

/**
 * An utility to add new properties into a type.
 * @private
 */
type Added<T, K extends string, V> = T & { [P in K]: V };

/**
 * An utility to change a property's value type.
 * @private
 */
type Extended<T, K extends keyof T, V extends T[K]> = { [P in keyof T]: K extends P ? V : T[P] };
