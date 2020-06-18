import { Action, ClientEvents, extender } from '@klasa/core';

import type { GuildCreateDispatch } from '@klasa/ws';

export default class CoreAction extends Action {

	/**
	 * Processes the event data from the websocket.
	 * @since 0.0.1
	 * @param data The raw data from {@link Client#ws}
	 */
	public run(data: GuildCreateDispatch): void {
		const guild = this.client.guilds.get(data.d.id);
		// If the guild was not in cached, this is a new guild, emit GuildCreate
		if (!guild) {
			const created = new (extender.get('Guild'))(this.client, data.d, data.shard_id);
			if (this.client.options.cache.enabled) {
				this.client.guilds.set(created.id, created);
			}

			this.client.emit(ClientEvents.GuildCreate, created);
			return;
		}

		const { unavailable } = guild;

		// eslint-disable-next-line dot-notation
		guild['_patch'](data.d);

		// If it was unavailable and switches to available, emit GuildAvailable
		if (unavailable && !guild.unavailable) {
			this.client.emit(ClientEvents.GuildAvailable, guild);
		}
	}

	public check(): null {
		return null;
	}

	public build(): null {
		return null;
	}

	public cache(): void {
		// noop
	}

}
