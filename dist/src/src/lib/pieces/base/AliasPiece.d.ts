import { Piece, PieceOptions } from './Piece';
import type { Store } from './Store';
/**
 * The common class for all pieces with aliases.
 */
export declare class AliasPiece extends Piece {
    /**
     * The aliases for this piece.
     * @since 0.0.1
     */
    aliases: string[];
    /**
     * @since 0.0.1
     * @param store The store this piece is for
     * @param directory The base directory to the pieces folder
     * @param file The path from the pieces folder to the piece file
     * @param options The options for this piece
     */
    constructor(store: Store<Piece>, directory: string, file: readonly string[], options?: AliasPieceOptions);
    /**
     * Defines the JSON.stringify behavior of this argument.
     * @since 0.0.1
     */
    toJSON(): object;
}
/**
 * The base piece options for all {@link AliasPiece} instances.
 */
export interface AliasPieceOptions extends PieceOptions {
    /**
     * The aliases for this piece.
     */
    aliases?: string[];
}
