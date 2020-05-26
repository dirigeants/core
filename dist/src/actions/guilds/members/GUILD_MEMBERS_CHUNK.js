"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@klasa/core");
class CoreAction extends core_1.Action {
    /**
     * Processes the event data from the websocket.
     * @since 0.0.1
     * @param data The raw data from {@link Client#ws}
     */
    run(data) {
        var _a;
        const guild = this.client.guilds.get(data.d.guild_id);
        if (!guild) {
            this.client.emit("debug" /* Debug */, `[GUILD_MEMBERS_CHUNK] Received unknown guild ${data.d.guild_id}.`);
            return;
        }
        // eslint-disable-next-line dot-notation
        const members = data.d.members.map(member => guild.members['_add'](member));
        for (const presence of (_a = data.d.presences) !== null && _a !== void 0 ? _a : []) {
            // eslint-disable-next-line dot-notation
            this.client.users['_add'](presence.user);
            // eslint-disable-next-line dot-notation
            guild.presences['_add'](presence);
        }
        this.client.emit(this.clientEvent, members, guild, {
            chunkCount: data.d.chunk_count,
            chunkIndex: data.d.chunk_index,
            nonce: data.d.nonce
        });
    }
    check() {
        return null;
    }
    build() {
        return null;
    }
    cache() {
        // noop
    }
}
exports.default = CoreAction;
//# sourceMappingURL=GUILD_MEMBERS_CHUNK.js.map