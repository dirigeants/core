/* eslint-disable @typescript-eslint/camelcase */
import {
	ActivityFlags,
	ActivityType,
	APIActivityData,
	APIActivityDataAssets,
	APIActivityDataEmoji,
	APIActivityDataParty,
	APIActivityDataSecrets,
	APIActivityDataTimestamp
} from '@klasa/dapi-types';

/**
 * The presence game builder.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-structure
 */
export class PresenceGameBuilder implements APIActivityData {

	/**
	 * The activity's name.
	 * @since 0.0.1
	 */
	public name: string;

	/**
	 * The activity's type.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-types
	 */
	public type: ActivityType;

	/**
	 * Stream url, is validated when type is 1.
	 * @since 0.0.1
	 */
	public url?: string | null;

	/**
	 * Unix timestamp of when the activity was added to the user's session.
	 * @since 0.0.1
	 */
	public created_at: number;

	/**
	 * Unix timestamps for start and/or end of the game.
	 * @since 0.0.1
	 */
	public timestamps?: APIActivityDataTimestamp;

	/**
	 * Application id for the game.
	 * @since 0.0.1
	 */
	public application_id?: string;

	/**
	 * What the player is currently doing.
	 * @since 0.0.1
	 */
	public details?: string | null;

	/**
	 * The user's current party status.
	 * @since 0.0.1
	 */
	public state?: string | null;

	/**
	 * The emoji used for a custom status.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-emoji
	 */
	public emoji?: APIActivityDataEmoji | null;

	/**
	 * Information for the current party of the player.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-party
	 */
	public party?: APIActivityDataParty;

	/**
	 * Images for the presence and their hover texts.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-assets
	 */
	public assets?: APIActivityDataAssets;

	/**
	 * Secrets for Rich Presence joining and spectating.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-secrets
	 */
	public secrets?: APIActivityDataSecrets;

	/**
	 * Whether or not the activity is an instanced game session.
	 * @since 0.0.1
	 */
	public instance?: boolean;

	/**
	 * Activity flags `OR`d together, describes what the payload includes.
	 * @since 0.0.1
	 */
	public flags?: ActivityFlags;

	public constructor(data: Partial<APIActivityData> = {}) {
		this.name = data.name ?? '';
		this.type = data.type ?? ActivityType.Game;
		this.url = data.url;
		this.created_at = data.created_at ?? 0;
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
	public setName(name: string): this {
		this.name = name;
		return this;
	}

	/**
	 * Modifies this presence game and returns it.
	 * @since 0.0.1
	 * @param type The activity's type.
	 * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-types
	 */
	public setType(type: ActivityType): this {
		this.type = type;
		return this;
	}

	/**
	 * Modifies this presence game and returns it.
	 * @since 0.0.1
	 * @param url Stream url, is validated when type is 1.
	 */
	public setURL(url: string | null): this {
		this.url = url;
		return this;
	}

	/**
	 * Modifies this presence game and returns it.
	 * @since 0.0.1
	 * @param createdAt Unix timestamp of when the activity was added to the user's session.
	 */
	public setCreatedAt(createdAt: number): this {
		this.created_at = createdAt;
		return this;
	}

	/**
	 * Modifies this presence game and returns it.
	 * @since 0.0.1
	 * @param timestamps Unix timestamps for start and/or end of the game.
	 */
	public setTimestamps(timestamps: APIActivityDataTimestamp): this {
		this.timestamps = timestamps;
		return this;
	}

	/**
	 * Modifies this presence game and returns it.
	 * @since 0.0.1
	 * @param applicationID Application id for the game.
	 */
	public setApplicationID(applicationID: string): this {
		this.application_id = applicationID;
		return this;
	}

	/**
	 * Modifies this presence game and returns it.
	 * @since 0.0.1
	 * @param details What the player is currently doing.
	 */
	public setDetails(details: string | null): this {
		this.details = details;
		return this;
	}

	/**
	 * Modifies this presence game and returns it.
	 * @since 0.0.1
	 * @param state The user's current party status.
	 */
	public setState(state: string | null): this {
		this.state = state;
		return this;
	}

	/**
	 * Modifies this presence game and returns it.
	 * @since 0.0.1
	 * @param emoji The emoji used for a custom status.
	 * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-emoji
	 */
	public setEmoji(emoji: APIActivityDataEmoji | null): this {
		this.emoji = emoji;
		return this;
	}

	/**
	 * Modifies this presence game and returns it.
	 * @since 0.0.1
	 * @param party Information for the current party of the player.
	 * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-party
	 */
	public setParty(party: APIActivityDataParty): this {
		this.party = party;
		return this;
	}

	/**
	 * Modifies this presence game and returns it.
	 * @since 0.0.1
	 * @param assets Images for the presence and their hover texts.
	 * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-assets
	 */
	public setAssets(assets: APIActivityDataAssets): this {
		this.assets = assets;
		return this;
	}

	/**
	 * Modifies this presence game and returns it.
	 * @since 0.0.1
	 * @param secrets Secrets for Rich Presence joining and spectating.
	 * @see https://discord.com/developers/docs/topics/gateway#activity-object-activity-secrets
	 */
	public setSecrets(secrets: APIActivityDataSecrets): this {
		this.secrets = secrets;
		return this;
	}

	/**
	 * Modifies this presence game and returns it.
	 * @since 0.0.1
	 * @param instance Whether or not the activity is an instanced game session.
	 */
	public setInstance(instance: boolean): this {
		this.instance = instance;
		return this;
	}

	/**
	 * Modifies this presence game and returns it.
	 * @since 0.0.1
	 * @param flags Activity flags `OR`d together, describes what the payload includes.
	 */
	public setFlags(flags: ActivityFlags): this {
		this.flags = flags;
		return this;
	}

}
