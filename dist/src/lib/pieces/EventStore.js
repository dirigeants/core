"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStore = void 0;
const Store_1 = require("./base/Store");
const Event_1 = require("./Event");
/**
 * @since 0.0.1
 * The {@link Event} store.
 */
class EventStore extends Store_1.Store {
    /**
     * @since 0.0.1
     * @param client The client this Store was created with
     */
    constructor(client) {
        super(client, 'events', Event_1.Event);
        /**
         * Once events that have already run (so once means once).
         * @since 0.0.1
         */
        this._onceEvents = new Set();
    }
    /**
     * Loads a piece into Klasa so it can be saved in this store.
     * @since 0.0.1
     * @param file A string or array of strings showing where the file is located.
     * @param core If the file is located in the core directory or not
     */
    load(directory, file) {
        if (this._onceEvents.has(file[file.length - 1]))
            return Promise.resolve(null);
        return super.load(directory, file);
    }
    /**
     * Clears the events from the store and removes the listeners.
     * @since 0.0.1
     */
    clear() {
        for (const event of this.values())
            this.delete(event);
    }
    /**
     * Deletes an event from the store.
     * @since 0.0.1
     * @param name An event object or a string representing the event name.
     * @returns Whether or not the delete was successful.
     */
    delete(name) {
        const event = this.resolve(name);
        if (!event)
            return false;
        // eslint-disable-next-line dot-notation
        event['_unlisten']();
        return super.delete(event);
    }
    /**
     * Sets up an event in our store.
     * @since 0.0.1
     * @param piece The event piece we are setting up
     */
    set(piece) {
        const event = super.set(piece);
        if (!event)
            return null;
        // eslint-disable-next-line dot-notation
        event['_listen']();
        return event;
    }
}
exports.EventStore = EventStore;
//# sourceMappingURL=EventStore.js.map