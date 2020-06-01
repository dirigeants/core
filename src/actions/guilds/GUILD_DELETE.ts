import { Action, ClientEvents, extender } from '@klasa/core';

import type { GuildDeleteDispatch } from '@klasa/ws';

export default class CoreAction extends Action {

	/**
	 * Processes the event data from the websocket.
	 * @since 0.0.1
	 * @param data The raw data from {@link Client#ws}
	 */
	public run(data: GuildDeleteDispatch): void {
		const guild = this.client.guilds.get(data.d.id);
		if (!guild) {
			if (!data.d.unavailable) return;

			const created = new (extender.get('Guild'))(this.client, data.d, data.shard_id);
			if (this.client.options.cache.enabled) {
				this.client.guilds.set(created.id, created);
			}

			this.client.emit(ClientEvents.GuildUnavailable, created);
			return;
		}

		if (data.d.unavailable) {
			guild.unavailable = true;
			this.client.emit(ClientEvents.GuildUnavailable, guild);
		} else {
			guild.unavailable = false;
			guild.deleted = true;
			this.client.guilds.delete(guild.id);
			this.client.emit(ClientEvents.GuildDelete, guild);
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
