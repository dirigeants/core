import { Store, PieceConstructor } from './base/Store';
import { Action } from './Action';

import type { Client } from '../../client/Client';

/**
 * @since 0.0.1
 * The {@link Action} store.
 */
export class ActionStore extends Store<Action> {

	/**
	 * @since 0.0.1
	 * @param client The client this Store was created with
	 */
	public constructor(client: Client) {
		super(client, 'actions', Action as PieceConstructor<Action>);
	}

	/**
	 * Clears the actions from the store and removes the listeners.
	 * @since 0.0.1
	 */
	public clear(): void {
		for (const event of this.values()) this.delete(event);
	}

	/**
	 * Deletes an action from the store.
	 * @since 0.0.1
	 * @param name An action object or a string representing the action name.
	 * @returns Whether or not the delete was successful.
	 */
	public delete(name: Action | string): boolean {
		const event = this.resolve(name);
		if (!event) return false;
		// eslint-disable-next-line dot-notation
		event['_unlisten']();
		return super.delete(event);
	}

	/**
	 * Sets up an action in our store.
	 * @since 0.0.1
	 * @param piece The event piece we are setting up
	 */
	public set(piece: Action): Action | null {
		const event = super.set(piece);
		if (!event) return null;
		// eslint-disable-next-line dot-notation
		event['_listen']();
		return event;
	}

}
