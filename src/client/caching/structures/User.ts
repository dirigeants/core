import { Structure } from './base/Structure';

import type { Client } from '../../Client';
import type { WebhookClient } from '../../WebhookClient';
import type { APIUserData } from '@klasa/dapi-types';

export class User extends Structure {

	public id: string;
	public username?: string;

	public constructor(client: Client | WebhookClient, data: APIUserData) {
		super(client);

		this.id = data.id;

		this._patch(data);
	}

	protected _patch(data: APIUserData): this {
		this.username = data.username;

		return this;
	}

}
