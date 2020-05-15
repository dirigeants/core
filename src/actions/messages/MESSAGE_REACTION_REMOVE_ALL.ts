import { Action } from '../../lib/structures/Action';
import { isTextBasedChannel } from '../../util/Util';

import type { MessageReactionRemoveAllDispatch } from '@klasa/ws';

export default class CoreAction extends Action {

	/**
	 * Processes the event data from the websocket.
	 * @since 0.0.1
	 * @param data The raw data from {@link Client#ws}
	 */
	public run(data: MessageReactionRemoveAllDispatch): void {
		const guild = (data.d.guild_id && this.client.guilds.get(data.d.guild_id)) ?? null;
		const channel = guild ? guild.channels.get(data.d.channel_id) : this.client.dms.get(data.d.channel_id);
		if (!channel || !isTextBasedChannel(channel)) return;

		const message = channel.messages.get(data.d.message_id);
		if (!message) return;

		const reactions = message.reactions.clone();
		message.reactions.clear();

		this.client.emit(this.clientEvent, message, reactions);
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
