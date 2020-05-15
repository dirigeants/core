import { Action } from '../../../lib/structures/Action';
import { ClientEvents } from '../../../util/types/Util';

import type { GuildMembersChunkDispatch } from '@klasa/ws';

export default class CoreAction extends Action {

	/**
	 * Processes the event data from the websocket.
	 * @since 0.0.1
	 * @param data The raw data from {@link Client#ws}
	 */
	public run(data: GuildMembersChunkDispatch): void {
		const guild = this.client.guilds.get(data.d.guild_id);
		if (!guild) {
			this.client.emit(ClientEvents.Debug, `[GUILD_MEMBERS_CHUNK] An event with ${data.d.guild_id} has been received but none was cached.`);
			return;
		}

		// eslint-disable-next-line dot-notation
		const members = data.d.members.map(member => guild.members['_add'](member));

		for (const presence of data.d.presences ?? []) {
			// eslint-disable-next-line dot-notation
			this.client.users['_add'](presence.user);
			// eslint-disable-next-line dot-notation
			guild.presences['_add'](presence);
		}

		this.client.emit(this.clientEvent, members, guild, {
			chunkCount: data.d.chunk_count,
			chunkIndex: data.d.chunk_index,
			nonce: data.d.nonce
		});
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

}
