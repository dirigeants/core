"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresenceBuilder = void 0;
/* eslint-disable no-dupe-class-members */
const PresenceGameBuilder_1 = require("./PresenceGameBuilder");
/**
 * The presence builder.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/topics/gateway#update-status-gateway-status-update-structure
 */
class PresenceBuilder {
    constructor(data = {}) {
        var _a, _b, _c, _d;
        this.since = (_a = data.since) !== null && _a !== void 0 ? _a : null;
        this.game = (_b = data.game) !== null && _b !== void 0 ? _b : null;
        this.status = (_c = data.status) !== null && _c !== void 0 ? _c : 'online';
        this.afk = (_d = data.afk) !== null && _d !== void 0 ? _d : false;
    }
    /**
     * Modifies the presence and returns it.
     * @since 0.0.1
     * @param since Unix time (in milliseconds) of when the client went idle, or null if the client is not idle.
     */
    setSince(since = Date.now()) {
        this.since = since instanceof Date ? since.getTime() : since;
        return this;
    }
    setGame(game) {
        this.game = typeof game === 'function' ? game(new PresenceGameBuilder_1.PresenceGameBuilder()) : game;
        return this;
    }
    /**
     * Modifies the presence and returns it.
     * @since 0.0.1
     * @param status The user's new status.
     * @see https://discord.com/developers/docs/topics/gateway#update-status-status-types
     */
    setStatus(status) {
        this.status = status;
        return this;
    }
    /**
     * Modifies the presence and returns it.
     * @since 0.0.1
     * @param afk Whether or not the client is afk.
     */
    setAfk(afk) {
        this.afk = afk;
        return this;
    }
}
exports.PresenceBuilder = PresenceBuilder;
//# sourceMappingURL=PresenceBuilder.js.map