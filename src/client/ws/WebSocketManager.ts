import { EventEmitter } from 'events';
import { mergeDefault, sleep } from '@klasa/utils';
import { REST, Routes } from '@klasa/rest';
import { Cache } from '@klasa/cache';
import { AsyncQueue } from '@klasa/async-queue';

import { WebSocketShard, WebSocketShardStatus } from './WebSocketShard';
import { WSOptionsDefaults } from '../../util/Constants';
import { WebSocketManagerEvents, GatewayStatus } from '../../util/types/InternalWebSocket';

import type { APIGatewayBotData } from '../../util/types/DiscordAPI';
import type { IntentsResolvable } from '../caching/bitfields/Intents';

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
	public readonly shards: Cache<number, WebSocketShard> = new Cache();

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
	#queue: AsyncQueue;

	/**
	 * Data related to the gateway (like session limit)
	 * @private
	 */
	#gatewayInfo!: APIGatewayBotData;

	/**
	 * @param api The rest api
	 * @param shardIDs The shards to spawn
	 */
	public constructor(private api: REST, options: Partial<WSOptions>) {
		super();
		this.options = mergeDefault(WSOptionsDefaults, options);
		// eslint-disable-next-line no-process-env
		this.#token = process.env.DISCORD_TOKEN || null;
		this.#queue = new AsyncQueue();
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

		// Get gateway info from the api and cache it
		this.#gatewayInfo = await this.api.get(Routes.gatewayBot()) as APIGatewayBotData;

		// Debug what the api says we can spawn
		this.debug([
			`Session Limit [`,
			`  Total      : ${this.#gatewayInfo.session_start_limit.total}`,
			`  Remaining  : ${this.#gatewayInfo.session_start_limit.remaining}`,
			`  Reset After: ${this.#gatewayInfo.session_start_limit.reset_after}ms`,
			`]`
		].join('\n'));

		// Make a list of shards to spawn
		const shards = [];

		if (Array.isArray(this.options.shards)) {
			// Starting a list of specified shards
			if (!this.options.totalShards) throw new Error('totalShards must be supplied if you are defining shards with an array.');
			shards.push(...this.options.shards.filter(item => typeof item === 'number' && !Number.isNaN(item)));
		} else if (this.options.shards === 'auto') {
			// Starting a list of automatically recommended shards
			this.options.totalShards = this.#gatewayInfo.shards;
			for (let i = 0; i < this.#gatewayInfo.shards; i++) shards.push(i);
		} else {
			// Starting a specified number of shards
			for (let i = 0; i < this.options.shards; i++) shards.push(i);
		}

		// Debug what shards we are starting
		this.debug(`Shard Queue: ${shards.join(', ')}`);

		// Wait for all the shards to connect
		await Promise.all(shards.map(id => this.queueShard(id)));
	}

	/**
	 * Destroys all the shards
	 */
	public destroy(): void {
		for (const shard of this.shards.values()) shard.destroy();
	}

	/**
	 * A shard cannot be resumed and must be connected from scratch
	 * @param shard The shard to reconnect from scratch
	 */
	public scheduleShardRestart(shard: WebSocketShard): void {
		this.shards.delete(shard.id);
		this.queueShard(shard.id);
	}

	/**
	 * Queues a shard to be connect
	 * @param id The shard id
	 */
	private async queueShard(id: number): Promise<void> {
		await this.#queue.wait();
		try {
			// Get or create a new WebSocketShard
			const shard = this.getShard(id);

			// Don't try to connect if the shard is already connected
			if (shard.status === WebSocketShardStatus.Connected) return;

			// Check if we can identify
			await this.handleSessionLimit();

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const status = await shard.connect(this.#token!);

			// If we get an invalid session, to the back of the line you go
			if (status === GatewayStatus.InvalidSession) {
				this.debug(`Invalid Session[${id}] Requeued for identify later`);
				this.queueShard(id);
			}

			// Alert how many shards are remaining in the queue and wait for 5 seconds before the next one
			if (this.#queue.remaining > 1) {
				this.debug(`Queue Size: ${this.#queue.remaining - 1} — waiting 5s`);
				await sleep(5000);
			}
		} finally {
			this.#queue.shift();
		}
	}

	/**
	 * Gets or Creates a shard by id
	 * @param id The id to get/create a shard
	 */
	private getShard(id: number): WebSocketShard {
		const shard = this.shards.get(id) || new WebSocketShard(this, id, this.options.totalShards ?? this.options.shards as number, this.#gatewayInfo.url);
		this.shards.set(id, shard);
		return shard;
	}

	/**
	 * Checks if we can try to connect another shard, waits if needed
	 */
	private async handleSessionLimit(): Promise<void> {
		this.#gatewayInfo = await this.api.get(Routes.gatewayBot()) as APIGatewayBotData;

		const { session_start_limit: { reset_after: resetAfter, remaining } } = this.#gatewayInfo;

		if (remaining === 0) {
			this.debug(`Session Identify Limit reached — Waiting ${resetAfter}ms`);
			await sleep(resetAfter);
		}
	}

	/**
	 * Emits a ws debug message
	 * @param message The message to emit
	 */
	private debug(message: string): void {
		this.emit(WebSocketManagerEvents.Debug, `[Manager(${this.options.totalShards ?? this.options.shards})] ${message}`);
	}

}
