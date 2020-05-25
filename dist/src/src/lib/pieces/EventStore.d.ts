import { Store } from './base/Store';
import { Event } from './Event';
import type { Client } from '../client/Client';
/**
 * @since 0.0.1
 * The {@link Event} store.
 */
export declare class EventStore extends Store<Event> {
    /**
     * Once events that have already run (so once means once).
     * @since 0.0.1
     */
    private readonly _onceEvents;
    /**
     * @since 0.0.1
     * @param client The client this Store was created with
     */
    constructor(client: Client);
    /**
     * Loads a piece into Klasa so it can be saved in this store.
     * @since 0.0.1
     * @param file A string or array of strings showing where the file is located.
     * @param core If the file is located in the core directory or not
     */
    load(directory: string, file: readonly string[]): Promise<Event | null>;
    /**
     * Clears the events from the store and removes the listeners.
     * @since 0.0.1
     */
    clear(): void;
    /**
     * Deletes an event from the store.
     * @since 0.0.1
     * @param name An event object or a string representing the event name.
     * @returns Whether or not the delete was successful.
     */
    delete(name: Event | string): boolean;
    /**
     * Sets up an event in our store.
     * @since 0.0.1
     * @param piece The event piece we are setting up
     */
    set(piece: Event): Event | null;
}
