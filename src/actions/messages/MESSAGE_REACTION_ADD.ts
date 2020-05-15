import { Action } from '../../lib/structures/Action';
import { isTextBasedChannel } from '../../util/Util';
import { extender } from '../../util/Extender';

import type { MessageReactionAddDispatch } from '@klasa/ws';

export default class CoreAction extends Action {

	/**
	 * Processes the event data from the websocket.
	 * @since 0.0.1
	 * @param data The raw data from {@link Client#ws}
	 */
	public run(data: MessageReactionAddDispatch): void {
		const guild = data.d.guild_id ? this.client.guilds.get(data.d.guild_id) : undefined;
		const channel = guild ? guild.channels.get(data.d.channel_id) : this.client.channels.get(data.d.channel_id);
		if (!channel || !isTextBasedChannel(channel)) return;

		const message = channel.messages.get(data.d.message_id);
		if (!message) return;

		const reaction = new (extender.get('MessageReaction'))(this.client, data.d, message);
		message.reactions.set(reaction.id, reaction);
		this.client.emit(this.clientEvent, reaction);
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
