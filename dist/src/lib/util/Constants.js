"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientOptionsDefaults = exports.BaseClientOptionsDefaults = exports.version = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Package = require('../../../../package.json');
const rest_1 = require("@klasa/rest");
const ws_1 = require("@klasa/ws");
exports.version = Package.version;
exports.BaseClientOptionsDefaults = {
    rest: rest_1.RestOptionsDefaults
};
exports.ClientOptionsDefaults = {
    ...exports.BaseClientOptionsDefaults,
    ws: ws_1.WSOptionsDefaults,
    pieces: {
        defaults: {
            events: {
                enabled: true,
                once: false
            }
        },
        createFolders: false,
        disabledCoreTypes: []
    },
    cache: {
        enabled: true,
        limits: {
            bans: Infinity,
            channels: Infinity,
            dms: Infinity,
            emojis: Infinity,
            guilds: Infinity,
            integrations: Infinity,
            invites: Infinity,
            members: Infinity,
            messages: 100,
            overwrites: Infinity,
            presences: Infinity,
            reactions: Infinity,
            roles: Infinity,
            users: Infinity,
            voiceStates: Infinity
        },
        messageLifetime: 0,
        messageSweepInterval: 0
    }
};
//# sourceMappingURL=Constants.js.map