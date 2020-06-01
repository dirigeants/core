import { Cache } from '@klasa/cache';
import { Ban } from '../caching/structures/guilds/Ban';
import { CategoryChannel } from '../caching/structures/channels/CategoryChannel';
import { Channel } from '../caching/structures/channels/Channel';
import { DMChannel } from '../caching/structures/channels/DMChannel';
import { Guild } from '../caching/structures/guilds/Guild';
import { GuildChannel } from '../caching/structures/channels/GuildChannel';
import { GuildEmoji } from '../caching/structures/guilds/GuildEmoji';
import { GuildMember } from '../caching/structures/guilds/GuildMember';
import { Integration } from '../caching/structures/guilds/Integration';
import { Invite } from '../caching/structures/Invite';
import { Message } from '../caching/structures/messages/Message';
import { MessageReaction } from '../caching/structures/messages/reactions/MessageReaction';
import { NewsChannel } from '../caching/structures/channels/NewsChannel';
import { Overwrite } from '../caching/structures/guilds/Overwrite';
import { Presence } from '../caching/structures/guilds/Presence';
import { Role } from '../caching/structures/guilds/Role';
import { StoreChannel } from '../caching/structures/channels/StoreChannel';
import { Team } from '../caching/structures/oauth/Team';
import { TeamMember } from '../caching/structures/oauth/TeamMember';
import { TextChannel } from '../caching/structures/channels/TextChannel';
import { User } from '../caching/structures/User';
import { VoiceChannel } from '../caching/structures/channels/VoiceChannel';
import { VoiceState } from '../caching/structures/guilds/VoiceState';
import { ClientUser } from '../caching/structures/ClientUser';
/**
 * The extender class that allows the extension of built-in structures from Klasa-Core and plugins.
 */
declare class Extender extends Cache<keyof ExtenderStructures, ExtenderStructures[keyof ExtenderStructures]> {
    /**
     * Adds a new entry to this instance so it can be extended. Throws if a structure with the same name was already set.
     * @param key The name of the structure to be set
     * @param fn The class to be added to the registry
     */
    add<K extends keyof ExtenderStructures, V>(key: K, fn: V): this;
    /**
     * The overriden set method, this will always throw. Use {@link Extender#add} for adding new structures, or {@link Extender#extend} to extend an existing one.
     * @internal
     */
    set(): never;
    /**
     * The overriden delete method, this will always throw.
     * @internal
     */
    delete(): never;
    /**
     * The overriden get method, this extension makes it type-safe.
     * @param key The structure to get from its name
     */
    get<K extends keyof ExtenderStructures>(key: K): ExtenderStructures[K];
    get(key: string): undefined;
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
    extend<K extends keyof ExtenderStructures, R extends ExtenderStructures[K]>(key: K, fn: (structure: ExtenderStructures[K]) => R): this;
}
export declare type Constructor<T> = new (...args: unknown[]) => T;
/**
 * The context data for Extender.
 */
export interface ExtenderStructures {
    Ban: Constructor<Ban>;
    CategoryChannel: Constructor<CategoryChannel>;
    Channel: Constructor<Channel>;
    ClientUser: Constructor<ClientUser>;
    DMChannel: Constructor<DMChannel>;
    Guild: Constructor<Guild>;
    GuildChannel: Constructor<GuildChannel>;
    GuildEmoji: Constructor<GuildEmoji>;
    GuildMember: Constructor<GuildMember>;
    Integration: Constructor<Integration>;
    Invite: Constructor<Invite>;
    Message: Constructor<Message>;
    MessageReaction: Constructor<MessageReaction>;
    NewsChannel: Constructor<NewsChannel>;
    Overwrite: Constructor<Overwrite>;
    Presence: Constructor<Presence>;
    Role: Constructor<Role>;
    StoreChannel: Constructor<StoreChannel>;
    Team: Constructor<Team>;
    TeamMember: Constructor<TeamMember>;
    TextChannel: Constructor<TextChannel>;
    User: Constructor<User>;
    VoiceChannel: Constructor<VoiceChannel>;
    VoiceState: Constructor<VoiceState>;
}
/**
 * The exported singleton instance of the {@link Extender} class.
 */
export declare const extender: Extender;
export {};
