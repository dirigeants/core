import { Cache } from '@klasa/cache';

import type { Message } from '../Message';
import type { APIMessageMentionChannelData, APIUserData, APIGuildMemberData, APIChannelData } from '@klasa/dapi-types';
import type { User } from '../User';
import { Guild } from '../guilds/Guild';

export class MessageMentions {

	/**
	 * The {@link Message} this entry belongs to.
	 * @since 0.0.1
	 */
	public message: Message;

	/**
	 * Users specifically mentioned in the message.
	 * @since 0.0.1
	 */
	public users: Cache<string, User> = new Cache();

	/**
	 * Roles specifically mentioned in this message.
	 * @since 0.0.1
	 */
	public roles: Cache<string, string> = new Cache();

	/**
	 * Channels specifically mentioned in this message.
	 * @since 0.0.1
	 */
	public channels: Cache<string, APIChannelData> = new Cache();

	/**
	 * Whether this message mentions everyone.
	 * @since 0.0.1
	 */
	public everyone: boolean;

	public constructor(message: Message, users: (APIUserData & { member?: APIGuildMemberData })[], roles: string[], channels: APIMessageMentionChannelData[], everyone: boolean) {
		this.message = message;

		if (users) {
			for (const mention of users) {
				const user = this.message.client.users.add(mention);
				this.users.set(user.id, user);

				if (mention.member) {
					(this.message.guild as Guild).members.add(mention.member);
				}
			}
		}

		// Just for now why there is no role store setup
		if (roles) for (const role of roles) this.roles.set(role, role);
		if (channels) for (const mention of channels) this.channels.set(mention.id, mention);

		this.everyone = Boolean(everyone);
	}

}
