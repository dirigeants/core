import { Message } from '../Message';
import { APIMessageMentionChannelData, APIUserData, APIGuildMemberData, APIChannelData } from '@klasa/dapi-types';
import { Cache } from '@klasa/cache';
import { Client } from '../../../Client';
import { User } from '../User';

export class MessageMentions {

	public message: Message;
	public users: Cache<string, User> = new Cache();
	public roles: Cache<string, string> = new Cache();
	public channels: Cache<string, APIChannelData> = new Cache();
	public everyone: boolean;

	public constructor(message: Message, users: (APIUserData | (APIUserData & APIGuildMemberData))[], roles: string[], channels: APIMessageMentionChannelData[], everyone: boolean) {
		this.message = message;

		if (users) {
			for (const mention of users) {
				const user = (this.message.client as Client).users.add(mention);
				this.users.set(user.id, user);
			}
		}
		// Just for now why there is no role store setup
		if (roles) for (const role of roles) this.roles.set(role, role);
		if (channels) for (const mention of channels) this.channels.set(mention.id, mention);

		this.everyone = Boolean(everyone);
	}

}
