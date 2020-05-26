import { Action, isTextBasedChannel, extender, Message, MessageReaction } from '@klasa/core';

import type { MessageReactionAddDispatch } from '@klasa/ws';

export default class CoreAction extends Action {

	/**
	 * Processes the event data from the websocket.
	 * @since 0.0.1
	 * @param data The raw data from {@link Client#ws}
	 */
	public run(data: MessageReactionAddDispatch): void {
		const guild = data.d.guild_id ? this.client.guilds.get(data.d.guild_id) : undefined;
		if (data.d.member && guild) {
			// eslint-disable-next-line dot-notation
			guild.members['_add'](data.d.member);
		}

		const user = this.client.users.get(data.d.user_id);
		if (!user) return;

		const channel = guild ? guild.channels.get(data.d.channel_id) : this.client.dms.get(data.d.channel_id);
		if (!channel || !isTextBasedChannel(channel)) return;

		const message = channel.messages.get(data.d.message_id);
		if (!message) return;

		const reaction = this.ensureReaction(message, data);
		if (user.id === this.client.user?.id) reaction.me = true;
		reaction.users.set(user.id);
		++reaction.count;

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

	private ensureReaction(message: Message, data: MessageReactionAddDispatch): MessageReaction {
		const reaction = message.reactions.get(data.d.emoji.id || data.d.emoji.name as string);
		if (reaction) return reaction;

		const built = new (extender.get('MessageReaction'))(this.client, data.d, message);
		message.reactions.set(built.id, built);
		return built;
	}

}
