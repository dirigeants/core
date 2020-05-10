import { Structure } from '../base/Structure';

import type { APIPresenceUpdateData } from '@klasa/dapi-types';
import type { Client } from '../../../Client';

export class Presence extends Structure {

	public id: string;

	public constructor(client: Client, data: APIPresenceUpdateData) {
		super(client);
		this.id = data.user.id;
	}

	_patch(): this {
		return this;
	}

}
