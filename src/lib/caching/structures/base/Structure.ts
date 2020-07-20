import { Snowflake } from '@klasa/snowflake';
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
	 * The Date when this object was created at
	 */
	public get createdAt(): Date {
		return new Snowflake(this.id).date;
	}

	/**
	 * The time when this object was created at
	 */
	public get createdTimestamp(): number {
		return new Snowflake(this.id).timestamp;
	}

	/**
	 * Basic clone method
	 */
	public clone(): this {
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

	/**
	 * The JSON representation of this object.
	 */
	public toJSON(): Record<string, any> {
		const returnValue: Record<string, any> = {};
		for (const [key, value] of Object.entries(this)) if (key !== 'client') Reflect.set(returnValue, key, value?.id ?? value?.toJSON?.() ?? value);
		return returnValue;
	}

}
