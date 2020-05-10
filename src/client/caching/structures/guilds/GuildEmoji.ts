import { Structure } from '../base/Structure';

import type { APIEmojiData } from '@klasa/dapi-types';
import type { Client } from '../../../Client';

/**
 * @see https://discord.com/developers/docs/resources/emoji#emoji-object
 */
export class GuildEmoji extends Structure {

	/**
	 * The emoji's ID.
	 */
	public readonly id: string;

	/**
	 * The emoji's name (null only in reaction emoji objects).
	 */
	public name!: string | null;

	/**
	 * The roles this emoji is whitelisted to.
	 */
	public roleIDs!: string[];

	/**
	 * User that created this emoji.
	 */
	public userID!: string | null;

	/**
	 * Whether or not this emoji must be wrapped in colons.
	 */
	public requireColons!: boolean | null;

	/**
	 * Whether or not this emoji is managed.
	 */
	public managed!: boolean | null;

	/**
	 * Whether this emoji is animated.
	 */
	public animated!: boolean | null;

	/**
	 * Whether or not this emoji can be used, may be false due to loss of Server Boosts
	 */
	public available!: boolean;

	public constructor(client: Client, data: APIEmojiData) {
		super(client);
		this.id = data.id as string;
		this._patch(data);
	}

	protected _patch(data: APIEmojiData): this {
		this.animated = data.animated ?? null;
		this.managed = data.managed ?? null;
		this.name = data.name;
		this.requireColons = data.require_colons ?? null;
		this.roleIDs = data.roles ?? [];
		this.userID = data.user?.id ?? null;

		// TODO(VladFrangu): Swap lines as soon as `APIEmojiData.available` is set.
		this.available = true;
		// this.available = data.available;
		return this;
	}

}
