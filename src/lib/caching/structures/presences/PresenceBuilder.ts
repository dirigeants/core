/* eslint-disable no-dupe-class-members */
import { PresenceGameBuilder } from './PresenceGameBuilder';

import type { WSIdentify } from '@klasa/ws';
import type { APIActivityData } from '@klasa/dapi-types';

export type StatusUpdateData = NonNullable<WSIdentify['presence']>;
export type PresenceStatus = 'online' | 'dnd' | 'idle' | 'invisible' | 'offline';

/**
 * The presence builder.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/topics/gateway#update-status-gateway-status-update-structure
 */
export class PresenceBuilder implements StatusUpdateData {

	/**
	 * Unix time (in milliseconds) of when the client went idle, or null if the client is not idle.
	 * @since 0.0.1
	 */
	public since: number | null;

	/**
	 * Null, or the user's new activity.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/topics/gateway#activity-object
	 */
	public game: APIActivityData | null;

	/**
	 * The user's new status.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/topics/gateway#update-status-status-types
	 */
	public status: PresenceStatus;

	/**
	 * Whether or not the client is afk.
	 * @since 0.0.1
	 */
	public afk: boolean;

	public constructor(data: Partial<StatusUpdateData> = {}) {
		this.since = data.since ?? null;
		this.game = data.game ?? null;
		this.status = data.status ?? 'online';
		this.afk = data.afk ?? false;
	}

	/**
	 * Modifies the presence and returns it.
	 * @since 0.0.1
	 * @param since Unix time (in milliseconds) of when the client went idle, or null if the client is not idle.
	 */
	public setSince(since: Date | number | null = Date.now()): this {
		this.since = since instanceof Date ? since.getTime() : since;
		return this;
	}

	/**
	 * Modifies the presence with raw data, and returns it.
	 * @param game Null, or the user's new activity.
	 * @see https://discord.com/developers/docs/topics/gateway#activity-object
	 */
	public setGame(game: PresenceGameBuilder | null): this;
	/**
	 * Modifies the presence with a builder, and returns it.
	 * @since 0.0.1
	 * @param builder The builder to aid building the game.
	 */
	public setGame(builder: (game: APIActivityData) => PresenceGameBuilder): this;
	public setGame(game: APIActivityData | null | ((game: PresenceGameBuilder) => PresenceGameBuilder)): this {
		this.game = typeof game === 'function' ? game(new PresenceGameBuilder()) : game;
		return this;
	}

	/**
	 * Modifies the presence and returns it.
	 * @since 0.0.1
	 * @param status The user's new status.
	 * @see https://discord.com/developers/docs/topics/gateway#update-status-status-types
	 */
	public setStatus(status: PresenceStatus): this {
		this.status = status;
		return this;
	}

	/**
	 * Modifies the presence and returns it.
	 * @since 0.0.1
	 * @param afk Whether or not the client is afk.
	 */
	public setAfk(afk: boolean): this {
		this.afk = afk;
		return this;
	}


}
