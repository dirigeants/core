import { EventEmitter } from 'events';
import { Shard } from './Shard';
import type { REST } from '../rest/REST';

/**
 * The singleton to manage multiple Websocket Connections to the discord api
 */
export class WebSocketManager extends EventEmitter {

	/**
	 * The shards of this WebsocketManager
	 */
	public readonly shards: Map<number, Shard> = new Map();

	/**
	 * The token to use for the api
	 */
	// eslint-disable-next-line no-process-env
	#token: string | null = process.env.DISCORD_TOKEN || null;

	/**
	 * @param api The rest api
	 * @param shardIDs The shards to spawn
	 */
	public constructor(private api: REST, private readonly shardIDs: number | number[]) {
		super();
	}

	/**
	 * The token to use for websocket connections
	 */
	public set token(token: string) {
		this.#token = token;
	}

	/**
	 * Spawns new Shards to handle individual WebSocketConnections
	 */
	public async spawn(): Promise<void> {
		// We need a bot token to connect to the websocket
		if (!this.#token) throw new Error('A token is required for connecting to the websocket.');
		if (Array.isArray(this.shardIDs)) {
			for (const shard of this.shardIDs) this.shards.set(shard, Shard.spawn(this, shard, this.#token));
		} else {
			for (let i = 0; i < this.shardIDs; i++) this.shards.set(i, Shard.spawn(this, i, this.#token));
		}
	}

}
