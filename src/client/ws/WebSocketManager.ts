import { EventEmitter } from 'events';
import { mergeDefault, sleep } from '@klasa/utils';
import { REST, Routes } from '@klasa/rest';

import { WebSocketShard } from './WebSocketShard';
import { WSOptionsDefaults } from '../../util/Constants';

import type { APIGatewayBotData } from '../../util/types/DiscordAPI';
import type { IntentsResolvable } from '../caching/bitfields/Intents';
import { WebSocketManagerEvents, GatewayStatus } from '../../util/types/InternalWebSocket';

export interface WSOptions {
	shards: 'auto' | number | number[];
	totalShards: number | null;
	intents: IntentsResolvable;
	additionalOptions: Record<string, unknown>;
	gatewayVersion: number;
}

/**
 * The singleton to manage multiple Websocket Connections to the discord api
 */
export class WebSocketManager extends EventEmitter {

	/**
	 * The shards of this WebsocketManager
	 */
	public readonly shards: Map<number, WebSocketShard> = new Map();

	/**
	 * The options for this WebsocketManager
	 */
	public readonly options: Required<WSOptions>;

	/**
	 * The token to use for the api
	 */
	#token: string | null;

	/**
	 * The shard queue that handles spawning or reconnecting shards
	 * @private
	 */
	#shardQueue: Set<number | WebSocketShard>;

	/**
	 * Data related to the gateway (like session limit)
	 * @private
	 */
	#gatewayInfo!: APIGatewayBotData;

	/**
	 * If we're currently handling a shard connection or reconnection
	 * @private
	 */
	#handling: boolean;

	/**
	 * @param api The rest api
	 * @param shardIDs The shards to spawn
	 */
	public constructor(private api: REST, options: Partial<WSOptions>) {
		super();
		this.options = mergeDefault(WSOptionsDefaults, options);
		// eslint-disable-next-line no-process-env
		this.#token = process.env.DISCORD_TOKEN || null;

		this.#shardQueue = new Set();
		this.#handling = false;
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
		if (!this.#token) throw new Error('A token is required for connecting to the gateway.');

		this.#gatewayInfo = await this.api.get(Routes.gatewayBot()) as APIGatewayBotData;

		this.debug(`
Session Limit [
  Total      : ${this.#gatewayInfo.session_start_limit.total}
  Remaining  : ${this.#gatewayInfo.session_start_limit.remaining}
  Reset After: ${this.#gatewayInfo.session_start_limit.reset_after}ms
]`);

		if (Array.isArray(this.options.shards)) {
			if (!this.options.totalShards) throw new Error('totalShards must be supplied if you are defining shards with an array.');
			for (const item of this.options.shards) {
				if (typeof item === 'number' && !Number.isNaN(item)) this.#shardQueue.add(item);
			}
		} else if (this.options.shards === 'auto') {
			this.options.totalShards = this.#gatewayInfo.shards;
			for (let i = 0; i < this.#gatewayInfo.shards; i++) this.#shardQueue.add(i);
		} else {
			for (let i = 0; i < this.options.shards; i++) this.#shardQueue.add(i);
		}

		this.debug(`Shard Queue: ${[...this.#shardQueue].map(item => typeof item === 'number' ? item : item.id).join(', ')}`);

		await this.handleQueue();
	}

	public async handleQueue(): Promise<void> {
		// if we're currently handling a shard, exit out
		if (this.#handling || !this.#shardQueue.size) return;
		this.#handling = true;

		// Fetch the next shard, and delete it from the queue
		const [nextItem] = this.#shardQueue;
		this.#shardQueue.delete(nextItem);

		// Get the shard object
		let shard: WebSocketShard;
		if (typeof nextItem === 'number') shard = new WebSocketShard(this, nextItem, this.options.totalShards ?? this.options.shards as number, this.#gatewayInfo.url);
		else shard = nextItem;

		this.shards.set(shard.id, shard);

		// Check if we can identify
		await this.handleSessionLimit(true);

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const status = await shard.connect(this.#token!);

		if (status === GatewayStatus.InvalidSession) {
			this.debug(`Invalid Session[${shard.id}] Requeued for identify later`);
			this.#shardQueue.add(shard);
		}

		if (this.#shardQueue.size) {
			this.debug(`Queue Size: ${this.#shardQueue.size} — waiting 5s`);
			await sleep(5000);
		}

		this.#handling = false;
		this.handleQueue();
	}

	public scheduleIdentify(shard: WebSocketShard): void {
		this.#shardQueue.add(shard);
		this.handleQueue();
	}

	public scheduleShardRestart(shard: WebSocketShard): void {
		this.shards.delete(shard.id);
		this.#shardQueue.add(shard.id);
		this.handleQueue();
	}

	private async handleSessionLimit(fetch = false): Promise<void> {
		if (fetch) this.#gatewayInfo = await this.api.get(Routes.gatewayBot()) as APIGatewayBotData;
		const { session_start_limit: { reset_after: resetAfter, remaining } } = this.#gatewayInfo;

		if (remaining === 0) {
			this.debug(`Session Identify Limit reached — Waiting ${resetAfter}ms`);
			await sleep(resetAfter);
		}
	}

	private debug(message: string): void {
		this.emit(WebSocketManagerEvents.Debug, `[Manager(${this.options.totalShards ?? this.options.shards})] ${message}`);
	}

}
