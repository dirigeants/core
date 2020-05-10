import { DataStore, Constructor } from './base/DataStore';
import { Message } from '../structures/Message';

import type { Client } from '../../Client';

export class MessageStore extends DataStore<Message> {

	public constructor(client: Client) {
		super(client, Message as Constructor<Message>);
	}

}
