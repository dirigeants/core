"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseClient = void 0;
const events_1 = require("events");
const utils_1 = require("@klasa/utils");
const rest_1 = require("@klasa/rest");
const timer_manager_1 = require("@klasa/timer-manager");
const Constants_1 = require("../util/Constants");
/**
 * The Klasa-Core Base Client used to wrap the Discord API
 */
class BaseClient extends events_1.EventEmitter {
    /**
     * @param options All of your preferences on how Klasa-Core should work for you
     */
    constructor(options) {
        super();
        this.options = utils_1.mergeDefault(Constants_1.BaseClientOptionsDefaults, options);
        this.api = new rest_1.REST(this.options.rest)
            .on("debug" /* Debug */, this.emit.bind(this, "restDebug" /* RESTDebug */))
            .on("ratelimited" /* Ratelimited */, this.emit.bind(this, "ratelimited" /* Ratelimited */));
    }
    /**
     * Sets the token to use for the api.
     */
    set token(token) {
        this.api.token = token;
    }
    /**
     * Destroys all timers
     */
    async destroy() {
        timer_manager_1.TimerManager.destroy();
    }
}
exports.BaseClient = BaseClient;
//# sourceMappingURL=BaseClient.js.map