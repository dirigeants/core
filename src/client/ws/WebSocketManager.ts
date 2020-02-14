import * as EventEmitter from 'events';
import Client from '../Client.ts';
import Shard from './Shard.ts';

/**
 * The singleton to manage multiple Websocket Connections to the discord api
 */
export default class WebsocketManager extends EventEmitter {

	/**
	 * The shards of this WebsocketManager
	 */
	private readonly shards: Map<number, Shard> = new Map();

	public constructor(public readonly client: Client, private readonly shardIDs: number | Array<number>) {
		super();
	}

	/**
	 * Spawns the Websocket connections
	 */
	private spawn() {
		if (Array.isArray(this.shardIDs)) {
			for (const shard of this.shardIDs) this.shards.set(shard, Shard.spawn(this, shard));
		} else {
			for (let i = 0; i < this.shardIDs; i++) this.shards.set(i, Shard.spawn(this, i));
		}
	}

}
