"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extender = void 0;
/* eslint-disable no-dupe-class-members */
const cache_1 = require("@klasa/cache");
const Ban_1 = require("../caching/structures/guilds/Ban");
const CategoryChannel_1 = require("../caching/structures/channels/CategoryChannel");
const Channel_1 = require("../caching/structures/channels/Channel");
const DMChannel_1 = require("../caching/structures/channels/DMChannel");
const Guild_1 = require("../caching/structures/guilds/Guild");
const GuildChannel_1 = require("../caching/structures/channels/GuildChannel");
const GuildEmoji_1 = require("../caching/structures/guilds/GuildEmoji");
const GuildMember_1 = require("../caching/structures/guilds/GuildMember");
const Integration_1 = require("../caching/structures/guilds/Integration");
const Invite_1 = require("../caching/structures/Invite");
const Message_1 = require("../caching/structures/Message");
const MessageReaction_1 = require("../caching/structures/messages/reactions/MessageReaction");
const NewsChannel_1 = require("../caching/structures/channels/NewsChannel");
const Overwrite_1 = require("../caching/structures/guilds/Overwrite");
const Presence_1 = require("../caching/structures/guilds/Presence");
const Role_1 = require("../caching/structures/guilds/Role");
const StoreChannel_1 = require("../caching/structures/channels/StoreChannel");
const Team_1 = require("../caching/structures/oauth/Team");
const TeamMember_1 = require("../caching/structures/oauth/TeamMember");
const TextChannel_1 = require("../caching/structures/channels/TextChannel");
const User_1 = require("../caching/structures/User");
const VoiceChannel_1 = require("../caching/structures/channels/VoiceChannel");
const VoiceState_1 = require("../caching/structures/guilds/VoiceState");
const ClientUser_1 = require("../caching/structures/ClientUser");
/**
 * The extender class that allows the extension of built-in structures from Klasa-Core and plugins.
 */
class Extender extends cache_1.Cache {
    /**
     * Adds a new entry to this instance so it can be extended. Throws if a structure with the same name was already set.
     * @param key The name of the structure to be set
     * @param fn The class to be added to the registry
     */
    add(key, fn) {
        if (super.has(key))
            throw new Error(`The structure ${key} already exists.`);
        super.set(key, fn);
        return this;
    }
    /**
     * The overriden set method, this will always throw. Use {@link Extender#add} for adding new structures, or {@link Extender#extend} to extend an existing one.
     * @internal
     */
    set() {
        throw new Error('Cannot set keys to this extender.');
    }
    /**
     * The overriden delete method, this will always throw.
     * @internal
     */
    delete() {
        throw new Error('Cannot delete keys from this extender.');
    }
    get(key) {
        return super.get(key);
    }
    /**
     * Extends a structure by its registered name.
     * @param key The name of the structure to be extended
     * @param fn A callback returning the extended class
     * @example
     * const { extender } = require('@klasa/core');
     * const { Settings } = require('klasa');
     *
     * extender.extend('TextChannel', (TextChannel) => class extends TextChannel {
     *
     *   constructor(...args) {
     *     super(...args);
     *     this.settings = new Settings(this.client, 'textChannels', this.id);
     *   }
     *
     * });
     */
    extend(key, fn) {
        const structure = this.get(key);
        if (typeof structure === 'undefined')
            throw new TypeError(`The structure ${key} does not exist.`);
        const extended = fn(structure);
        if (!(extended.prototype instanceof structure))
            throw new TypeError('The extended structure must extend the previous structure.');
        return super.set(key, extended);
    }
}
/**
 * The exported singleton instance of the {@link Extender} class.
 */
exports.extender = new Extender()
    .add('Ban', Ban_1.Ban)
    .add('CategoryChannel', CategoryChannel_1.CategoryChannel)
    .add('Channel', Channel_1.Channel)
    .add('ClientUser', ClientUser_1.ClientUser)
    .add('DMChannel', DMChannel_1.DMChannel)
    .add('Guild', Guild_1.Guild)
    .add('GuildChannel', GuildChannel_1.GuildChannel)
    .add('GuildEmoji', GuildEmoji_1.GuildEmoji)
    .add('GuildMember', GuildMember_1.GuildMember)
    .add('Integration', Integration_1.Integration)
    .add('Invite', Invite_1.Invite)
    .add('Message', Message_1.Message)
    .add('MessageReaction', MessageReaction_1.MessageReaction)
    .add('NewsChannel', NewsChannel_1.NewsChannel)
    .add('Overwrite', Overwrite_1.Overwrite)
    .add('Presence', Presence_1.Presence)
    .add('Role', Role_1.Role)
    .add('StoreChannel', StoreChannel_1.StoreChannel)
    .add('Team', Team_1.Team)
    .add('TeamMember', TeamMember_1.TeamMember)
    .add('TextChannel', TextChannel_1.TextChannel)
    .add('User', User_1.User)
    .add('VoiceChannel', VoiceChannel_1.VoiceChannel)
    .add('VoiceState', VoiceState_1.VoiceState);
//# sourceMappingURL=Extender.js.map