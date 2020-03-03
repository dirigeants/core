import { Worker } from 'worker_threads';
import { Intents } from '../caching/bitfields/Intents';
import { WebSocketManagerEvents, WorkerMasterMessages, InternalActions } from '../../util/types/InternalWebSocket';

import type { WebSocketManager } from './WebSocketManager';

/**
 * The Structure to manage a Websocket Worker with
 */
export class WebSocketShard {

	/**
	 * The shards ping (updated every heartbeat ack)
	 */
	public ping = -1;

	/**
	 * The Websocket Connection worker
	 */
	private readonly workerThread: Worker;

	public constructor(public readonly manager: WebSocketManager, public readonly id: number, private readonly totalShards: number, gatewayURL: string, token: string) {
		this.workerThread = new Worker('./WebSocketConnection.js', {
			workerData: {
				gatewayURL,
				token,
				options: {
					...this.manager.options.additionalOptions,
					intents: new Intents(this.manager.options.intents),
					shards: [id, totalShards]
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
		this.manager.emit(WebSocketManagerEvents.Debug, `[Shard ${this.id}/${this.totalShards}] Online`);
	}

	/**
	 * Handles emitting raw websocket messages with the addition of shard_id
	 * @param packet Raw websocket data packets
	 */
	private _onWorkerMessage(packet: WorkerMasterMessages): void {
		switch (packet.type) {
			case InternalActions.Debug: {
				this.manager.emit(WebSocketManagerEvents.Debug, `[WS Shard ${this.id}/${this.totalShards}] ${packet.data}`);
				break;
			}
			case InternalActions.UpdatePing: {
				this.ping = packet.data;
				break;
			}
			case InternalActions.ScheduleIdentify: {
				this.manager.scheduleIdentify(this);
				break;
			}
			case InternalActions.Dispatch: {
				// eslint-disable-next-line @typescript-eslint/camelcase
				packet.data.shard_id = this.id;
				this.manager.emit(packet.data.t, packet.data);
			}
		}
	}

	/**
	 * Handles logging when the worker thread encounters an error
	 * @param error The error that was encountered
	 */
	private _onWorkerError(error: Error): void {
		this.manager.emit(WebSocketManagerEvents.Debug, `[Shard ${this.id}/${this.totalShards}] Error => ${error.name}\n${error.stack}`);
	}

	/**
	 * Handles logging and reconnecting a worker thread when it exits
	 * @param exitCode The exit code
	 */
	private _onWorkerExit(exitCode: number): void {
		this.manager.emit(WebSocketManagerEvents.Debug, `[Shard ${this.id}/${this.totalShards}] Worker Thread Exit[${exitCode}]`);
		this.manager.scheduleShardRestart(this);
	}

}
