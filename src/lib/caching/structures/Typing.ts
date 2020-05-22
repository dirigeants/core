import { TimerManager } from '@klasa/timer-manager';
import { Routes } from '@klasa/rest';

import type { DMChannel } from './channels/DMChannel';
import type { Client } from '../../client/Client';
import type { GuildTextChannel } from './channels/GuildTextChannel';

/**
 * Handles typing indication sending in text channels
 */
export class Typing {

	/**
	 * The client this typing manager is for.
	 * @since 0.0.1
	 */
	public readonly client: Client;

	/**
	 * The channel this typing manager is for.
	 */
	public readonly channel: GuildTextChannel | DMChannel;

	/**
	 * The internal typing counter (allows handling of multiple commands in the same channel).
	 * @since 0.0.1
	 */
	#count = 0;

	/**
	 * The internal interval to fire typing indications
	 * @since 0.0.1
	 */
	#interval: NodeJS.Timeout | null = null;

	public constructor(channel: GuildTextChannel | DMChannel) {
		this.client = channel.client;
		this.channel = channel;
	}

	/**
	 * Ups the internal typing counter and starts typing if not already.
	 * @param count How much to increase the internal counter. (Typically leave this at the default 1)
	 * @since 0.0.1
	 */
	public start(count = 1): void {
		this.#count += count;
		if (!this.#interval) this._startTyping();
	}

	/**
	 * Lowers the internal typing counter and stops typing if the counter reaches 0 (or less).
	 * @param count How much to decrease the internal counter. (Typically leave this at the default 1)
	 * @since 0.0.1
	 */
	public stop(count = 1): void {
		this.#count -= count;
		if (this.#count < 0) this.#count = 0;
		if (!this.#count) this._stopTyping();
	}

	/**
	 * An alias for Typing#stop(Infinity). Forces the counter back to 0, and stops typing.
	 * @since 0.0.1
	 */
	public forceStop(): void {
		return this.stop(Infinity);
	}

	/**
	 * Internal method to start the typing interval if not already started.
	 * @since 0.0.1
	 */
	protected _startTyping(): void {
		if (!this.#interval) {
			this._type();
			this.#interval = TimerManager.setInterval(this._type.bind(this), 9000);
		}
	}

	/**
	 * Internal method to send a typing indicator.
	 * @since 0.0.1
	 */
	protected async _type(): Promise<void> {
		try {
			await this.client.api.post(Routes.channelTyping(this.channel.id));
		} catch {
			this.#count = 0;
			this._stopTyping();
		}
	}

	/**
	 * Internal method to stop the typing interval if not already stopped.
	 * @since 0.0.1
	 */
	protected _stopTyping(): void {
		if (this.#interval) {
			TimerManager.clearInterval(this.#interval as NodeJS.Timeout);
			this.#interval = null;
		}
	}

}
