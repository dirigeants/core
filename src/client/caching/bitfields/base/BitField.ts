export type BitFieldResolvable = string | number | BitField | string[] | number[] | BitField[];

/* eslint-disable no-bitwise */

/**
 * The base class for handling BitField data
 */
export class BitField {

	/**
	 * The bitfield data
	 */
	private bitfield: number;

	public constructor(bits: BitFieldResolvable) {
		const constructor = this.constructor as typeof BitField;
		this.bitfield = constructor.resolve(bits);
	}

	/**
	 * Checks if this BitField matches another bitfield resolvable
	 * @param bit The bit/s to check
	 */
	public equals(bit: BitFieldResolvable): boolean {
		const constructor = this.constructor as typeof BitField;
		return this.bitfield === constructor.resolve(bit);
	}

	/**
	 * Checks if this BitField has a bit or bits
	 * @param bit The bit/s to check
	 * @param _hasParams Additional params to pass to child has methods
	 */
	public has(bit: BitFieldResolvable, ...hasParams: any[]): boolean {
		const constructor = this.constructor as typeof BitField;
		if (Array.isArray(bit)) return (bit as (string | number | BitField)[]).every((byte) => this.has(byte, ...hasParams));
		bit = constructor.resolve(bit);
		return (this.bitfield & bit) === bit;
	}

	/**
	 * Returns any bits this BitField is missing
	 * @param bits The bit/s to check for
	 * @param hasParams Additional params to pass to child has methods
	 */
	public missing(bits: BitFieldResolvable, ...hasParams: any[]): BitFieldResolvable[] {
		const constructor = this.constructor as typeof BitField;
		if (!Array.isArray(bits)) bits = new constructor(bits).toArray(false);
		return (bits as (string | number | BitField)[]).filter((byte) => !this.has(byte, ...hasParams));
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
	public add(...bits: BitFieldResolvable[]): BitField {
		const constructor = this.constructor as typeof BitField;
		let total = 0;
		for (const bit of bits) total |= constructor.resolve(bit);
		if (Object.isFrozen(this)) return new constructor(this.bitfield | total);
		this.bitfield |= total;
		return this;
	}

	/**
	 * Removes a bit to this BitField or a new Bitfield if this is frozen
	 * @param bits The bit/s to remove
	 */
	public remove(...bits: BitFieldResolvable[]): BitField {
		const constructor = this.constructor as typeof BitField;
		let total = 0;
		for (const bit of bits) total |= constructor.resolve(bit);
		if (Object.isFrozen(this)) return new constructor(this.bitfield & ~total);
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
		for (const perm of Object.keys(constructor.FLAGS)) serialized[perm] = this.has(perm, ...hasParams);
		return serialized;
	}

	/**
	 * Returns an array of Flags that make up this BitField
	 * @param hasParams Additional params to pass to child has methods
	 */
	public toArray(...hasParams: any[]): string[] {
		const constructor = this.constructor as typeof BitField;
		return Object.keys(constructor.FLAGS).filter((bit) => this.has(bit, ...hasParams));
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

	/**
	 * Resolves a BitFieldResolvable into a number
	 * @param bit The bit/s to resolve
	 */
	public static resolve(bit: BitFieldResolvable = 0): number {
		if (typeof bit === 'number' && bit >= 0) return bit;
		if (bit instanceof BitField) return bit.bitfield;
		if (Array.isArray(bit)) return (bit as (string | number | BitField)[]).map((byte) => this.resolve(byte)).reduce((bytes, byte) => bytes | byte, 0);
		if (typeof bit === 'string') return this.FLAGS[bit];
		throw new RangeError('BITFIELD_INVALID');
	}

}

/* eslint-enable no-bitwise */
