import { Cache } from '@klasa/cache';
import type { EventIterator } from '@klasa/event-iterator';
import type { Structure } from '../../../caching/structures/base/Structure';
/**
 * The base structure collector for asynchronously collecting values.
 * @since 0.0.1
 */
export declare class StructureCollector<T extends Structure, I extends EventIterator<T>> {
    #private;
    /**
     * The collected values.
     * @since 0.0.1
     */
    protected collected: Cache<string, T>;
    /**
     * @since 0.0.1
     * @param iterator The EventIterator that is yielding values.
     */
    constructor(iterator: I);
    /**
     * Collect's the values into the Collector's cache.
     * @since 0.0.1
     */
    collect(): Promise<Cache<string, T>>;
}
