/* eslint-disable no-dupe-class-members */
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
import { Message } from '../caching/structures/Message';
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
		const extended = fn(structure);
		if (extended instanceof structure) throw new TypeError('The extended structure must extend the provided structure.');
		return super.set(key, extended);
	}

}

export type Constructor<T> = new (...args: unknown[]) => T;

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
export const extender = new Extender()
	.add('Ban', Ban)
	.add('CategoryChannel', CategoryChannel)
	.add('Channel', Channel)
	.add('ClientUser', ClientUser)
	.add('DMChannel', DMChannel)
	.add('Guild', Guild)
	.add('GuildChannel', GuildChannel)
	.add('GuildEmoji', GuildEmoji)
	.add('GuildMember', GuildMember)
	.add('Integration', Integration)
	.add('Invite', Invite)
	.add('Message', Message)
	.add('MessageReaction', MessageReaction)
	.add('NewsChannel', NewsChannel)
	.add('Overwrite', Overwrite)
	.add('Presence', Presence)
	.add('Role', Role)
	.add('StoreChannel', StoreChannel)
	.add('Team', Team)
	.add('TeamMember', TeamMember)
	.add('TextChannel', TextChannel)
	.add('User', User)
	.add('VoiceChannel', VoiceChannel)
	.add('VoiceState', VoiceState);
