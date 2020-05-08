import { DataStore } from './base/DataStore';
import { Message } from '../structures/Message';
import { Client } from '../../Client';

export class MessageStore extends DataStore<Message, typeof Message> {

	public constructor(client: Client) {
		super(client, Message);
	}

}
