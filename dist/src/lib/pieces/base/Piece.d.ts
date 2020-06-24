import { Client } from '../../client/Client';
import type { Store } from './Store';
/**
 * The common class for all pieces.
 */
export declare class Piece {
    /**
     * The client this Piece was created with.
     * @since 0.0.1
     */
    readonly client: Client;
    /**
     * The store this Piece is from.
     * @since 0.0.1
     */
    readonly store: Store<Piece>;
    /**
     * The file location where this Piece is stored.
     * @since 0.0.1
     */
    readonly file: readonly string[];
    /**
     * The base directory this Piece is stored in.
     * @since 0.0.1
     */
    readonly directory: string;
    /**
     * The name of the Piece.
     * @since 0.0.1
     */
    name: string;
    /**
     * Whether or not the Piece is enabled.
     * @since 0.0.1
     */
    enabled: boolean;
    /**
     * @since 0.0.1
     * @param store The store this piece is for
     * @param directory The base directory to the pieces folder
     * @param file The path from the pieces folder to the piece file
     * @param options The options for this piece
     */
    constructor(store: Store<Piece>, directory: string, file: readonly string[], options?: PieceOptions);
    /**
     * The type of piece this is
     * @since 0.0.1
     */
    get type(): string;
    /**
     * The absolute path to this piece
     * @since 0.0.1
     */
    get path(): string;
    /**
     * Reloads this piece
     * @since 0.0.1
     * @returns The newly loaded piece
     */
    reload(): Promise<Piece | null>;
    /**
     * Unloads this piece
     * @since 0.0.1
     */
    unload(): boolean;
    /**
     * Disables this piece
     * @since 0.0.1
     * @chainable
     */
    disable(): this;
    /**
     * Enables this piece
     * @since 0.0.1
     * @chainable
     */
    enable(): this;
    /**
     * The init method to be optionally overwritten in actual pieces
     * @since 0.0.1
     */
    init(): unknown;
    /**
     * Defines toString behavior for pieces
     * @since 0.0.1
     * @returns This piece name
     */
    toString(): string;
    /**
     * Defines the JSON.stringify behavior of this piece.
     */
    toJSON(): Record<string, unknown>;
}
/**
 * The base piece options for all {@link Piece} instances.
 */
export interface PieceOptions {
    /**
     * The name of the piece. Defaults to the filename without extension.
     */
    name?: string;
    /**
     * Whether or not this piece should be enabled. Defaults to true.
     */
    enabled?: boolean;
}
