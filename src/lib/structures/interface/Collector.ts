import { TimerManager } from '@klasa/timer-manager';
import type { Client } from '../../../client/Client';

export type CollectorFilter<K, V> = (value: V, key: K, collector: Collector<K, V>) => boolean | Promise<boolean>;

export abstract class Collector<K, V> implements AsyncIterable<[K, V]> {
    public ended = false;

    #collected: number = 0;

    #queue: [K, V][] = [];

    public constructor(public readonly client: Client, public filter: CollectorFilter<K, V> = (): boolean => true) { }

    public get collected(): number {
        return this.#collected;
    }

    public get queue(): [K, V][] {
        return this.#queue.slice();
    }

    public end(): void {
        this.ended = true;
    }

    public push(key: K, value: V): void {
        this.#queue.push([key, value]);
        this.#collected++;
    }

    public async *[Symbol.asyncIterator](): AsyncIterableIterator<[K, V]> {
        while (this.#queue.length || !this.ended) {
            if (this.#queue.length) {
                yield this.queue.shift() as [K, V];
            } else {
                // Using TimerManager so we can skip to the next tick in the event loop.
                await new Promise((resolve): NodeJS.Timeout => TimerManager.setTimeout(resolve, 0));
            }
        }
    }
}