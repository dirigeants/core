import Client from '../../client/Client';

/**
 * The base class for Structures
 */
export default abstract class Base {

	/**
	 * The id to be defined in Structures
	 */
	public abstract readonly id: string;

	public constructor(public readonly client: Client) { }

	/**
	 * Basic clone method
	 */
	public clone<T = Base>(): T {
		return Object.assign(Object.create(this), this);
	}

	/**
	 * The method of patching this instance defined in Structures
	 * @param data The data packet
	 */
	public abstract patch(data: object): this;

	/**
	 * The basic value of this Structure
	 */
	public valueOf(): string {
		return this.id;
	}

}
