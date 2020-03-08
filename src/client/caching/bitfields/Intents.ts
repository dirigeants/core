import { BitField, BitFieldObject } from '@klasa/bitfield';

export type IntentsResolvable = keyof typeof Intents.FLAGS | number | BitFieldObject | ((keyof typeof Intents.FLAGS) | number | BitFieldObject)[];

/* eslint-disable no-bitwise */

/**
 * Handles Gateway Intents in Project-Blue
 */
export class Intents extends BitField<IntentsResolvable> {

	/**
	 * The Intents flags
	 */
	public static FLAGS = {
		/**
		 * - GUILD_CREATE
		 * - GUILD_DELETE
		 * - GUILD_ROLE_CREATE
		 * - GUILD_ROLE_UPDATE
		 * - GUILD_ROLE_DELETE
		 * - CHANNEL_CREATE
		 * - CHANNEL_UPDATE
		 * - CHANNEL_DELETE
		 * - CHANNEL_PINS_UPDATE
		 */
		GUILDS: 1 << 0,
		/**
		 * - GUILD_MEMBER_ADD
		 * - GUILD_MEMBER_UPDATE
		 * - GUILD_MEMBER_REMOVE
		 */
		GUILD_MEMBERS: 1 << 1,
		/**
		 * - GUILD_BAN_ADD
		 * - GUILD_BAN_REMOVE
		 */
		GUILD_BANS: 1 << 2,
		/**
		 * - GUILD_EMOJIS_UPDATE
		 */
		GUILD_EMOJIS: 1 << 3,
		/**
		 * - GUILD_INTEGRATIONS_UPDATE
		 */
		GUILD_INTEGRATIONS: 1 << 4,
		/**
		 * - WEBHOOKS_UPDATE
		 */
		GUILD_WEBHOOKS: 1 << 5,
		/**
		 * - INVITE_CREATE
		 * - INVITE_DELETE
		 */
		GUILD_INVITES: 1 << 6,
		/**
		 * - VOICE_STATE_UPDATE
		 */
		GUILD_VOICE_STATES: 1 << 7,
		/**
		 * - PRESENCE_UPDATE
		 */
		GUILD_PRESENCES: 1 << 8,
		/**
		 * - MESSAGE_CREATE
		 * - MESSAGE_UPDATE
		 * - MESSAGE_DELETE
		 */
		GUILD_MESSAGES: 1 << 9,
		/**
		 * - MESSAGE_REACTION_ADD
		 * - MESSAGE_REACTION_REMOVE
		 * - MESSAGE_REACTION_REMOVE_ALL
		 * - MESSAGE_REACTION_REMOVE_EMOJI
		 */
		GUILD_MESSAGE_REACTIONS: 1 << 10,
		/**
		 * - TYPING_START
		 */
		GUILD_MESSAGE_TYPING: 1 << 11,
		/**
		 * - CHANNEL_CREATE
		 * - MESSAGE_UPDATE
		 * - MESSAGE_DELETE
		 * - CHANNEL_PINS_UPDATE
		 */
		DIRECT_MESSAGES: 1 << 12,
		/**
		 * - MESSAGE_REACTION_ADD
		 * - MESSAGE_REACTION_REMOVE
		 * - MESSAGE_REACTION_REMOVE_ALL
		 * - MESSAGE_REACTION_REMOVE_EMOJI
		 */
		DIRECT_MESSAGE_REACTIONS: 1 << 13,
		/**
		 * - TYPING_START
		 */
		DIRECT_MESSAGE_TYPING: 1 << 14
	} as const;

	/**
	 * Project-Blue default intents, consisting of:
	 * - GUILDS
	 * - GUILD_BANS
	 * - GUILD_EMOJIS
	 * - GUILD_INTEGRATIONS
	 * - GUILD_WEBHOOKS
	 * - GUILD_INVITES
	 * - GUILD_VOICE_STATES
	 * - GUILD_MESSAGES
	 * - GUILD_MESSAGE_REACTIONS
	 * - DIRECT_MESSAGES
	 * - DIRECT_MESSAGE_REACTIONS
	 */
	public static DEFAULT = Intents.FLAGS.GUILDS |
		Intents.FLAGS.GUILD_BANS |
		Intents.FLAGS.GUILD_EMOJIS |
		Intents.FLAGS.GUILD_INTEGRATIONS |
		Intents.FLAGS.GUILD_WEBHOOKS |
		Intents.FLAGS.GUILD_INVITES |
		Intents.FLAGS.GUILD_VOICE_STATES |
		Intents.FLAGS.GUILD_MESSAGES |
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS |
		Intents.FLAGS.DIRECT_MESSAGES |
		Intents.FLAGS.DIRECT_MESSAGE_REACTIONS;

	/**
	 * Project-Blue default intents, with the addition of the `GUILD_MEMBERS` flag
	 * Note: You need to enable support for it in the developer page of your bot
	 */
	public static DEFAULT_WITH_MEMBERS = Intents.DEFAULT | Intents.FLAGS.GUILD_MEMBERS;

}

/* eslint-enable no-bitwise */
