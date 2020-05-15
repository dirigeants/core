import { Action } from '../../lib/structures/Action';
import { isTextBasedChannel } from '../../util/Util';

import type { MessageReactionRemoveDispatch } from '@klasa/ws';
import type { MessageReaction } from '../../client/caching/structures/messages/MessageReaction';

export default class CoreAction extends Action {

	public check(data: MessageReactionRemoveDispatch): MessageReaction | null {
		const guild = (data.d.guild_id && this.client.guilds.get(data.d.guild_id)) ?? null;
		const channel = guild ? guild.channels.get(data.d.channel_id) : this.client.channels.get(data.d.channel_id);
		if (!channel || !isTextBasedChannel(channel)) return null;

		return channel.messages.get(data.d.message_id)?.reactions.get(data.d.emoji.id || data.d.emoji.name as string) ?? null;
	}

	public build(): null {
		return null;
	}

	public cache(data: MessageReaction): void {
		data.message.reactions.delete(data.id);
	}

}
