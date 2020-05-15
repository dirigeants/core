import { Action } from '../lib/structures/Action';

import type { ResumedDispatch } from '@klasa/ws';
import { ClientEvents } from '../util/types/Util';

export default class CoreAction extends Action {

	/**
	 * Processes the event data from the websocket.
	 * @since 0.0.1
	 * @param data The raw data from {@link Client#ws}
	 */
	public run(data: ResumedDispatch): void {
		const shard = this.client.ws.shards.get(data.shard_id);
		if (shard) this.client.emit(ClientEvents.ShardResumed, shard);
	}

	public check(): null {
		return null;
	}

	public build(): null {
		return null;
	}

	public cache(): void {
		// noop
	}

}
