import type { Piece } from './Piece';
import type { Client } from '../../../client/Client';
import { Cache } from '@klasa/cache';
import { join, extname, relative, sep } from 'path';
import { isClass } from '@klasa/utils';
import { scan, ensureDir } from 'fs-nextra';

type Constructor<T> = new (...args: readonly unknown[]) => T;

export class Store<V extends Piece> extends Cache<string, V> {

	/**
	 * The client this Store was created with.
	 * @since 0.0.1
	 */
	public readonly client: Client;

	/**
	 * The name of what this holds.
	 * @since 0.0.1
	 */
	public readonly name: string;

	/**
	 * The type of structure this store holds.
	 * @since 0.0.1
	 */
	public readonly holds: Constructor<V>;

	/**
	 * The core directories pieces of this store can hold.
	 * @since 0.0.1
	 */
	private readonly coreDirectories: Set<string>;

	public constructor(client: Client, name: string, holds: Constructor<V>) {
		super();

		this.client = client;
		this.name = name;
		this.holds = holds;
		this.coreDirectories = new Set();
	}

	/**
	 * The directory of local pieces relative to where you run Klasa from.
	 * @since 0.0.1
	 */
	public get userDirectory(): string {
		return join(this.client.userBaseDirectory, this.name);
	}

	/**
	 * Registers a core directory to check for pieces.
	 * @since 0.0.1
	 * @param directory The directory to check for core pieces
	 */
	protected registerCoreDirectory(directory: string): this {
		this.coreDirectories.add(join(directory, this.name));
		return this;
	}

	/**
	 * Initializes all pieces in this store.
	 * @since 0.0.1
	 */
	public init(): Promise<Array<any>> {
		return Promise.all(this.map(piece => piece.enabled ? piece.init() : piece.unload()));
	}

	/**
	 * Loads a piece into Klasa so it can be saved in this store.
	 * @since 0.0.1
	 * @param directory The directory the file is located in
	 * @param file A string or array of strings showing where the file is located.
	 */
	public async load(directory: string, file: readonly string[]): Promise<V | null> {
		const loc = join(directory, ...file);
		let piece = null;
		try {
			const loaded = await import(loc) as { default: Constructor<V> } | Constructor<V>;
			const LoadedPiece = 'default' in loaded ? loaded.default : loaded;
			if (!isClass(LoadedPiece)) throw new TypeError('The exported structure is not a class.');
			piece = this.set(new LoadedPiece(this, file, directory));
		} catch (error) {
			this.client.emit('wtf', `Failed to load file '${loc}'. Error:\n${error.stack || error}`);
		}
		delete require.cache[loc];
		module.children.pop();
		return piece;
	}

	/**
	 * Loads all of our Pieces from both the user and core directories.
	 * @since 0.0.1
	 * @returns The number of Pieces loaded.
	 */
	public async loadAll(): Promise<number> {
		this.clear();
		if (!this.client.options.disabledCorePieces.includes(this.name)) {
			for (const directory of this.coreDirectories) await Store.walk(this, directory);
		}
		await Store.walk(this);
		return this.size;
	}

	/**
	 * Sets up a piece in our store.
	 * @since 0.0.1
	 * @param piece The piece we are setting up
	 */
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	// @ts-ignore
	public set(piece: V): V | null {
		if (!(piece instanceof this.holds)) {
			this.client.emit('error', `Only ${this} may be stored in this Store.`);
			return null;
		}

		const existing = this.get(piece.name);
		if (existing) this.delete(existing);

		this.client.emit('pieceLoaded', piece);
		super.set(piece.name, piece);
		return piece;
	}

	/**
	 * Deletes a command from the store.
	 * @since 0.0.1
	 * @param name A command object or a string representing a command or alias name
	 * @returns Whether or not the delete was successful.
	 */
	public delete(name: V | string): boolean {
		const piece = this.resolve(name);
		if (!piece) return false;
		super.delete(piece.name);
		return true;
	}

	/**
	 * Resolve a string or piece into a piece object.
	 * @since 0.0.1
	 * @param name The piece object or a string representing a piece's name
	 */
	public resolve(name: V | string): Piece | null {
		if (name instanceof this.holds) return name;
		return this.get(name as string) || null;
	}

	/**
	 * Defines toString behavior for stores
	 * @since 0.0.1
	 * @returns This store name
	 */
	public toString(): string {
		return this.name;
	}

	/**
	 * Walks our directory of Pieces for the user and core directories.
	 * @since 0.0.1
	 * @param store The store we're loading into
	 * @param directory The directory to walk in
	 */
	private static async walk<T extends Piece>(store: Store<T>, directory: string = store.userDirectory): Promise<T[]> {
		const files = await scan(directory, { filter: (stats, path) => stats.isFile() && extname(path) === '.js' })
			.catch(() => { if (store.client.options.createPiecesFolders) ensureDir(directory).catch(err => store.client.emit('error', err)); });
		if (!files) return [];

		return Promise.all([...files.keys()].map(file => store.load(directory, relative(directory, file).split(sep)) as Promise<T>));
	}

	public static get [Symbol.species](): typeof Cache {
		return Cache;
	}

}