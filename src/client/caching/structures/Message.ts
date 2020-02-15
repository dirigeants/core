import { APIMessageData } from '../../../util/types';
import { Client } from '../../Client';
import { Structure } from './base/Structure';

export class Message extends Structure {

	public id: string;
	public content!: string;

	public constructor(client: Client, data: APIMessageData) {
		super(client);

		this.id = data.id;

		this._patch(data);
	}

	protected _patch(data: APIMessageData): this {
		this.content = data.content;
		// to-do fill in logic
		return this;
	}

}
