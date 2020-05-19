import { Action } from '../../lib/pieces/Action';
import { isTextBasedChannel } from '../../lib/util/Util';

import type { MessageReactionRemoveEmojiDispatch } from '@klasa/ws';

export default class CoreAction extends Action {

	/**
	 * Processes the event data from the websocket.
	 * @since 0.0.1
	 * @param data The raw data from {@link Client#ws}
	 */
	public run(data: MessageReactionRemoveEmojiDispatch): void {
		// TODO(VladFrangu): refactor this to remove code dupe from other actions
		const guild = (data.d.guild_id && this.client.guilds.get(data.d.guild_id)) ?? null;
		const channel = guild ? guild.channels.get(data.d.channel_id) : this.client.dms.get(data.d.channel_id);
		if (!channel || !isTextBasedChannel(channel)) return;

		const message = channel.messages.get(data.d.message_id);
		if (!message) return;

		const reactionID = data.d.emoji.id ?? data.d.emoji.name as string;
		const reaction = message.reactions.get(reactionID);
		if (!reaction) return;

		message.reactions.delete(reaction.id);
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
