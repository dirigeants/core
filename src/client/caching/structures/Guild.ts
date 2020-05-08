import { Structure } from './base/Structure';

import type { Client } from '../../Client';
import type { WebhookClient } from '../../WebhookClient';
import type { APIGuildData } from '@klasa/dapi-types';

export class Guild extends Structure {

	public id: string;
	public owner?: boolean;

	public constructor(client: Client | WebhookClient, data: APIGuildData) {
		super(client);

		this.id = data.id;

		this._patch(data);
	}

	protected _patch(data: APIGuildData): this {
		this.owner = data.owner;
		return this;
	}

}
