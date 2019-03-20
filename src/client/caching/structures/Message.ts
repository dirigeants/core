import { APIMessageData } from '../../../util/types.ts';
import Client from '../../Client.ts';
import Structure from './base/Structure.ts';

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
