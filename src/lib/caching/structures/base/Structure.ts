import type { Client } from '../../../client/Client';

/**
 * The base class for Structures
 */
export abstract class Structure<T = Client> {

	/**
	 * The id to be defined in Structures
	 */
	public abstract readonly id: string;

	// eslint-disable-next-line no-useless-constructor
	public constructor(public readonly client: T) { }

	/**
	 * Basic clone method
	 */
	public clone<V = Structure>(): V {
		return Object.assign(Object.create(this), this);
	}

	/**
	 * The method of patching this instance defined in Structures
	 * @param data The data packet
	 */
	protected abstract _patch(data: unknown): this;

	/**
	 * The basic value of this Structure
	 */
	public valueOf(): string {
		return this.id;
	}

}
