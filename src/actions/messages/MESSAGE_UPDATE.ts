import { Action } from '../../lib/structures/Action';
import { isTextBasedChannel } from '../../util/Util';
import { extender } from '../../util/Extender';

import type { MessageUpdateDispatch } from '@klasa/ws';
import type { Message } from '../../client/caching/structures/Message';

export default class CoreAction extends Action {

	public check(data: MessageUpdateDispatch): Message | null {
		const guild = data.d.guild_id ? this.client.guilds.get(data.d.guild_id) : undefined;
		const channel = guild ? guild.channels.get(data.d.channel_id) : this.client.dms.get(data.d.channel_id);
		if (!channel || !isTextBasedChannel(channel)) return null;
		return channel.messages.get(data.d.id) ?? null;
	}

	public build(data: MessageUpdateDispatch): Message | null {
		return new (extender.get('Message'))(this.client, data.d);
	}

	public cache(data: Message): void {
		data.channel.messages.set(data.id, data);
	}

}
