import { Cache } from '@klasa/cache';
import { Store } from './Store';
import type { AliasPiece } from './AliasPiece';
/**
 * @since 0.0.1
 * The common base for all alias stores.
 */
export declare class AliasStore<V extends AliasPiece> extends Store<V> {
    /**
     * The different aliases that represent the arguments in this store.
     * @since 0.0.1
     */
    readonly aliases: Cache<string, V>;
    /**
     * Returns an AliasPiece in the store if it exists by its name or by an alias.
     * @since 0.0.1
     * @param name A argument or alias name
     */
    get(name: string): V | undefined;
    /**
     * Returns a boolean if the AliasPiece or alias is found within the store.
     * @since 0.0.1
     * @param name A piece or alias name
     */
    has(name: string): boolean;
    /**
     * Sets up an AliasPiece in our store.
     * @since 0.0.1
     * @param piece The piece we are setting up
     */
    set(piece: V): V | null;
    /**
     * Deletes an AliasPiece from the store.
     * @since 0.0.1
     * @param name An AliasPiece object or a string representing an AliasPiece or alias name
     * @returns Whether or not the delete was successful.
     */
    delete(name: V | string): boolean;
    /**
     * Clears the AliasPieces and aliases from this store
     * @since 0.0.1
     */
    clear(): void;
}
