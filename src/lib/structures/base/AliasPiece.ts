import type { Store } from './Store';
import { Piece, PieceOptions } from './Piece';

/**
 * The common class for all pieces with aliases.
 */
export class AliasPiece extends Piece {

	/**
	 * The aliases for this piece.
	 * @since 0.0.1
	 */
	public aliases: readonly string[];

	public constructor(store: Store<Piece>, file: readonly string[], directory: string, options: AliasPieceOptions = {}) {
		super(store, file, directory, options);
		this.aliases = options.aliases?.slice() ?? [];
	}

	/**
	 * Defines the JSON.stringify behavior of this argument.
	 * @since 0.0.1
	 */
	public toJSON(): object {
		return {
			...super.toJSON(),
			aliases: this.aliases.slice(0)
		};
	}

}

export interface AliasPieceOptions extends PieceOptions {
	/**
	 * The aliases for this piece.
	 */
	aliases?: string[];
}
