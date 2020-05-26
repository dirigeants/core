import { Action } from '@klasa/core';

import type { TypingStartDispatch } from '@klasa/ws';

export default class CoreAction extends Action {

	/**
	 * Processes the event data from the websocket.
	 * @since 0.0.1
	 * @param data The raw data from {@link Client#ws}
	 */
	public run(data: TypingStartDispatch): void {
		const guild = (data.d.guild_id && this.client.guilds.get(data.d.guild_id)) ?? null;
		const channel = guild ? guild.channels.get(data.d.channel_id) : this.client.dms.get(data.d.channel_id);
		if (!channel) return;

		// eslint-disable-next-line dot-notation
		if (guild && data.d.member) guild.members['_add'](data.d.member);

		const user = this.client.users.get(data.d.user_id);
		if (!user) return;

		this.client.emit(this.clientEvent, channel, user);
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
