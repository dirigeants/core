import Client from '../../client/Client';
import Base from '../../structures/base/Base';

export default class DataStore<Piece extends Base, VConstructor extends new (...args) => Piece> extends Map<string, Piece> {
	public client: Client;
	private holds: VConstructor;

	public constructor(client: Client, holds: VConstructor, iterable?: Iterable<Piece>) {
		super();

		this.client = client;
		this.holds = holds;

		if (iterable) for (const item of iterable) this.add(item);
	}

	// tslint:disable-next-line no-any
	public add(data: { id: string; [k: string]: any }, cache: boolean = true) {
		const existing = this.get(data.id);
		if (existing) return existing.patch(data);

		const entry = new this.holds(this.client, data);
		if (cache) this.set(entry.id, entry);
		return entry;
	}

	public resolve(data: Piece | string): Piece | null {
		if (typeof data === 'string') return this.get(data) || null;
		if (data instanceof this.holds) return data;
		return null;
	}

	public resolveID(data: Piece | string): string | null {
		if (typeof data === 'string') return data;
		if (data instanceof this.holds) return data.id;
		return null;
	}

	public static get [Symbol.species](): typeof Map {
		return Map;
	}

}
