"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _count, _interval;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Typing = void 0;
const timer_manager_1 = require("@klasa/timer-manager");
const rest_1 = require("@klasa/rest");
/**
 * Handles typing indication sending in text channels
 */
class Typing {
    constructor(channel) {
        /**
         * The internal typing counter (allows handling of multiple commands in the same channel).
         * @since 0.0.1
         */
        _count.set(this, 0);
        /**
         * The internal interval to fire typing indications
         * @since 0.0.1
         */
        _interval.set(this, null);
        this.client = channel.client;
        this.channel = channel;
    }
    /**
     * Ups the internal typing counter and starts typing if not already.
     * @param count How much to increase the internal counter. (Typically leave this at the default 1)
     * @since 0.0.1
     */
    start(count = 1) {
        __classPrivateFieldSet(this, _count, __classPrivateFieldGet(this, _count) + count);
        if (!__classPrivateFieldGet(this, _interval))
            this._startTyping();
    }
    /**
     * Lowers the internal typing counter and stops typing if the counter reaches 0 (or less).
     * @param count How much to decrease the internal counter. (Typically leave this at the default 1)
     * @since 0.0.1
     */
    stop(count = 1) {
        __classPrivateFieldSet(this, _count, __classPrivateFieldGet(this, _count) - count);
        if (__classPrivateFieldGet(this, _count) < 0)
            __classPrivateFieldSet(this, _count, 0);
        if (!__classPrivateFieldGet(this, _count))
            this._stopTyping();
    }
    /**
     * An alias for Typing#stop(Infinity). Forces the counter back to 0, and stops typing.
     * @since 0.0.1
     */
    forceStop() {
        return this.stop(Infinity);
    }
    /**
     * Internal method to start the typing interval if not already started.
     * @since 0.0.1
     */
    _startTyping() {
        if (!__classPrivateFieldGet(this, _interval)) {
            this._type();
            __classPrivateFieldSet(this, _interval, timer_manager_1.TimerManager.setInterval(this._type.bind(this), 9000));
        }
    }
    /**
     * Internal method to send a typing indicator.
     * @since 0.0.1
     */
    async _type() {
        try {
            await this.client.api.post(rest_1.Routes.channelTyping(this.channel.id));
        }
        catch {
            __classPrivateFieldSet(this, _count, 0);
            this._stopTyping();
        }
    }
    /**
     * Internal method to stop the typing interval if not already stopped.
     * @since 0.0.1
     */
    _stopTyping() {
        if (__classPrivateFieldGet(this, _interval)) {
            timer_manager_1.TimerManager.clearInterval(__classPrivateFieldGet(this, _interval));
            __classPrivateFieldSet(this, _interval, null);
        }
    }
}
exports.Typing = Typing;
_count = new WeakMap(), _interval = new WeakMap();
//# sourceMappingURL=Typing.js.map