import { Action } from '../../lib/structures/Action';
import { isTextBasedChannel } from '../../util/Util';

import type { MessageDeleteBulkDispatch } from '@klasa/ws';
import type { Message } from '../../client/caching/structures/Message';

export default class CoreAction extends Action {

	/**
	 * Processes the event data from the websocket.
	 * @since 0.0.1
	 * @param data The raw data from {@link Client#ws}
	 */
	public run(data: MessageDeleteBulkDispatch): void {
		const guild = data.d.guild_id ? this.client.guilds.get(data.d.guild_id) : null;
		const channel = guild ? guild.channels.get(data.d.channel_id) : this.client.dms.get(data.d.channel_id);
		if (!channel || !isTextBasedChannel(channel)) return;

		const messages: ({ id: string } | Message)[] = [];
		for (const id of data.d.ids) {
			const message = channel.messages.get(id);
			if (message) {
				message.deleted = true;
				channel.messages.delete(id);
				messages.push(message);
			} else {
				// TODO(kyranet): Maybe make PartialMessage class?
				messages.push({ id });
			}
		}

		this.client.emit(this.clientEvent, messages, channel);
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
