import { Store } from './base/Store';
import { Action } from './Action';
import type { Client } from '../client/Client';
/**
 * @since 0.0.1
 * The {@link Action} store.
 */
export declare class ActionStore extends Store<Action> {
    /**
     * @since 0.0.1
     * @param client The client this Store was created with
     */
    constructor(client: Client);
    /**
     * Clears the actions from the store and removes the listeners.
     * @since 0.0.1
     */
    clear(): void;
    /**
     * Deletes an action from the store.
     * @since 0.0.1
     * @param name An action object or a string representing the action name.
     * @returns Whether or not the delete was successful.
     */
    delete(name: Action | string): boolean;
    /**
     * Sets up an action in our store.
     * @since 0.0.1
     * @param piece The event piece we are setting up
     */
    set(piece: Action): Action | null;
}
