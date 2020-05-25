"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionStore = void 0;
const Store_1 = require("./base/Store");
const Action_1 = require("./Action");
/**
 * @since 0.0.1
 * The {@link Action} store.
 */
class ActionStore extends Store_1.Store {
    /**
     * @since 0.0.1
     * @param client The client this Store was created with
     */
    constructor(client) {
        super(client, 'actions', Action_1.Action);
    }
    /**
     * Clears the actions from the store and removes the listeners.
     * @since 0.0.1
     */
    clear() {
        for (const event of this.values())
            this.delete(event);
    }
    /**
     * Deletes an action from the store.
     * @since 0.0.1
     * @param name An action object or a string representing the action name.
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
     * Sets up an action in our store.
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
exports.ActionStore = ActionStore;
//# sourceMappingURL=ActionStore.js.map