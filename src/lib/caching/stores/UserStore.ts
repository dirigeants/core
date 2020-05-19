/* eslint-disable no-dupe-class-members */
import { Routes } from '@klasa/rest';
import { DataStore } from './base/DataStore';
import { extender } from '../../util/Extender';

import type { APIUserData } from '@klasa/dapi-types';
import type { User } from '../structures/User';
import type { Client } from '../../client/Client';

/**
 * The store for {@link User users}.
 * @since 0.0.1
 */
export class UserStore extends DataStore<User> {

	/**
	 * Builds the store.
	 * @since 0.0.1
	 * @param client The {@link Client client} this store belongs to.
	 */
	public constructor(client: Client) {
		super(client, extender.get('User'), client.options.cache.limits.users);
	}

	/**
	 * Gets a {@link User user} by its ID.
	 * @since 0.0.1
	 * @param userID The {@link User user} ID.
	 * @see https://discord.com/developers/docs/resources/user#get-user
	 */
	public async fetch(userID: string): Promise<User> {
		const data = await this.client.api.get(Routes.user(userID)) as APIUserData;
		return this._add(data);
	}

}
