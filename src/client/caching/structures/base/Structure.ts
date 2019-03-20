import Client from '../../../Client.ts';

/**
 * The base class for Structures
 */
export default abstract class Structure {

	/**
	 * The id to be defined in Structures
	 */
	public abstract readonly id: string;

	public constructor(public readonly client: Client) { }

	/**
	 * Basic clone method
	 */
	public clone<T = Structure>(): T {
		return Object.assign(Object.create(this), this);
	}

	/**
	 * The method of patching this instance defined in Structures
	 * @param data The data packet
	 */
	public abstract patch(data: any): this;

	/**
	 * The basic value of this Structure
	 */
	public valueOf(): string {
		return this.id;
	}

}
