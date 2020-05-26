import { arrayStrictEquals } from '@klasa/utils';
import { Action, ClientEvents } from '@klasa/core';

import type { GuildEmojisUpdateDispatch } from '@klasa/ws';

export default class CoreAction extends Action {

	/**
	 * Processes the event data from the websocket.
	 * @since 0.0.1
	 * @param data The raw data from {@link Client#ws}
	 */
	public run(data: GuildEmojisUpdateDispatch): void {
		const guild = this.client.guilds.get(data.d.guild_id);
		if (!guild) return;

		for (const emoji of data.d.emojis) {
			const previous = guild.emojis.get(emoji.id as string);
			if (!previous) {
				// eslint-disable-next-line dot-notation
				const built = guild.emojis['_add'](emoji);
				this.client.emit(ClientEvents.GuildEmojiCreate, built, guild);
				continue;
			}

			if (emoji.name !== previous.name || emoji.available !== previous.available || !arrayStrictEquals(emoji.roles ?? [], previous.roleIDs)) {
				const clone = previous.clone();
				// eslint-disable-next-line dot-notation
				previous['_patch'](emoji);
				this.client.emit(ClientEvents.GuildEmojiUpdate, clone, previous, guild);
			}
		}

		for (const emoji of guild.emojis.values()) {
			const exists = data.d.emojis.some(value => value.id === emoji.id);
			if (!exists) {
				guild.emojis.delete(emoji.id);
				this.client.emit(ClientEvents.GuildEmojiDelete, emoji, guild);
			}
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
