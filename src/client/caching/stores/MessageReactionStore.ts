import { DataStore } from './base/DataStore';
import { extender } from '../../../util/Extender';

import type { Client } from '../../Client';
import type { MessageReaction } from '../structures/messages/MessageReaction';

export class MessageReactionStore extends DataStore<MessageReaction> {

	public constructor(client: Client) {
		super(client, extender.get('MessageReaction'), client.options.cache.limits.reactions);
	}

}
