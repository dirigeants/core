"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliasStore = void 0;
const cache_1 = require("@klasa/cache");
const Store_1 = require("./Store");
/**
 * @since 0.0.1
 * The common base for all alias stores.
 */
class AliasStore extends Store_1.Store {
    constructor() {
        super(...arguments);
        /**
         * The different aliases that represent the arguments in this store.
         * @since 0.0.1
         */
        this.aliases = new cache_1.Cache();
    }
    /**
     * Returns an AliasPiece in the store if it exists by its name or by an alias.
     * @since 0.0.1
     * @param name A argument or alias name
     */
    get(name) {
        return super.get(name) || this.aliases.get(name);
    }
    /**
     * Returns a boolean if the AliasPiece or alias is found within the store.
     * @since 0.0.1
     * @param name A piece or alias name
     */
    has(name) {
        return super.has(name) || this.aliases.has(name);
    }
    /**
     * Sets up an AliasPiece in our store.
     * @since 0.0.1
     * @param piece The piece we are setting up
     */
    set(piece) {
        const aliasPiece = super.set(piece);
        if (!aliasPiece)
            return null;
        for (const alias of aliasPiece.aliases)
            this.aliases.set(alias, aliasPiece);
        return aliasPiece;
    }
    /**
     * Deletes an AliasPiece from the store.
     * @since 0.0.1
     * @param name An AliasPiece object or a string representing an AliasPiece or alias name
     * @returns Whether or not the delete was successful.
     */
    delete(name) {
        const aliasPiece = this.resolve(name);
        if (!aliasPiece)
            return false;
        for (const alias of aliasPiece.aliases)
            this.aliases.delete(alias);
        return super.delete(aliasPiece);
    }
    /**
     * Clears the AliasPieces and aliases from this store
     * @since 0.0.1
     */
    clear() {
        super.clear();
        this.aliases.clear();
    }
}
exports.AliasStore = AliasStore;
//# sourceMappingURL=AliasStore.js.map