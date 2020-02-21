import { Worker } from 'worker_threads';
import { Intents } from '../caching/bitfields/Intents';

import type { WebSocketManager } from './WebSocketManager';
import { WebSocketManagerEvents } from '../../util/types/InternalWebSocket';

export interface DataPacket {
	op: number;
	d: any;
	s: string;
	t: string;
}

/**
 * The Structure to manage a Websocket Worker with
 */
export class WebSocketShard {

	/**
	 * The Websocket Connection worker
	 */
	private readonly workerThread: Worker;

	public constructor(public readonly manager: WebSocketManager, public readonly id: number, private readonly shardTotal: number, gatewayURL: string, token: string) {
		this.workerThread = new Worker('./WebSocketConnection.js', {
			workerData: {
				gatewayURL,
				token,
				options: {
					...this.manager.options.additionalOptions,
					intents: Intents.resolve(this.manager.options.intents),
					shards: [id, shardTotal]
				}
			}
		});
		this.workerThread.on('online', this._onWorkerOnline.bind(this));
		this.workerThread.on('message', this._onWorkerMessage.bind(this));
		this.workerThread.on('error', this._onWorkerError.bind(this));
		this.workerThread.on('exit', this._onWorkerExit.bind(this));
	}

	/**
	 * Sends a message to the websocket connection thread
	 * @param data The data to send
	 */
	public send(data: any): void {
		this.workerThread.postMessage(data);
	}

	/**
	 * Handles logging when the worker thread is online
	 */
	private _onWorkerOnline(): void {
		this.manager.emit(WebSocketManagerEvents.Debug, `[Shard ${this.id}/${this.shardTotal}] Online`);
	}

	/**
	 * Handles emitting raw websocket messages with the addition of shard_id
	 * @param packet Raw websocket data packets
	 */
	private _onWorkerMessage(packet: DataPacket): void {
		// eslint-disable-next-line @typescript-eslint/camelcase
		packet.d.shard_id = this.id;
		this.manager.emit(packet.t, packet.d);
	}

	/**
	 * Handles logging when the worker thread encounters an error
	 * @param error The error that was encountered
	 */
	private _onWorkerError(error: Error): void {
		this.manager.emit(WebSocketManagerEvents.Debug, `[Shard ${this.id}/${this.shardTotal}] Error => ${error.name}\n${error.stack}`);
	}

	/**
	 * Handles logging and reconnecting a worker thread when it exits
	 * @param exitCode The exit code
	 */
	private _onWorkerExit(exitCode: number): void {
		this.manager.emit(WebSocketManagerEvents.Debug, `[Shard ${this.id}/${this.shardTotal}] Worker Thread exited with code ${exitCode}`);
		// TODO: If manager is still alive, reconnect in a queue
	}

}
