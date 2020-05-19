import { Action } from '../../lib/pieces/Action';
import { extender } from '../../lib/util/Extender';

import type { MessageCreateDispatch } from '@klasa/ws';
import type { Message } from '../../lib/caching/structures/Message';

export default class CoreAction extends Action {

	public check(): null {
		return null;
	}

	public build(data: MessageCreateDispatch): Message | null {
		return new (extender.get('Message'))(this.client, data.d);
	}

	public cache(data: Message): void {
		data.channel.messages.set(data.id, data);
		data.channel.lastMessageID = data.id;
	}

}
