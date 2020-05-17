import type { EventEmitter } from 'events';

export type CollectorFilter<K, V> = (value: V, key: K, collected: [K, V][]) => boolean | Promise<boolean>;

export interface CollectorOptions<K, V> {
    event: string;
    filter?: CollectorFilter<K, V>;
}

export abstract class Collector<K, V> implements AsyncIterableIterator<[K, V]> {
    public ended = false;

    public filter: CollectorFilter<K, V>;

    public event: string;

    #queue: [K, V][] = [];

    #collected: number = 0;

    public constructor(public readonly emitter: EventEmitter, options: CollectorOptions<K, V>) {
        this.filter = options.filter ?? ((): boolean => true);

        this.event = options.event;
    }

    public get collected(): number {
        return this.#collected;
    }

    public get queue(): [K, V][] {
        return this.#queue.slice();
    }

    public push(key: K, value: V): void {
        this.#queue.push([key, value]);
    }

    public async next(): Promise<IteratorResult<[K, V]>> {
        if (this.#queue.length) {
            const value = this.#queue.shift() as [K, V];
            if (await this.filter(value[1], value[0], this.queue)) {
                this.#collected++;
                return { done: false, value };
            }
        }
        if (this.ended) return { done: true, value: undefined as never };
        return new Promise((resolve): void => {
            this.emitter.once((this.event), (...args: [K, V]): void => {
                resolve({ done: false, value: args });
            });
        });
    }

    public [Symbol.asyncIterator](): AsyncIterableIterator<[K, V]> {
        return this;
    }
}