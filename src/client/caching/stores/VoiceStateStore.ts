import { DataStore, Constructor } from './base/DataStore';
import { VoiceState } from '../structures/guilds/VoiceState';

import type { Client } from '../../Client';

export class VoiceStateStore extends DataStore<VoiceState> {

	public constructor(client: Client) {
		super(client, VoiceState as Constructor<VoiceState>);
	}

}
