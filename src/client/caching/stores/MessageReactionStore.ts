import { DataStore, Constructor } from './base/DataStore';
import { MessageReaction } from '../structures/messages/MessageReaction';

import type { Client } from '../../Client';

export class MessageReactionStore extends DataStore<MessageReaction> {

	public constructor(client: Client) {
		super(client, MessageReaction as Constructor<MessageReaction>);
	}

}
