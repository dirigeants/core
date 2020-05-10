import { Structure } from '../base/Structure';

import type { APIVoiceStatePartial } from '@klasa/dapi-types';
import type { Client } from '../../../Client';

export class VoiceState extends Structure {

	public id: string;

	public constructor(client: Client, data: APIVoiceStatePartial) {
		super(client);
		this.id = data.user_id;
	}

	_patch(): this {
		return this;
	}

}
