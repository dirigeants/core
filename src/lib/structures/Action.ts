import { Event, EventOptions } from './Event';
import { ActionStore } from './ActionStore';

import type { EventStore } from './EventStore';
import { DispatchPayload } from '@klasa/ws';
import { Structure } from '../../client/caching/structures/base/Structure';

/**
 * The common class for all actions.
 */
export abstract class Action extends Event {

	/**
	 * The name of the event from {@link Client} to be fired.
	 * @since 0.0.1
	 */
	public readonly publicEvent: string;

	public constructor(store: ActionStore, directory: string, file: readonly string[], options: ActionOptions = {}) {
		super(store as unknown as EventStore, directory, file, { ...options, once: false, emitter: 'ws' });
		this.publicEvent = options.publicEvent ?? '';
	}

	public run(data: ActionDispatch): void {
		const struct = this.check(data);
		if (struct) {
			// eslint-disable-next-line dot-notation
			struct['_patch'](data);
			return;
		}

		const built = this.build(data);
		this.cache(built);
		this.client.emit(this.publicEvent, built);
	}

	public abstract check(data: ActionDispatch): Structure | null;

	public abstract build(data: ActionDispatch): Structure;

	public abstract cache(data: Structure): void;

}

/**
 * The data emitted by the websocket.
 */
export type ActionDispatch = DispatchPayload['d'];

/**
 * The piece options for all {@link Action} instances.
 */
export interface ActionOptions extends EventOptions {
	/**
	 * The name of the event from {@link Client} to be fired.
	 */
	publicEvent?: string;

	/**
	 * @internal
	 */
	once?: never;

	/**
	 * @internal
	 */
	emitter?: never;
}
