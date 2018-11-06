export type BitFieldResolvable = string | number | BitField | string[] | number [] | BitField[];

export default class BitField {

	private bitfield: number;

	public constructor(bits: BitFieldResolvable) {
		const constructor = <typeof BitField> this.constructor;
		this.bitfield = constructor.resolve(bits);
	}

	public equals(bit: BitFieldResolvable): boolean {
		const constructor = <typeof BitField> this.constructor;
		return this.bitfield === constructor.resolve(bit);
	}

	public has(bit: BitFieldResolvable, ..._hasParams: any[]): boolean {
		const constructor = <typeof BitField> this.constructor;
		if (Array.isArray(bit)) return (bit as (string | number | BitField)[]).every((p) => this.has(p));
		bit = constructor.resolve(bit);
		return (this.bitfield & bit) === bit;
	}

	public missing(bits: BitFieldResolvable, ...hasParams: any[]): Array<BitFieldResolvable> {
		const constructor = <typeof BitField> this.constructor;
		if (!Array.isArray(bits)) bits = new constructor(bits).toArray(false);
		return (bits as (string | number | BitField)[]).filter((p) => !this.has(p, ...hasParams));
	}

	public freeze(): this {
		return Object.freeze(this);
	}

	public add(...bits: BitFieldResolvable[]): BitField {
		const constructor = <typeof BitField> this.constructor;
		let total = 0;
		for (const bit of bits) total |= constructor.resolve(bit);
		if (Object.isFrozen(this)) return new constructor(this.bitfield | total);
		this.bitfield |= total;
		return this;
	}

	public remove(...bits: BitFieldResolvable[]): BitField {
		const constructor = <typeof BitField> this.constructor;
		let total = 0;
		for (const bit of bits) total |= constructor.resolve(bit);
		if (Object.isFrozen(this)) return new constructor(this.bitfield & ~total);
		this.bitfield &= ~total;
		return this;
	}

	public serialize(...hasParams: any[]): any {
		const constructor = <typeof BitField> this.constructor;
		const serialized = {};
		for (const perm in constructor.FLAGS) serialized[perm] = this.has(perm, ...hasParams);
		return serialized;
	}

	public toArray(...hasParams: any[]): Array<string> {
		const constructor = <typeof BitField> this.constructor;
		return Object.keys(constructor.FLAGS).filter((bit) => this.has(bit, ...hasParams));
	}

	public toJSON(): number {
		return this.bitfield;
	}

	public valueOf(): number {
		return this.bitfield;
	}

	public *[Symbol.iterator](): IterableIterator<string> {
		yield* this.toArray();
	}

	public static FLAGS: any = {};

	public static resolve(bit: BitFieldResolvable = 0): number {
		if (typeof bit === 'number' && bit >= 0) return bit;
		if (bit instanceof BitField) return bit.bitfield;
		if (Array.isArray(bit)) return (bit as (string | number | BitField)[]).map((p) => this.resolve(p)).reduce((prev, p) => prev | p, 0);
		if (typeof bit === 'string') return this.FLAGS[bit];
		throw new RangeError('BITFIELD_INVALID');
	}

}
