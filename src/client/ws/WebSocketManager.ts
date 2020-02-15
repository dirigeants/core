import { EventEmitter } from 'events';
import { Client } from '../Client';
import { Shard } from './Shard';

/**
 * The singleton to manage multiple Websocket Connections to the discord api
 */
export class WebSocketManager extends EventEmitter {

	/**
	 * The shards of this WebsocketManager
	 */
	private readonly shards: Map<number, Shard> = new Map();

	public constructor(public readonly client: Client, private readonly shardIDs: number | Array<number>, token: string) {
		super();
		if (Array.isArray(this.shardIDs)) {
			for (const shard of this.shardIDs) this.shards.set(shard, Shard.spawn(this, shard, token));
		} else {
			for (let i = 0; i < this.shardIDs; i++) this.shards.set(i, Shard.spawn(this, i, token));
		}
	}

}
