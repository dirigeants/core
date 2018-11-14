import { APIMessageData } from '../../../util/types';
import Client from '../../Client';
import Structure from './base/Structure';

export default class extends Structure {

	public id;

	public constructor(client: Client, data: APIMessageData) {
		super(client);
		this.id = data.id;
		this.patch(data);
	}

	public patch(data: APIMessageData): this {
		// to-do fill in logic
		return this;
	}

}
