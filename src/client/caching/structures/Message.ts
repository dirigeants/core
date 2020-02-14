import { APIMessageData } from '../../../util/types.ts';
import Client from '../../Client.ts';
import Structure from './base/Structure.ts';

export default class extends Structure {

	public id: string;
	public content: string;

	public constructor(client: Client, data: APIMessageData) {
		super(client);
		this.id = data.id;
		// Make ts error go away for now
		this.content = data.content;
		this.patch(data);
	}

	public patch(data: APIMessageData): this {
		this.content = data.content;
		// to-do fill in logic
		return this;
	}

}
