import { join } from 'path';
import type { Client } from '../../../client/Client';
import type { Store } from './Store';

/**
 * The common class for all pieces.
 */
export class Piece {

	/**
	 * The client this Piece was created with.
	 * @since 0.0.1
	 */
	public readonly client: Client;

	/**
	 * The store this Piece is from.
	 * @since 0.0.1
	 */
	public readonly store: Store<this>;

	/**
	 * The file location where this Piece is stored.
	 * @since 0.0.1
	 */
	public readonly file: readonly string[];

	/**
	 * The base directory this Piece is stored in.
	 * @since 0.0.1
	 */
	public readonly directory: string;

	/**
	 * The name of the Piece.
	 * @since 0.0.1
	 */
	public readonly name: string;

	/**
	 * Whether or not the Piece is enabled.
	 * @since 0.0.1
	 */
	public enabled: boolean;

	/**
	 * @since 0.0.1
	 * @param store The store this piece is for
	 * @param file The path from the pieces folder to the piece file
	 * @param directory The base directory to the pieces folder
	 * @param options The options for this piece
	 */
	public constructor(store: Store<Piece>, file: readonly string[], directory: string, options: PieceOptions = {}) {
		this.client = store.client;
		this.store = store as Store<this>;
		this.file = file;
		this.directory = directory;
		this.name = options.name ?? file[file.length - 1].slice(0, -3);
		this.enabled = options.enabled ?? true;
	}

	/**
	 * The type of Klasa piece this is
	 * @since 0.0.1
	 */
	get type(): string {
		return this.store.name.slice(0, -1);
	}

	/**
	 * The absolute path to this piece
	 * @since 0.0.1
	 */
	get path(): string {
		return join(this.directory, ...this.file);
	}

	/**
	 * Reloads this piece
	 * @since 0.0.1
	 * @returns The newly loaded piece
	 */
	async reload(): Promise<Piece | null> {
		const piece = await this.store.load(this.directory, this.file);
		if (piece) {
			await piece.init();
			this.client.emit('pieceReloaded', piece);
		}
		return piece;
	}

	/**
	 * Unloads this piece
	 * @since 0.0.1
	 */
	unload(): boolean {
		this.client.emit('pieceUnloaded', this);
		return this.store.delete(this);
	}

	/**
	 * Disables this piece
	 * @since 0.0.1
	 * @chainable
	 */
	disable(): this {
		this.client.emit('pieceDisabled', this);
		this.enabled = false;
		return this;
	}

	/**
	 * Enables this piece
	 * @since 0.0.1
	 * @chainable
	 */
	enable(): this {
		this.client.emit('pieceEnabled', this);
		this.enabled = true;
		return this;
	}


	/**
	 * The init method to be optionally overwritten in actual pieces
	 * @since 0.0.1
	 */
	init(): unknown {
		// Optionally defined in extension Classes
		return null;
	}

	/**
	 * Defines toString behavior for pieces
	 * @since 0.0.1
	 * @returns This piece name
	 */
	toString(): string {
		return this.name;
	}

	/**
	 * Defines the JSON.stringify behavior of this piece.
	 */
	toJSON(): object {
		return {
			directory: this.directory,
			file: this.file,
			path: this.path,
			name: this.name,
			type: this.type,
			enabled: this.enabled
		};
	}

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
