import { Action, User, Guild } from '@klasa/core';

import type { PresenceUpdateDispatch } from '@klasa/ws';

export default class CoreAction extends Action {

	/**
	 * Processes the event data from the websocket.
	 * @since 0.0.1
	 * @param data The raw data from {@link Client#ws}
	 */
	public run(data: PresenceUpdateDispatch): void {
		const user = this.acquireUser(data);
		if (!user) return;

		const guild = this.getGuild(data);
		if (!guild) return;

		const previousPresence = guild.presences.get(user.id)?.clone() ?? null;
		this.ensureMember(data, guild, user);

		// eslint-disable-next-line dot-notation
		const presence = guild.presences['_add'](data.d);

		this.client.emit(this.clientEvent, presence, previousPresence);
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

	private acquireUser(data: PresenceUpdateDispatch): User | null {
		const user = this.client.users.get(data.d.user.id);
		if (user) return user;
		// eslint-disable-next-line dot-notation
		return data.d.user.username ? this.client.users['_add'](data.d.user) : null;
	}

	private getGuild(data: PresenceUpdateDispatch): Guild | null {
		return data.d.guild_id ? this.client.guilds.get(data.d.guild_id) ?? null : null;
	}

	private ensureMember(data: PresenceUpdateDispatch, guild: Guild, user: User): void {
		if (data.d.status && data.d.status !== 'offline') {
			// eslint-disable-next-line dot-notation
			guild.members['_add']({ user, roles: data.d.roles as string[], deaf: false, mute: false });
		}
	}

}
