import { DataStore } from './base/DataStore';
import { User } from '../structures/User';
import { Client } from '../../Client';

// TODO: Implement UserStore related functions like fetch
export class UserStore extends DataStore<User, typeof User> {

	public constructor(client: Client) {
		super(client, User);
	}

}
