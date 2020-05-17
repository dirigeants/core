import { Routes } from '@klasa/rest';
import { DataStore } from './base/DataStore';
import { extender } from '../../../util/Extender';

import type { APIInviteData } from '@klasa/dapi-types';
import type { Invite } from '../structures/Invite';
import type { Client } from '../../Client';

export class InviteStore extends DataStore<Invite> {

	public constructor(client: Client) {
		super(client, extender.get('Invite'), client.options.cache.limits.invites);
	}

	/**
	 * Returns a {@link Invite invite} with optionally their metadata.
	 * @since 0.0.1
	 * @param code The {@link Invite#code invite code}.
	 * @see https://discord.com/developers/docs/resources/invite#get-invite
	 */
	public async fetch(code: string, options: InviteStoreFetchOptions = {}): Promise<Invite> {
		const endpoint = Routes.invite(code);

		// eslint-disable-next-line @typescript-eslint/camelcase
		const entry = await this.client.api.get(endpoint, { query: { with_counts: true, ...options } }) as APIInviteData;
		return this._add(entry);
	}

	/**
	 * Deletes an invite given its code.
	 * @since 0.0.1
	 * @param code The {@link Invite#code invite code}.
	 * @see https://discord.com/developers/docs/resources/invite#delete-invite
	 */
	public async remove(code: string): Promise<Invite> {
		const endpoint = Routes.invite(code);
		const entry = await this.client.api.get(endpoint) as APIInviteData;
		return new this.Holds(this.client, entry);
	}

	/**
	 * Adds a new structure to this DataStore
	 * @param data The data packet to add
	 * @param cache If the data should be cached
	 */
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	// @ts-ignore
	protected _add(data: APIInviteData): Invite {
		const existing = this.get(data.code);
		// eslint-disable-next-line dot-notation
		if (existing) return existing['_patch'](data);

		const entry = new this.Holds(this.client, data);
		if (this.client.options.cache.enabled) this.set(entry.id, entry);
		return entry;
	}

}

/**
 * The options for {@link InviteStore#fetch}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/invite#get-invite-get-invite-url-parameters
 */
export interface InviteStoreFetchOptions {
	/**
	 * Whether the invite should contain approximate member counts.
	 * @since 0.0.1
	 * @default true
	 */
	with_counts?: boolean;
}
