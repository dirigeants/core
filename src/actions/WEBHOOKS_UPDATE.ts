import { Action } from '../lib/pieces/Action';

import type { WebhooksUpdateDispatch } from '@klasa/ws';
import type { TextChannel } from '../lib/caching/structures/channels/TextChannel';
import type { NewsChannel } from '../lib/caching/structures/channels/NewsChannel';

export default class CoreAction extends Action {

	public check(data: WebhooksUpdateDispatch): TextChannel | NewsChannel | null {
		return this.client.guilds.get(data.d.guild_id)?.channels.get(data.d.channel_id) as TextChannel | NewsChannel ?? null;
	}

	public build(): null {
		return null;
	}

	public cache(): void {
		// noop
	}

}
