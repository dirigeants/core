import { DataStore, Constructor } from './base/DataStore';
import { User } from '../structures/User';
import { Client } from '../../Client';

export class UserStore extends DataStore<User> {

	public constructor(client: Client) {
		super(client, User as Constructor<User>);
	}

}
