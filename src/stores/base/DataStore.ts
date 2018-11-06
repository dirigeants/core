import Client from '../../client/Client';
import Base from '../../structures/base/Base';
import Cache from '../../util/Cache';

export default class DataStore<Structure extends Base, VConstructor extends new (...args) => Structure> extends Cache<string, Structure> {

	public client: Client;
	private holds: VConstructor;

	public constructor(client: Client, holds: VConstructor, iterable?: Iterable<Structure>) {
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

	public resolve(data: Structure | string): Structure | null {
		if (typeof data === 'string') return this.get(data) || null;
		if (data instanceof this.holds) return data;
		return null;
	}

	public resolveID(data: Structure | string): string | null {
		if (typeof data === 'string') return data;
		if (data instanceof this.holds) return data.id;
		return null;
	}

	public static get [Symbol.species](): typeof Cache {
		return Cache;
	}

}
