import { Cache } from '@klasa/cache';
import type { AliasPiece } from './AliasPiece';
import { Store } from './Store';

/**
 * @since 0.0.1
 * The common base for all alias stores.
 */
export class AliasStore<V extends AliasPiece> extends Store<V> {

	/**
	 * The different aliases that represent the arguments in this store.
	 * @since 0.0.1
	 */
	public readonly aliases = new Cache<string, V>();

	/**
	 * Returns an AliasPiece in the store if it exists by its name or by an alias.
	 * @since 0.0.1
	 * @param name A argument or alias name
	 */
	public get(name: string): V | undefined {
		return super.get(name) || this.aliases.get(name);
	}

	/**
	 * Returns a boolean if the AliasPiece or alias is found within the store.
	 * @since 0.0.1
	 * @param name A command or alias name
	 */
	public has(name: string): boolean {
		return super.has(name) || this.aliases.has(name);
	}

	/**
	 * Sets up an AliasPiece in our store.
	 * @since 0.0.1
	 * @param piece The command piece we are setting up
	 */
	public set(piece: V): V | null {
		const aliasPiece = super.set(piece);
		if (!aliasPiece) return null;
		for (const alias of aliasPiece.aliases) this.aliases.set(alias, aliasPiece);
		return aliasPiece;
	}

	/**
	 * Deletes an AliasPiece from the store.
	 * @since 0.0.1
	 * @param name An AliasPiece object or a string representing an AliasPiece or alias name
	 * @returns Whether or not the delete was successful.
	 */
	public delete(name: V | string): boolean {
		const aliasPiece = this.resolve(name) as V | null;
		if (!aliasPiece) return false;
		for (const alias of aliasPiece.aliases) this.aliases.delete(alias);
		return super.delete(aliasPiece);
	}

	/**
	 * Clears the AliasPieces and aliases from this store
	 * @since 0.0.1
	 */
	public clear(): void {
		super.clear();
		this.aliases.clear();
	}

}
