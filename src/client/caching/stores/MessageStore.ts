import { DataStore } from './base/DataStore';
import { extender } from '../../../util/Extender';

import type { Message } from '../structures/Message';
import type { Client } from '../../Client';

export class MessageStore extends DataStore<Message> {

	public constructor(client: Client) {
		super(client, extender.get('Message'));
	}

}
