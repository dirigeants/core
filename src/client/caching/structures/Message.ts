import { Structure } from './base/Structure';

import type { Client } from '../../Client';
import type { WebhookClient } from '../../WebhookClient';
import type { APIMessageData } from '../../../util/types/DiscordAPI';

export class Message extends Structure {

	public id: string;
	public content!: string;

	public constructor(client: Client | WebhookClient, data: APIMessageData) {
		super(client);

		this.id = data.id;

		this._patch(data);
	}

	protected _patch(data: APIMessageData): this {
		this.content = data.content;
		// todo: fill in logic
		return this;
	}

}
