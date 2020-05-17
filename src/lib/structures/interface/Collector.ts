import type { EventEmitter } from 'events';

export type CollectorFilter<K, V> = (value: V, key: K, collected: [K, V][]) => boolean;

export interface CollectorOptions<K, V> {
	event: string;
	filter?: CollectorFilter<K, V>;
}

export abstract class Collector<K, V> implements AsyncIterableIterator<[K, V]> {

	public ended = false;

	public filter: CollectorFilter<K, V>;

	public event: string;

	#queue: [K, V][] = [];

	#collected = 0;

	public constructor(public readonly emitter: EventEmitter, options: CollectorOptions<K, V>) {
		this.filter = options.filter ?? ((): boolean => true);

		this.event = options.event;

		this.push = this.push.bind(this);
		this.emitter.on(this.event, this.push);
	}

	public get collected(): number {
		return this.#collected;
	}

	public get queue(): [K, V][] {
		return this.#queue.slice();
	}

	public push(key: K, value: V): void {
		if (this.filter(value, key, this.queue)) this.#queue.push([key, value]);
	}

	public end(): void {
		this.ended = true;
		this.emitter.off(this.event, this.push);
	}

	public async next(): Promise<IteratorResult<[K, V]>> {
		if (this.#queue.length) return { done: false, value: this.#queue.shift() as [K, V] };
		if (this.ended) return { done: true, value: undefined as never };
		return new Promise<IteratorResult<[K, V]>>((resolve): void => {
			this.emitter.once(this.event, (): void => {
				resolve(this.next());
			});
		});
	}

	public [Symbol.asyncIterator](): AsyncIterableIterator<[K, V]> {
		return this;
	}

}
