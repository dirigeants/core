"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _listener;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const Piece_1 = require("./base/Piece");
/**
 * The common class for all events.
 */
class Event extends Piece_1.Piece {
    /**
     * @since 0.0.1
     * @param store The store this piece is for
     * @param directory The base directory to the pieces folder
     * @param file The path from the pieces folder to the piece file
     * @param options The options for this piece
     */
    constructor(store, directory, file, options = {}) {
        var _a, _b, _c;
        super(store, directory, file, options);
        /**
         * Stored bound on method, so it can be properly unlistened to later
         * @since 0.0.1
         */
        _listener.set(this, void 0);
        this.once = (_a = options.once) !== null && _a !== void 0 ? _a : false;
        this.emitter = (_b = (typeof options.emitter === 'string' ? this.client[options.emitter] : options.emitter)) !== null && _b !== void 0 ? _b : this.client;
        this.event = (_c = options.event) !== null && _c !== void 0 ? _c : this.name;
        __classPrivateFieldSet(this, _listener, this.once ? this._runOnce.bind(this) : this._run.bind(this));
    }
    /**
     * Disables this Event
     * @since 0.0.1
     * @chainable
     */
    disable() {
        this._unlisten();
        return super.disable();
    }
    /**
     * Enables this Event
     * @since 0.0.1
     * @chainable
     */
    enable() {
        this._listen();
        return super.enable();
    }
    /**
     * A wrapper for the run method, to easily disable/enable events
     * @since 0.0.1
     * @param param The event parameters emitted
     */
    async _run(...args) {
        try {
            await this.run(...args);
        }
        catch (err) {
            this.client.emit("eventError" /* EventError */, this, args, err);
        }
    }
    /**
     * A wrapper for the _run method for once handling
     * @since 0.0.1
     * @param param The event parameters emitted
     */
    async _runOnce(...args) {
        await this._run(...args);
        // eslint-disable-next-line dot-notation
        this.store['_onceEvents'].add(this.file[this.file.length - 1]);
        this.unload();
    }
    /**
     * Attaches the proper listener to the emitter
     * @since 0.0.1
     */
    _listen() {
        this.emitter[this.once ? 'once' : 'on'](this.event, __classPrivateFieldGet(this, _listener));
    }
    /**
     * Removes the listener from the emitter
     * @since 0.0.1
     */
    _unlisten() {
        this.emitter.removeListener(this.event, __classPrivateFieldGet(this, _listener));
    }
    /**
     * Defines the JSON.stringify behavior of this event.
     */
    toJSON() {
        return {
            ...super.toJSON(),
            once: this.once,
            event: this.event,
            emitter: this.emitter.constructor.name
        };
    }
}
exports.Event = Event;
_listener = new WeakMap();
//# sourceMappingURL=Event.js.map