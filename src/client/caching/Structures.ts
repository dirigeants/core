import { Cache } from '@klasa/cache';

class Extender<T extends ExtenderStructures> extends Cache<keyof T, T[keyof T]> {

	public add<K extends string, V>(key: K, fn: V): Extender<Added<T, K, V>> {
		if (super.has(key as keyof T)) throw new Error(`The structure ${key} already exists.`);
		super.set(key as keyof T, fn as unknown as T[keyof T]);
		return this as Extender<Added<T, K, V>>;
	}

	public set(_key: keyof T, _value: T[keyof T]) {
		throw new Error('Cannot set keys to this extender.');
	}

	public get<K extends keyof T>(key: K): T[K] | undefined {
		return super.get(key) as T[K];
	}

	public extend<K extends keyof T, R extends T[K]>(key: K, fn: ExtenderCallback<T[K], R>): Extender<Extended<T, K, R>> {
		const structure = this.get(key);
		if (typeof structure === 'undefined') throw new TypeError(`The structure ${key} does not exist.`);
		super.set(key, fn(structure));
		return this as unknown as Extender<Extended<T, K, R>>;
	}

}

export const extender = new Extender();

export interface ExtenderStructures {
	[K: string]: never;
}

export interface ExtenderCallback<T, R> {
	(structure: T): R;
}

type Added<T, K extends string, V> = T & { [P in K]: V };
type Extended<T, K extends keyof T, V extends T[K]> = { [P in keyof T]: K extends P ? V : T[P] };
