import { Action, extender, Message } from '@klasa/core';

import type { MessageCreateDispatch } from '@klasa/ws';

export default class CoreAction extends Action {

	public check(): null {
		return null;
	}

	public build(data: MessageCreateDispatch): Message | null {
		return new (extender.get('Message'))(this.client, data.d);
	}

	public cache(data: Message): void {
		if (this.client.options.cache.enabled) {
			data.channel.messages.set(data.id, data);
			data.channel.lastMessageID = data.id;
		}
	}

}
