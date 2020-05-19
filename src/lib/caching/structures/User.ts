import { Routes } from '@klasa/rest';
import { Structure } from './base/Structure';
import { isSet } from '../../util/Util';
import { Client } from '../../client/Client';
import { DMChannel } from './channels/DMChannel';

import type { APIUserData, APIUserFlags, PremiumType, APIChannelData } from '@klasa/dapi-types';

/**
 * @see https://discord.com/developers/docs/resources/user#user-object
 */
export class User<T = Client> extends Structure<T> {

	/**
	 * The user's ID.
	 * @since 0.0.1
	 */
	public readonly id: string;

	/**
	 * The user's username, not unique across the platform.
	 * @since 0.0.1
	 */
	public username!: string;

	/**
	 * The user's 4-digit discord-tag.
	 * @since 0.0.1
	 */
	public discriminator!: string;

	/**
	 * The user's avatar hash.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/reference#image-formatting
	 */
	public avatar!: string | null;

	/**
	 * Whether or not the user belongs to an OAuth2 application.
	 * @since 0.0.1
	 */
	public bot!: boolean;

	/**
	 * Whether or not the user is an Official Discord System user (part of the urgent message system).
	 * @since 0.0.1
	 */
	public system?: boolean;

	/**
	 * Whether or not the user has two factor enabled on their account.
	 * @since 0.0.1
	 */
	public mfaEnabled?: boolean;

	/**
	 * The user's chosen language option.
	 * @since 0.0.1
	 */
	public locale?: string;

	/**
	 * Whether or not the email on this account has been verified.
	 * @since 0.0.1
	 */
	public verified?: boolean;

	/**
	 * The user's email.
	 * @since 0.0.1
	 */
	public email?: string | null;

	/**
	 * The flags on a user's account.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/user#user-object-user-flags
	 */
	public flags?: APIUserFlags;

	/**
	 * The type of Nitro subscription on a user's account.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/user#user-object-premium-types
	 */
	public premiumType?: PremiumType;

	/**
	 * The public flags on a user's account.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/user#user-object-user-flags
	 */
	public publicFlags?: APIUserFlags;

	public constructor(client: T, data: APIUserData) {
		super(client);
		this.id = data.id;
		this._patch(data);
	}

	/**
	 * Gets an existing DMChannel from the cache.
	 * @since 0.0.1
	 */
	public get channel(): DMChannel | null {
		if (!(this.client instanceof Client)) throw new Error('DMs can only be opened by bot clients.');
		return this.client.dms.findValue(dm => dm.recipients.includes(this as unknown as User<Client>)) ?? null;
	}

	/**
	 * Gets or Fetches a DM channel for this user.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/user#create-dm
	 */
	public async openDM(): Promise<DMChannel> {
		if (!(this.client instanceof Client)) throw new Error('DMs can only be opened by bot clients.');
		const existing = this.client.dms.findValue(dm => dm.recipients.includes(this as unknown as User<Client>));
		if (existing) return Promise.resolve(existing);
		// eslint-disable-next-line @typescript-eslint/camelcase
		const channel = await this.client.api.post(Routes.dms(), { data: { recipient_id: this.id } }) as APIChannelData;
		// eslint-disable-next-line dot-notation
		return this.client.dms['_add'](channel);
	}

	/**
	 * Defines toString behavior for members.
	 * @since 0.0.1
	 */
	public toString(): string {
		return `<@${this.id}>`;
	}

	protected _patch(data: APIUserData): this {
		this.username = data.username;
		this.discriminator = data.discriminator;
		this.avatar = data.avatar;
		this.bot = data.bot ?? false;
		if (isSet(data, 'system')) this.system = data.system;
		if (isSet(data, 'mfa_enabled')) this.mfaEnabled = data.mfa_enabled;
		if (isSet(data, 'locale')) this.locale = data.locale;
		if (isSet(data, 'verified')) this.verified = data.verified;
		if (isSet(data, 'email')) this.email = data.email;
		if (isSet(data, 'flags')) this.flags = data.flags;
		if (isSet(data, 'premium_type')) this.premiumType = data.premium_type;
		if (isSet(data, 'public_flags')) this.publicFlags = data.public_flags;

		return this;
	}

}
