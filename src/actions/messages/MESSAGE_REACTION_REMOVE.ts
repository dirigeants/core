import { Action, isTextBasedChannel } from '@klasa/core';

import type { MessageReactionRemoveDispatch } from '@klasa/ws';

export default class CoreAction extends Action {

	/**
	 * Processes the event data from the websocket.
	 * @since 0.0.1
	 * @param data The raw data from {@link Client#ws}
	 */
	public run(data: MessageReactionRemoveDispatch): void {
		// TODO(VladFrangu): refactor this to remove code dupe from other actions
		const guild = (data.d.guild_id && this.client.guilds.get(data.d.guild_id)) ?? null;
		const user = this.client.users.get(data.d.user_id);
		if (!user) return;

		const channel = guild ? guild.channels.get(data.d.channel_id) : this.client.dms.get(data.d.channel_id);
		if (!channel || !isTextBasedChannel(channel)) return;

		const message = channel.messages.get(data.d.message_id);
		if (!message) return;

		const reactionID = data.d.emoji.id ?? data.d.emoji.name as string;
		const reaction = message.reactions.get(reactionID);
		if (!reaction) return;

		if (reaction.users.delete(data.d.user_id) && --reaction.count === 0) {
			message.reactions.delete(reactionID);
		}

		if (user.id === this.client.user?.id) {
			reaction.me = false;
		}

		this.client.emit(this.clientEvent, reaction, user);
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
