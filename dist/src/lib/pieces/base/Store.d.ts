import { Cache } from '@klasa/cache';
import { Client } from '../../client/Client';
import type { Piece } from './Piece';
export declare type PieceConstructor<T> = new (...args: ConstructorParameters<typeof Piece>) => T;
/**
 * @since 0.0.1
 * The common base for all stores.
 */
export declare class Store<V extends Piece> extends Cache<string, V> {
    /**
     * The client this Store was created with.
     * @since 0.0.1
     */
    readonly client: Client;
    /**
     * The name of this store.
     * @since 0.0.1
     */
    readonly name: string;
    /**
     * The type of structure this store holds.
     * @since 0.0.1
     */
    readonly holds: PieceConstructor<V>;
    /**
     * The core directories pieces of this store can hold.
     * @since 0.0.1
     */
    private readonly coreDirectories;
    /**
     * @since 0.0.1
     * @param client The client this Store was created with
     * @param name The name of this store
     * @param holds The type of structure this store holds
     */
    constructor(client: Client, name: string, holds: PieceConstructor<V>);
    /**
     * The directory of local pieces relative to where you run Klasa from.
     * @since 0.0.1
     */
    get userDirectory(): string;
    /**
     * Registers a core directory to check for pieces.
     * @since 0.0.1
     * @param directory The directory to check for core pieces
     */
    registerCoreDirectory(directory: string): this;
    /**
     * Initializes all pieces in this store.
     * @since 0.0.1
     */
    init(): Promise<Array<any>>;
    /**
     * Loads a piece into Klasa so it can be saved in this store.
     * @since 0.0.1
     * @param directory The directory the file is located in
     * @param file A string or array of strings showing where the file is located.
     */
    load(directory: string, file: readonly string[]): Promise<V | null>;
    /**
     * Loads all of our Pieces from both the user and core directories.
     * @since 0.0.1
     * @returns The number of Pieces loaded.
     */
    loadAll(): Promise<number>;
    /**
     * Adds and sets up a piece in our store.
     * @since 0.0.1
     * @param piece The piece we are setting up
     */
    add(piece: V): V | null;
    /**
     * Removes a piece from the store.
     * @since 0.0.1
     * @param name A piece instance or a string representing a piece or alias name
     * @returns Whether or not the removal was successful.
     */
    remove(name: V | string): boolean;
    /**
     * The overriden set method, this will always throw.
     * @internal
     */
    set(): never;
    /**
     * The overriden delete method, this will always throw.
     * @internal
     */
    delete(): never;
    /**
     * Resolve a string or piece into a piece object.
     * @since 0.0.1
     * @param name The piece object or a string representing a piece's name
     */
    resolve(name: V | string): V | null;
    /**
     * Defines toString behavior for stores
     * @since 0.0.1
     * @returns This store name
     */
    toString(): string;
    /**
     * Walks our directory of Pieces for the user and core directories.
     * @since 0.0.1
     * @param store The store we're loading into
     * @param directory The directory to walk in
     */
    private static walk;
    static get [Symbol.species](): typeof Cache;
}
