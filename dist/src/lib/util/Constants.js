"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientOptionsDefaults = exports.BaseClientOptionsDefaults = void 0;
const rest_1 = require("@klasa/rest");
const ws_1 = require("@klasa/ws");
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