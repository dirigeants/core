"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliasPiece = void 0;
const Piece_1 = require("./Piece");
/**
 * The common class for all pieces with aliases.
 */
class AliasPiece extends Piece_1.Piece {
    /**
     * @since 0.0.1
     * @param store The store this piece is for
     * @param directory The base directory to the pieces folder
     * @param file The path from the pieces folder to the piece file
     * @param options The options for this piece
     */
    constructor(store, directory, file, options = {}) {
        var _a, _b;
        super(store, directory, file, options);
        this.aliases = (_b = (_a = options.aliases) === null || _a === void 0 ? void 0 : _a.slice()) !== null && _b !== void 0 ? _b : [];
    }
    /**
     * Defines the JSON.stringify behavior of this argument.
     * @since 0.0.1
     */
    toJSON() {
        return {
            ...super.toJSON(),
            aliases: this.aliases.slice()
        };
    }
}
exports.AliasPiece = AliasPiece;
//# sourceMappingURL=AliasPiece.js.map