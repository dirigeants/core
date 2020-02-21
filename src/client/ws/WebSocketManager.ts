import { EventEmitter } from 'events';
import { mergeDefault } from '@klasa/utils';

import { WebSocketShard } from './WebSocketShard';
import { Routes, WSOptionsDefaults } from '../../util/Constants';

import type { REST } from '../rest/REST';
import type { APIGatewayBotData } from '../../util/types/DiscordAPI';
import type { BitFieldResolvable } from '../caching/bitfields/base/BitField';

export interface WSOptions {
	shards: 'auto' | number | number[];
	shardTotal: number | null;
	intents: BitFieldResolvable;
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
	public readonly options: WSOptions;

	/**
	 * The token to use for the api
	 */
	// eslint-disable-next-line no-process-env
	#token: string | null = process.env.DISCORD_TOKEN || null;

	/**
	 * @param api The rest api
	 * @param shardIDs The shards to spawn
	 */
	public constructor(private api: REST, options: Partial<WSOptions>) {
		super();
		this.options = mergeDefault(WSOptionsDefaults, options);
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

		const connectionInfo = await this.api.get(Routes.gatewayBot()) as APIGatewayBotData;

		// if (Array.isArray(this.options.shards)) {
		// 	if (!this.options.shardTotal) throw new Error('A shardTotal must be supplied if you are defining shards with an array.');
		// 	for (const shard of this.options.shards) this.shards.set(shard, new WebSocketShard(this, shard, this.options.shardTotal, connectionInfo.url, this.#token));
		// } else if (this.options.shards === 'auto') {
		// 	for (let i = 0; i < connectionInfo.shards; i++) this.shards.set(i, new WebSocketShard(this, i, connectionInfo.shards, connectionInfo.url, this.#token));
		// } else {
		// 	for (let i = 0; i < this.options.shards; i++) this.shards.set(i, new WebSocketShard(this, i, this.options.shards, connectionInfo.url, this.#token));
		// }
		// TODO: handle shards: auto, gateway connect limits, etc
	}

}
