import { Action, ClientEvents } from '@klasa/core';

import type { ResumedDispatch } from '@klasa/ws';

export default class CoreAction extends Action {

	/**
	 * Processes the event data from the websocket.
	 * @since 0.0.1
	 * @param data The raw data from {@link Client#ws}
	 */
	public run(data: ResumedDispatch): void {
		const shard = this.client.ws.shards.get(data.shard_id);
		this.client.emit(ClientEvents.ShardResumed, shard);
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
