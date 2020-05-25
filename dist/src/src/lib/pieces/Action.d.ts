import { Event, EventOptions } from './Event';
import type { ActionStore } from './ActionStore';
import type { DispatchPayload } from '@klasa/ws';
import type { Structure } from '../caching/structures/base/Structure';
/**
 * The common class for all actions.
 */
export declare abstract class Action<T extends DispatchPayload = DispatchPayload, S extends Structure = Structure> extends Event {
    /**
     * The name of the event that the {@link Client} will fire.
     * @since 0.0.1
     */
    readonly clientEvent: string;
    /**
     * @since 0.0.1
     * @param store The store this piece is for
     * @param directory The base directory to the pieces folder
     * @param file The path from the pieces folder to the piece file
     * @param options The options for this piece
     */
    constructor(store: ActionStore, directory: string, file: readonly string[], options?: ActionOptions);
    /**
     * Processes the event data from the websocket.
     * @since 0.0.1
     * @param data The raw data from {@link Client#ws}
     */
    run(data: T): void;
    /**
     * Checks whether or not the data structure was already cached, returning it if it was.
     * @since 0.0.1
     * @param data The raw data from {@link Client#ws}
     */
    abstract check(data: T): S | null;
    /**
     * Builds the structure from raw data.
     * @param data The raw data from {@link Client#ws}
     */
    abstract build(data: T): S | null;
    /**
     * Stores the data into the cache.
     * @param data The build structure from {@link Action#build} to be cached
     */
    abstract cache(data: S): void;
}
/**
 * The piece options for all {@link Action} instances.
 */
export interface ActionOptions extends EventOptions {
    /**
     * The name of the event from {@link Client} to be fired.
     */
    clientEvent?: string;
    /**
     * @internal
     */
    once?: never;
    /**
     * @internal
     */
    emitter?: never;
}
