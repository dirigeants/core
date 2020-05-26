import { Cache } from '@klasa/cache';
import type { Client } from '../../../client/Client';
import type { Structure } from '../../structures/base/Structure';
import type { Constructor } from '../../../util/Extender';
/**
 * The data caches with extra methods unique to each data store
 */
export declare class DataStore<S extends Structure> extends Cache<string, S> {
    #private;
    readonly client: Client;
    protected readonly Holds: Constructor<S>;
    constructor(client: Client, Holds: Constructor<S>, limit: number, iterable?: Iterable<S>);
    /**
     * Resolves data into Structures
     * @param data The data to resolve
     */
    resolve(data: unknown): S | null;
    /**
     * Resolves data into ids
     * @param data The data to resolve
     */
    resolveID(data: unknown): string | null;
    /**
     * Sets a value to this DataStore taking into account the cache limit.
     * @param key The key of the value you are setting
     * @param value The value for the key you are setting
     */
    set(key: string, value: S): this;
    /**
     * Adds a new structure to this DataStore
     * @param data The data packet to add
     * @param cache If the data should be cached
     */
    protected _add(data: Record<string, any>): S;
    /**
     * Defines the extensibility of DataStores
     */
    static get [Symbol.species](): typeof Cache;
    /**
     * The JSON representation of this object.
     */
    toJSON(): string[];
}
