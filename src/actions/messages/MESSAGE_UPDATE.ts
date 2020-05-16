import { Action } from '../../lib/structures/Action';
import { isTextBasedChannel } from '../../util/Util';

import type { MessageUpdateDispatch } from '@klasa/ws';

export default class CoreAction extends Action {

	/**
	 * Processes the event data from the websocket.
	 * @since 0.0.1
	 * @param data The raw data from {@link Client#ws}
	 */
	public run(data: MessageUpdateDispatch): void {
		const guild = data.d.guild_id ? this.client.guilds.get(data.d.guild_id) : undefined;
		const channel = guild ? guild.channels.get(data.d.channel_id) : this.client.dms.get(data.d.channel_id);
		if (!channel || !isTextBasedChannel(channel)) return;

		const message = channel.messages.get(data.d.id);
		if (!message) return;

		const clone = message.clone();
		// eslint-disable-next-line dot-notation
		message['_patch'](data.d);

		this.client.emit(this.clientEvent, message, clone);
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
