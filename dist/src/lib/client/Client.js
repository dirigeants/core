"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plugin = exports.Client = void 0;
const ws_1 = require("@klasa/ws");
const utils_1 = require("@klasa/utils");
const cache_1 = require("@klasa/cache");
const timer_manager_1 = require("@klasa/timer-manager");
const ActionStore_1 = require("../pieces/ActionStore");
const BaseClient_1 = require("./BaseClient");
const Constants_1 = require("../util/Constants");
const path_1 = require("path");
const DMChannelStore_1 = require("../caching/stores/DMChannelStore");
const EventStore_1 = require("../pieces/EventStore");
const GuildStore_1 = require("../caching/stores/GuildStore");
const InviteStore_1 = require("../caching/stores/InviteStore");
const UserStore_1 = require("../caching/stores/UserStore");
const ChannelStore_1 = require("../caching/stores/ChannelStore");
const Util_1 = require("../util/Util");
/**
 * The Klasa-Core Client used to wrap the discord api
 */
let Client = /** @class */ (() => {
    class Client extends BaseClient_1.BaseClient {
        /**
         * @param options All of your preferences on how Klasa-Core should work for you
         */
        constructor(options = {}) {
            super(options);
            /**
             * The directory where the user files are at.
             */
            this.userBaseDirectory = path_1.dirname(require.main.filename);
            this.options = utils_1.mergeDefault(Constants_1.ClientOptionsDefaults, options);
            this.ws = new ws_1.WebSocketManager(this.api, this.options.ws)
                .on("debug" /* Debug */, this.emit.bind(this, "wsDebug" /* WSDebug */));
            this.user = null;
            this.channels = new ChannelStore_1.ChannelStore(this);
            this.users = new UserStore_1.UserStore(this);
            this.guilds = new GuildStore_1.GuildStore(this);
            this.dms = new DMChannelStore_1.DMChannelStore(this);
            this.invites = new InviteStore_1.InviteStore(this);
            this.pieceStores = new cache_1.Cache();
            this.events = new EventStore_1.EventStore(this);
            this.actions = new ActionStore_1.ActionStore(this);
            this.registerStore(this.events)
                .registerStore(this.actions);
            const coreDirectory = path_1.join(__dirname, '../../');
            for (const store of this.pieceStores.values())
                store.registerCoreDirectory(coreDirectory);
            if (this.options.cache.messageSweepInterval > 0) {
                timer_manager_1.TimerManager.setInterval(this._sweepMessages.bind(this), this.options.cache.messageSweepInterval);
            }
            if (this.constructor === Client)
                for (const plugin of Client.plugins)
                    plugin.call(this);
        }
        /**
         * Returns a new Cache of all guild emojis.
         * @since 0.0.1
         */
        get emojis() {
            return new cache_1.Cache().concat(...this.guilds.map(guild => guild.emojis));
        }
        /**
         * Sets the token to use for the api.
         * @since 0.0.1
         */
        set token(token) {
            super.token = token;
            this.ws.token = token;
        }
        /**
         * Registers a custom store to the client
         * @since 0.0.1
         * @param store The store that pieces will be stored in
         * @chainable
         */
        registerStore(store) {
            this.pieceStores.set(store.name, store);
            return this;
        }
        /**
         * Un-registers a custom store from the client
         * @since 0.0.1
         * @param store The store that pieces will be stored in
         * @chainable
         */
        unregisterStore(store) {
            this.pieceStores.delete(store.name);
            return this;
        }
        /**
         * Connects the client to the websocket
         */
        async connect() {
            await Promise.all(this.pieceStores.map(store => store.loadAll()));
            try {
                await this.ws.spawn();
            }
            catch (err) {
                await this.destroy();
                throw err;
            }
            await Promise.all(this.pieceStores.map(store => store.init()));
            this.emit("ready" /* Ready */);
        }
        /**
         * Destroys all timers and disconnects all shards from the websocket
         */
        async destroy() {
            await super.destroy();
            this.ws.destroy();
        }
        /**
         * Sweeps all text-based channels' messages and removes the ones older than the max message or command message lifetime.
         * If the message has been edited, the time of the edit is used rather than the time of the original message.
         * @since 0.5.0
         * @param lifetime Messages that are older than this (in milliseconds)
         * will be removed from the caches. The default is based on {@link ClientOptions#messageLifetime}
         */
        _sweepMessages(lifetime = this.options.cache.messageLifetime) {
            if (typeof lifetime !== 'number' || isNaN(lifetime))
                throw new TypeError('The lifetime must be a number.');
            if (lifetime <= 0) {
                this.emit("debug" /* Debug */, 'Didn\'t sweep messages - lifetime is unlimited');
                return -1;
            }
            const now = Date.now();
            let channels = 0;
            let messages = 0;
            for (const channel of this.channels.values()) {
                if (!Util_1.isTextBasedChannel(channel))
                    continue;
                channels++;
                messages += channel.messages.sweep(message => now - (message.editedTimestamp || message.createdTimestamp) > lifetime);
            }
            this.emit("debug" /* Debug */, `Swept ${messages} messages older than ${lifetime} milliseconds in ${channels} text-based channels`);
            return messages;
        }
        /**
         * Caches a plugin module to be used when creating a Client instance
         * @param mod The module of the plugin to use
         */
        static use(mod) {
            const plugin = mod[Client.plugin];
            if (typeof plugin !== 'function')
                throw new TypeError('The provided module does not include a plugin function');
            Client.plugins.add(plugin);
            return Client;
        }
    }
    /**
     * The plugin symbol to be used in external packages
     */
    Client.plugin = Symbol('KlasaCorePlugin');
    /**
     * The plugins to be used when creating a Client instance
     */
    Client.plugins = new Set();
    return Client;
})();
exports.Client = Client;
class Plugin {
}
exports.Plugin = Plugin;
Client.plugin;
//# sourceMappingURL=Client.js.map