import { Structure } from '../base/Structure';

import type { APIRoleData } from '@klasa/dapi-types';
import type { Client } from '../../../Client';

export class Role extends Structure {

	public id: string;

	public constructor(client: Client, data: APIRoleData) {
		super(client);
		this.id = data.id;
	}

	_patch(): this {
		return this;
	}

}
