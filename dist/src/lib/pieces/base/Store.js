"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const path_1 = require("path");
const fs_nextra_1 = require("fs-nextra");
const utils_1 = require("@klasa/utils");
const cache_1 = require("@klasa/cache");
require("../../client/Client");
/**
 * @since 0.0.1
 * The common base for all stores.
 */
class Store extends cache_1.Cache {
    /**
     * @since 0.0.1
     * @param client The client this Store was created with
     * @param name The name of this store
     * @param Holds The type of structure this store holds
     */
    constructor(client, name, Holds) {
        super();
        /**
         * The core directories pieces of this store can hold.
         * @since 0.0.1
         */
        this.coreDirectories = new Set();
        this.client = client;
        this.name = name;
        this.Holds = Holds;
    }
    /**
     * The directory of local pieces relative to where you run Klasa from.
     * @since 0.0.1
     */
    get userDirectory() {
        return path_1.join(this.client.userBaseDirectory, this.name);
    }
    /**
     * Registers a core directory to check for pieces.
     * @since 0.0.1
     * @param directory The directory to check for core pieces
     */
    registerCoreDirectory(directory) {
        this.coreDirectories.add(path_1.join(directory, this.name));
        return this;
    }
    /**
     * Initializes all pieces in this store.
     * @since 0.0.1
     */
    init() {
        return Promise.all(this.map(piece => piece.enabled ? piece.init() : piece.unload()));
    }
    /**
     * Loads a piece into Klasa so it can be saved in this store.
     * @since 0.0.1
     * @param directory The directory the file is located in
     * @param file A string or array of strings showing where the file is located.
     */
    async load(directory, file) {
        const loc = path_1.join(directory, ...file);
        let piece = null;
        try {
            const loaded = await Promise.resolve().then(() => require(loc));
            const LoadedPiece = 'default' in loaded ? loaded.default : loaded;
            if (!utils_1.isClass(LoadedPiece))
                throw new TypeError('The exported structure is not a class.');
            piece = this.add(new LoadedPiece(this, directory, file));
        }
        catch (error) {
            this.client.emit("wtf" /* WTF */, `Failed to load file '${loc}'. Error:\n${error.stack || error}`);
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
    async loadAll() {
        this.clear();
        if (!this.client.options.pieces.disabledCoreTypes.includes(this.name)) {
            for (const directory of this.coreDirectories)
                await Store.walk(this, directory);
        }
        await Store.walk(this);
        return this.size;
    }
    /**
     * Adds and sets up a piece in our store.
     * @since 0.0.1
     * @param piece The piece we are setting up
     */
    add(piece) {
        if (!(piece instanceof this.Holds)) {
            this.client.emit("error" /* Error */, `Only ${this} may be stored in this Store.`);
            return null;
        }
        // Remove any previous piece named the same
        this.remove(piece.name);
        // Emit pieceLoaded event, set to the cache, and return it
        this.client.emit("pieceLoaded" /* PieceLoaded */, piece);
        super.set(piece.name, piece);
        return piece;
    }
    /**
     * Removes a piece from the store.
     * @since 0.0.1
     * @param name A piece instance or a string representing a piece or alias name
     * @returns Whether or not the removal was successful.
     */
    remove(name) {
        const piece = this.resolve(name);
        if (!piece)
            return false;
        super.delete(piece.name);
        return true;
    }
    /**
     * The overriden set method, this will always throw.
     * @internal
     */
    set() {
        throw new Error('Cannot set in this Store.');
    }
    /**
     * The overriden delete method, this will always throw.
     * @internal
     */
    delete() {
        throw new Error('Cannot delete in this Store.');
    }
    /**
     * Resolve a string or piece into a piece object.
     * @since 0.0.1
     * @param name The piece object or a string representing a piece's name
     */
    resolve(name) {
        if (name instanceof this.Holds)
            return name;
        return this.get(name) || null;
    }
    /**
     * Defines toString behavior for stores
     * @since 0.0.1
     * @returns This store name
     */
    toString() {
        return this.name;
    }
    /**
     * Walks our directory of Pieces for the user and core directories.
     * @since 0.0.1
     * @param store The store we're loading into
     * @param directory The directory to walk in
     */
    static async walk(store, directory = store.userDirectory) {
        try {
            const files = await fs_nextra_1.scan(directory, { filter: (stats) => stats.isFile() && path_1.extname(stats.name) === '.js' });
            return Promise.all([...files.keys()].map(file => store.load(directory, path_1.relative(directory, file).split(path_1.sep))));
        }
        catch {
            if (store.client.options.pieces.createFolders) {
                fs_nextra_1.ensureDir(directory).catch(err => store.client.emit("error" /* Error */, err));
            }
            return [];
        }
    }
    static get [Symbol.species]() {
        return cache_1.Cache;
    }
}
exports.Store = Store;
//# sourceMappingURL=Store.js.map