export interface BitFieldObject {
	bitfield: number;
}

export type BitFieldResolvable = keyof typeof BitField.FLAGS | number | BitFieldObject | (keyof typeof BitField.FLAGS | number | BitFieldObject)[];

/* eslint-disable no-bitwise */

/**
 * The base class for handling BitField data
 */
export class BitField<Flags = keyof typeof BitField.FLAGS,
	T = Flags | 'ALL' | 'DEFAULT' | number | BitFieldObject | (Flags | number | BitFieldObject)[]
> implements BitFieldObject {

	/**
	 * The bitfield data
	 */
	public bitfield: number;

	public constructor(bits?: T) {
		const constructor = this.constructor as typeof BitField;
		this.bitfield = constructor.resolve<T>(bits);
	}

	/**
	 * Checks if this BitField matches another bitfield resolvable
	 * @param bit The bit/s to check
	 */
	public equals(bit: T): boolean {
		const constructor = this.constructor as typeof BitField;
		return this.bitfield === constructor.resolve(bit);
	}

	/**
	 * Checks if this BitField has a bit or bits
	 * @param bit The bit/s to check
	 * @param _hasParams Additional params to pass to child has methods
	 */
	public has(bit: T, ...hasParams: any[]): boolean {
		const constructor = this.constructor as typeof BitField;
		if (Array.isArray(bit)) return (bit as T[]).every((byte) => this.has(byte, ...hasParams));
		const bits = constructor.resolve<T>(bit);
		return (this.bitfield & bits) === bits;
	}

	/**
	 * Returns any bits this BitField is missing
	 * @param bits The bit/s to check for
	 * @param hasParams Additional params to pass to child has methods
	 */
	public missing(bits: T, ...hasParams: any[]): string[] {
		const constructor = this.constructor as typeof BitField;
		const strings = new constructor(bits).toArray(false);
		return strings.filter((byte) => !this.has(byte as unknown as T, ...hasParams));
	}

	/**
	 * Freezes this BitField
	 */
	public freeze(): this {
		return Object.freeze(this);
	}

	/**
	 * Adds a bit to this BitField or a new Bitfield if this is frozen
	 * @param bits The bit/s to add
	 */
	public add(...bits: T[]): BitField<Flags, T> {
		const constructor = this.constructor as typeof BitField;
		let total = 0;
		for (const bit of bits) total |= constructor.resolve<T>(bit);
		if (Object.isFrozen(this)) return new constructor<Flags, T>((this.bitfield | total) as unknown as T);
		this.bitfield |= total;
		return this;
	}

	/**
	 * Removes a bit to this BitField or a new Bitfield if this is frozen
	 * @param bits The bit/s to remove
	 */
	public remove(...bits: T[]): BitField<Flags, T> {
		const constructor = this.constructor as typeof BitField;
		let total = 0;
		for (const bit of bits) total |= constructor.resolve<T>(bit);
		if (Object.isFrozen(this)) return new constructor<Flags, T>((this.bitfield & ~total) as unknown as T);
		this.bitfield &= ~total;
		return this;
	}

	/**
	 * Returns an object of flags: boolean
	 * @param hasParams Additional params to pass to child has methods
	 */
	public serialize(...hasParams: any[]): any {
		const constructor = this.constructor as typeof BitField;
		const serialized: Record<string, boolean> = {};
		for (const bit of Object.keys(constructor.FLAGS)) serialized[bit] = this.has(bit as unknown as T, ...hasParams);
		return serialized;
	}

	/**
	 * Returns an array of Flags that make up this BitField
	 * @param hasParams Additional params to pass to child has methods
	 */
	public toArray(...hasParams: any[]): string[] {
		const constructor = this.constructor as typeof BitField;
		return Object.keys(constructor.FLAGS).filter((bit) => this.has(bit as unknown as T, ...hasParams));
	}

	/**
	 * Defines what this Bitfield is when converted to JSON
	 */
	public toJSON(): number {
		return this.bitfield;
	}

	/**
	 * Defines value behavior of this BitField
	 */
	public valueOf(): number {
		return this.bitfield;
	}

	/**
	 * Defines iterable behavior for BitFields
	 */
	public *[Symbol.iterator](): IterableIterator<string> {
		yield* this.toArray();
	}

	/**
	 * Flags for this BitField (Should be implemented in child classes)
	 */
	public static FLAGS: Record<string, number> = {};

	public static DEFAULT = 0;

	/**
	 * The value of all bits in this bitfield
	 */
	public static get ALL(): number {
		return Object.values<number>(this.FLAGS).reduce((all, byte) => all | byte, 0);
	}

	/**
	 * Resolves a BitFieldResolvable into a number
	 * @param bit The bit/s to resolve
	 */
	public static resolve<T>(bit?: T): number {
		if (typeof bit === undefined) return 0;
		if (typeof bit === 'number' && bit >= 0) return bit;
		if (bit instanceof BitField) return bit.bitfield;
		if (Array.isArray(bit)) return (bit as (string | number | BitFieldObject)[]).map((byte) => this.resolve(byte)).reduce((bytes, byte) => bytes | byte, 0);
		if (typeof bit === 'string') {
			if (bit.toLowerCase() === 'all') return this.ALL;
			if (bit.toLowerCase() === 'default') return this.DEFAULT;
			return this.FLAGS[bit];
		}
		throw new RangeError('BITFIELD_INVALID');
	}

}

/* eslint-enable no-bitwise */
