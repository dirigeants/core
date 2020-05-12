/* eslint-disable no-dupe-class-members */
import { Cache } from '@klasa/cache';
import { CategoryChannel } from '../client/caching/structures/channels/CategoryChannel';
import { DMChannel } from '../client/caching/structures/channels/DMChannel';
import { NewsChannel } from '../client/caching/structures/channels/NewsChannel';
import { StoreChannel } from '../client/caching/structures/channels/StoreChannel';
import { TextChannel } from '../client/caching/structures/channels/TextChannel';
import { VoiceChannel } from '../client/caching/structures/channels/VoiceChannel';
import { Guild } from '../client/caching/structures/guilds/Guild';
import { GuildEmoji } from '../client/caching/structures/guilds/GuildEmoji';
import { Ban } from '../client/caching/structures/guilds/Ban';
import { GuildMember } from '../client/caching/structures/guilds/GuildMember';
import { Invite } from '../client/caching/structures/guilds/Invite';
import { Presence } from '../client/caching/structures/guilds/Presence';
import { Role } from '../client/caching/structures/guilds/Role';
import { VoiceState } from '../client/caching/structures/guilds/VoiceState';
import { Application } from '../client/caching/structures/oauth/Application';
import { Team } from '../client/caching/structures/oauth/Team';
import { TeamMember } from '../client/caching/structures/oauth/TeamMember';
import { Message } from '../client/caching/structures/Message';
import { PermissionOverwrites } from '../client/caching/structures/PermissionOverwrites';
import { User } from '../client/caching/structures/User';
import { Channel } from '../client/caching/structures/channels/Channel';
import { GuildChannel } from '../client/caching/structures/channels/GuildChannel';
import { MessageReaction } from '../client/caching/structures/messages/MessageReaction';

/**
 * The extender class that allows the extension of built-in structures from Project-Blue and plugins.
 */
class Extender extends Cache<keyof ExtenderStructures, ExtenderStructures[keyof ExtenderStructures]> {

	/**
	 * Adds a new entry to this instance so it can be extended. Throws if a structure with the same name was already set.
	 * @param key The name of the structure to be set
	 * @param fn The class to be added to the registry
	 */
	public add<K extends keyof ExtenderStructures, V>(key: K, fn: V): this {
		if (super.has(key)) throw new Error(`The structure ${key} already exists.`);
		super.set(key, fn as unknown as ExtenderStructures[keyof ExtenderStructures]);
		return this;
	}

	/**
	 * The overriden set method, this will always throw. Use {@link Extender#add} for adding new structures, or {@link Extender#extend} to extend an existing one.
	 * @internal
	 */
	public set(): never {
		throw new Error('Cannot set keys to this extender.');
	}

	/**
	 * The overriden delete method, this will always throw.
	 * @internal
	 */
	public delete(): never {
		throw new Error('Cannot delete keys from this extender.');
	}

	/**
	 * The overriden get method, this extension makes it type-safe.
	 * @param key The structure to get from its name
	 */
	public get<K extends keyof ExtenderStructures>(key: K): ExtenderStructures[K];
	public get(key: string): undefined;
	public get<K extends keyof ExtenderStructures>(key: K): ExtenderStructures[K] | undefined {
		return super.get(key) as ExtenderStructures[K];
	}

	/**
	 * Extends a structure by its registered name.
	 * @param key The name of the structure to be extended
	 * @param fn A callback returning the extended class
	 * @example
	 * const { extender } = require('@klasa/project-blue');
	 * const { Settings } = require('@klasa/project-red');
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
	public extend<K extends keyof ExtenderStructures, R extends ExtenderStructures[K]>(key: K, fn: (structure: ExtenderStructures[K]) => R): this {
		const structure = this.get(key);
		if (typeof structure === 'undefined') throw new TypeError(`The structure ${key} does not exist.`);
		super.set(key, fn(structure));
		return this;
	}

}

export type Constructor<T> = new (...args: unknown[]) => T;

/**
 * The context data for Extender.
 */
export interface ExtenderStructures {
	Application: Constructor<Application>;
	Ban: Constructor<Ban>;
	CategoryChannel: Constructor<CategoryChannel>;
	Channel: Constructor<Channel>;
	DMChannel: Constructor<DMChannel>;
	Guild: Constructor<Guild>;
	GuildChannel: Constructor<GuildChannel>;
	GuildEmoji: Constructor<GuildEmoji>;
	GuildMember: Constructor<GuildMember>;
	Invite: Constructor<Invite>;
	Message: Constructor<Message>;
	MessageReaction: Constructor<MessageReaction>;
	NewsChannel: Constructor<NewsChannel>;
	PermissionOverwrites: Constructor<PermissionOverwrites>;
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
export const extender = new Extender()
	.add('Application', Application)
	.add('Ban', Ban)
	.add('CategoryChannel', CategoryChannel)
	.add('Channel', Channel)
	.add('DMChannel', DMChannel)
	.add('Guild', Guild)
	.add('GuildChannel', GuildChannel)
	.add('GuildEmoji', GuildEmoji)
	.add('GuildMember', GuildMember)
	.add('Invite', Invite)
	.add('Message', Message)
	.add('MessageReaction', MessageReaction)
	.add('NewsChannel', NewsChannel)
	.add('PermissionOverwrites', PermissionOverwrites)
	.add('Presence', Presence)
	.add('Role', Role)
	.add('StoreChannel', StoreChannel)
	.add('Team', Team)
	.add('TeamMember', TeamMember)
	.add('TextChannel', TextChannel)
	.add('User', User)
	.add('VoiceChannel', VoiceChannel)
	.add('VoiceState', VoiceState);
