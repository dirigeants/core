"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresenceGameBuilder = void 0;
const Activity_1 = require("../../../util/bitfields/Activity");
/**
 * The presence game builder.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-structure
 */
class PresenceGameBuilder {
    constructor(data = {}) {
        var _a, _b, _c;
        this.name = (_a = data.name) !== null && _a !== void 0 ? _a : '';
        this.type = (_b = data.type) !== null && _b !== void 0 ? _b : 0 /* Game */;
        this.url = data.url;
        this.created_at = (_c = data.created_at) !== null && _c !== void 0 ? _c : 0;
        this.timestamps = data.timestamps;
        this.application_id = data.application_id;
        this.details = data.details;
        this.state = data.state;
        this.emoji = data.emoji;
        this.party = data.party;
        this.assets = data.assets;
        this.secrets = data.secrets;
        this.instance = data.instance;
        this.flags = data.flags;
    }
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param name The activity's name.
     */
    setName(name) {
        this.name = name;
        return this;
    }
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param type The activity's type.
     * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-types
     */
    setType(type) {
        this.type = type;
        return this;
    }
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param url Stream url, is validated when type is 1.
     */
    setURL(url) {
        this.url = url;
        return this;
    }
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param createdAt Unix timestamp of when the activity was added to the user's session.
     */
    setCreatedAt(createdAt) {
        this.created_at = createdAt;
        return this;
    }
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param timestamps Unix timestamps for start and/or end of the game.
     */
    setTimestamps(timestamps) {
        this.timestamps = timestamps;
        return this;
    }
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param applicationID Application id for the game.
     */
    setApplicationID(applicationID) {
        this.application_id = applicationID;
        return this;
    }
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param details What the player is currently doing.
     */
    setDetails(details) {
        this.details = details;
        return this;
    }
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param state The user's current party status.
     */
    setState(state) {
        this.state = state;
        return this;
    }
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param emoji The emoji used for a custom status.
     * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-emoji
     */
    setEmoji(emoji) {
        this.emoji = emoji;
        return this;
    }
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param party Information for the current party of the player.
     * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-party
     */
    setParty(party) {
        this.party = party;
        return this;
    }
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param assets Images for the presence and their hover texts.
     * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-assets
     */
    setAssets(assets) {
        this.assets = assets;
        return this;
    }
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param secrets Secrets for Rich Presence joining and spectating.
     * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-secrets
     */
    setSecrets(secrets) {
        this.secrets = secrets;
        return this;
    }
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param instance Whether or not the activity is an instanced game session.
     */
    setInstance(instance) {
        this.instance = instance;
        return this;
    }
    /**
     * Modifies this presence game and returns it.
     * @since 0.0.1
     * @param flags Activity flags, describes what the payload includes.
     */
    setFlags(flags) {
        this.flags = new Activity_1.Activity(flags).valueOf();
        return this;
    }
}
exports.PresenceGameBuilder = PresenceGameBuilder;
//# sourceMappingURL=PresenceGameBuilder.js.map