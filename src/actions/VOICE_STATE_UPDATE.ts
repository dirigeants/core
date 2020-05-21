import { Action } from '../lib/pieces/Action';
import { extender } from '../lib/util/Extender';

import type { VoiceStateUpdateDispatch } from '@klasa/ws';
import type { VoiceState } from '../lib/caching/structures/guilds/VoiceState';

export default class CoreAction extends Action {

	public check(data: VoiceStateUpdateDispatch): VoiceState | null {
		return this.client.guilds.get(data.d.guild_id as string)?.voiceStates.get(data.d.user_id) ?? null;
	}

	public build(data: VoiceStateUpdateDispatch): VoiceState | null {
		const guild = this.client.guilds.get(data.d.guild_id as string);
		return guild ? new (extender.get('VoiceState'))(this.client, data.d, guild) : null;
	}

	public cache(data: VoiceState): void {
		if (this.client.options.cache.enabled) {
			data.guild.voiceStates.set(data.id, data);
		}
	}

}
