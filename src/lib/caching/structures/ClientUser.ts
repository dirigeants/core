import { Routes } from '@klasa/rest';
import { User } from './User';
import { ClientPresence } from './presences/ClientPresence';
import { ImageBufferResolvable, resolveImageToBase64 } from '../../util/ImageUtil';

import type { APIUserData } from '@klasa/dapi-types';
import type { Client } from '../../client/Client';

/**
 * Represents the client's user account.
 * @see https://discord.com/developers/docs/resources/user#user-object
 */
export class ClientUser extends User {

	/**
	 * The client presence.
	 * @since 0.0.1
	 */
	public presence: ClientPresence;

	public constructor(client: Client, data: APIUserData) {
		super(client, data);
		this.presence = new ClientPresence(this.client, { user: { id: this.id } });
	}

	/**
	 * Modifies the client user.
	 * @since 0.0.1
	 * @param options The options to be set.
	 * @see https://discord.com/developers/docs/resources/user#modify-current-user
	 */
	public async modify({ avatar, ...options }: ClientUserModifyOptions): Promise<this> {
		const data: ClientUserModifyOptions = {
			avatar: avatar ? await resolveImageToBase64(avatar) : avatar,
			...options
		};
		const entry = await this.client.api.patch(Routes.user(), { data }) as APIUserData;
		return this._patch(entry);
	}

	/**
	 * Modifies the client user's username.
	 * @since 0.0.1
	 * @param username The username to be set.
	 * @see https://discord.com/developers/docs/resources/user#modify-current-user
	 */
	public setUsername(username: string): Promise<this> {
		return this.modify({ username });
	}

	/**
	 * Modifies the client user's avatar.
	 * @since 0.0.1
	 * @param avatar The avatar to be set.
	 * @see https://discord.com/developers/docs/resources/user#modify-current-user
	 */
	public setAvatar(avatar: ImageBufferResolvable): Promise<this> {
		return this.modify({ avatar });
	}

}

/**
 * The options for {@link ClientUser#modify}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/resources/user#modify-current-user-json-params
 */
export interface ClientUserModifyOptions {
	/**
	 * User's username, if changed may cause the user's discriminator to be randomized.
	 * @since 0.0.1
	 */
	username?: string;

	/**
	 * If passed, modifies the user's avatar
	 * @since 0.0.1
	 */
	avatar?: ImageBufferResolvable | null;
}
