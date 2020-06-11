"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Piece = void 0;
const path_1 = require("path");
require("../../client/Client");
const utils_1 = require("@klasa/utils");
/**
 * The common class for all pieces.
 */
class Piece {
    /**
     * @since 0.0.1
     * @param store The store this piece is for
     * @param directory The base directory to the pieces folder
     * @param file The path from the pieces folder to the piece file
     * @param options The options for this piece
     */
    constructor(store, directory, file, options = {}) {
        var _a, _b;
        const defaults = Reflect.get(store.client.options.pieces.defaults, store.name);
        if (defaults)
            options = utils_1.mergeDefault(defaults, options);
        this.client = store.client;
        this.store = store;
        this.directory = directory;
        this.file = file;
        this.name = (_a = options.name) !== null && _a !== void 0 ? _a : path_1.basename(file[file.length - 1], path_1.extname(file[file.length - 1]));
        this.enabled = (_b = options.enabled) !== null && _b !== void 0 ? _b : true;
    }
    /**
     * The type of piece this is
     * @since 0.0.1
     */
    get type() {
        return this.store.name.slice(0, -1);
    }
    /**
     * The absolute path to this piece
     * @since 0.0.1
     */
    get path() {
        return path_1.join(this.directory, ...this.file);
    }
    /**
     * Reloads this piece
     * @since 0.0.1
     * @returns The newly loaded piece
     */
    async reload() {
        const piece = await this.store.load(this.directory, this.file);
        if (piece) {
            await piece.init();
            this.client.emit("pieceReloaded" /* PieceReloaded */, piece);
        }
        return piece;
    }
    /**
     * Unloads this piece
     * @since 0.0.1
     */
    unload() {
        this.client.emit("pieceUnloaded" /* PieceUnloaded */, this);
        return this.store.remove(this);
    }
    /**
     * Disables this piece
     * @since 0.0.1
     * @chainable
     */
    disable() {
        this.client.emit("pieceDisabled" /* PieceDisabled */, this);
        this.enabled = false;
        return this;
    }
    /**
     * Enables this piece
     * @since 0.0.1
     * @chainable
     */
    enable() {
        this.client.emit("pieceEnabled" /* PieceEnabled */, this);
        this.enabled = true;
        return this;
    }
    /**
     * The init method to be optionally overwritten in actual pieces
     * @since 0.0.1
     */
    init() {
        // Optionally defined in extension Classes
        return null;
    }
    /**
     * Defines toString behavior for pieces
     * @since 0.0.1
     * @returns This piece name
     */
    toString() {
        return this.name;
    }
    /**
     * Defines the JSON.stringify behavior of this piece.
     */
    toJSON() {
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
exports.Piece = Piece;
//# sourceMappingURL=Piece.js.map