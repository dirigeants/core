import { DataStore } from './base/DataStore';
import { extender } from '../../../util/Extender';

import type { Client } from '../../Client';
import type { VoiceState } from '../structures/guilds/VoiceState';

export class VoiceStateStore extends DataStore<VoiceState> {

	public constructor(client: Client) {
		super(client, extender.get('VoiceState'));
	}

}
