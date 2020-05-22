/* eslint-disable no-dupe-class-members */
import { OpCodes, SendPayload, PresenceUpdateData } from '@klasa/ws';
import { Presence } from '../guilds/Presence';
import { PresenceBuilder } from './PresenceBuilder';

/**
 * The {@link Presence presence} for the {@link ClientUser client user}.
 * @since 0.0.1
 * @see https://discord.com/developers/docs/topics/gateway#presence
 */
export class ClientPresence extends Presence {

	/**
	 * Sets the client presence.
	 * @since 0.0.1
	 * @param presence The presence data to be sent.
	 * @see https://discord.com/developers/docs/topics/gateway#update-status
	 */
	public modify(game: PresenceUpdateData, shards?: number | number[]): this;
	/**
	 * Sets the client presence with a builder, and returns it.
	 * @since 0.0.1
	 * @param builder The builder to aid building the game.
	 */
	public modify(builder: (presence: PresenceBuilder) => PresenceBuilder, shards?: number | number[]): this;
	public modify(presence: PresenceUpdateData | ((game: PresenceBuilder) => PresenceBuilder), shards?: number | number[]): this {
		const data = typeof presence === 'function' ? presence(new PresenceBuilder()) : presence;
		// eslint-disable-next-line id-length
		const sent: SendPayload = { op: OpCodes.STATUS_UPDATE, d: data };

		// No shards specified
		if (typeof shards === 'undefined') {
			for (const shard of this.client.ws.shards.values()) shard.send(sent);
			return this;
		}

		// One shard specified
		if (typeof shards === 'number') {
			const shard = this.client.ws.shards.get(shards);
			if (shard) shard.send(sent);
			return this;
		}

		// Multiple shards specified
		for (const shardID of shards) {
			const shard = this.client.ws.shards.get(shardID);
			if (shard) shard.send(sent);
		}

		return this;
	}

}
