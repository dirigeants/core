import { join, basename, extname } from 'path';
import { Client, ClientEvents } from '../../client/Client';

import type { Store } from './Store';
import { mergeDefault } from '@klasa/utils';

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
	public readonly store: Store<Piece>;

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
	public name: string;

	/**
	 * Whether or not the Piece is enabled.
	 * @since 0.0.1
	 */
	public enabled: boolean;

	/**
	 * @since 0.0.1
	 * @param store The store this piece is for
	 * @param directory The base directory to the pieces folder
	 * @param file The path from the pieces folder to the piece file
	 * @param options The options for this piece
	 */
	public constructor(store: Store<Piece>, directory: string, file: readonly string[], options: PieceOptions = {}) {
		const defaults = Reflect.get(store.client.options.pieces.defaults, store.name) as Required<PieceOptions>;
		if (defaults) options = mergeDefault(defaults, options);
		this.client = store.client;
		this.store = store as Store<this>;
		this.directory = directory;
		this.file = file;
		this.name = options.name ?? basename(file[file.length - 1], extname(file[file.length - 1]));
		this.enabled = options.enabled ?? true;
	}

	/**
	 * The type of piece this is
	 * @since 0.0.1
	 */
	public get type(): string {
		return this.store.name.slice(0, -1);
	}

	/**
	 * The absolute path to this piece
	 * @since 0.0.1
	 */
	public get path(): string {
		return join(this.directory, ...this.file);
	}

	/**
	 * Reloads this piece
	 * @since 0.0.1
	 * @returns The newly loaded piece
	 */
	public async reload(): Promise<Piece | null> {
		const piece = await this.store.load(this.directory, this.file);
		if (piece) {
			await piece.init();
			this.client.emit(ClientEvents.PieceReloaded, piece);
		}
		return piece;
	}

	/**
	 * Unloads this piece
	 * @since 0.0.1
	 */
	public unload(): boolean {
		this.client.emit(ClientEvents.PieceUnloaded, this);
		return this.store.remove(this);
	}

	/**
	 * Disables this piece
	 * @since 0.0.1
	 * @chainable
	 */
	public disable(): this {
		this.client.emit(ClientEvents.PieceDisabled, this);
		this.enabled = false;
		return this;
	}

	/**
	 * Enables this piece
	 * @since 0.0.1
	 * @chainable
	 */
	public enable(): this {
		this.client.emit(ClientEvents.PieceEnabled, this);
		this.enabled = true;
		return this;
	}

	/**
	 * The init method to be optionally overwritten in actual pieces
	 * @since 0.0.1
	 */
	public init(): unknown {
		// Optionally defined in extension Classes
		return null;
	}

	/**
	 * Defines toString behavior for pieces
	 * @since 0.0.1
	 * @returns This piece name
	 */
	public toString(): string {
		return this.name;
	}

	/**
	 * Defines the JSON.stringify behavior of this piece.
	 */
	public toJSON(): object {
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
