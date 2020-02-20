import { EventEmitter } from 'events';
import { Shard } from './Shard';
import { REST } from '../rest/REST';

/**
 * The singleton to manage multiple Websocket Connections to the discord api
 */
export class WebSocketManager extends EventEmitter {

	/**
	 * The shards of this WebsocketManager
	 */
	private readonly shards: Map<number, Shard> = new Map();

	public constructor(private api: REST, private readonly shardIDs: number | number[]) {
		super();
	}

	public spawn(): void {
		if (Array.isArray(this.shardIDs)) {
			for (const shard of this.shardIDs) this.shards.set(shard, Shard.spawn(this, shard));
		} else {
			for (let i = 0; i < this.shardIDs; i++) this.shards.set(i, Shard.spawn(this, i));
		}
	}

}
