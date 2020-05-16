import { Action } from '../lib/structures/Action';

import type { WebhooksUpdateDispatch } from '@klasa/ws';
import type { TextChannel } from '../client/caching/structures/channels/TextChannel';
import type { NewsChannel } from '../client/caching/structures/channels/NewsChannel';

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
