import { Worker } from 'worker_threads';
import { resolve as pathResolve } from 'path';
import { Intents } from '../caching/bitfields/Intents';
import { WebSocketManagerEvents, WorkerMasterMessages, InternalActions, GatewayStatus, MasterWorkerMessages } from '../../util/types/InternalWebSocket';

import type { WebSocketManager } from './WebSocketManager';

const WORKER_PATH = pathResolve(__dirname, 'WebSocketConnection.js');

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
	private workerThread: Worker | null;

	/**
	 * The connect promise to await
	 */
	#connectPromise!: Promise<GatewayStatus>;

	public constructor(public readonly manager: WebSocketManager, public readonly id: number, private readonly totalShards: number, private readonly gatewayURL: string) {
		this.workerThread = null;
	}

	public connect(token: string): Promise<GatewayStatus> {
		if (!this.workerThread) {
			this.workerThread = new Worker(WORKER_PATH, {
				workerData: {
					gatewayURL: this.gatewayURL,
					gatewayVersion: this.manager.options.gatewayVersion,
					token,
					options: {
						...this.manager.options.additionalOptions,
						intents: new Intents(this.manager.options.intents).bitfield,
						shards: [this.id, this.totalShards]
					}
				}
			});
			this.workerThread.on('online', this._onWorkerOnline.bind(this));
			this.workerThread.on('message', this._onWorkerMessage.bind(this));
			this.workerThread.on('error', this._onWorkerError.bind(this));
			this.workerThread.on('exit', this._onWorkerExit.bind(this));
		} else {
			this.send({ type: InternalActions.Identify });
		}

		this.#connectPromise = new Promise((resolve, reject) => {
			const listener = (message: WorkerMasterMessages | Error): void => {
				if (message instanceof Error) {
					reject(message);
					return;
				}
				if (message.type === InternalActions.GatewayStatus) {
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					this.workerThread!.off('message', listener);
					resolve(message.data);
				} else if (message.type === InternalActions.CannotReconnect) {
					reject(new Error(`WebSocket closed with code ${message.data.code}: ${message.data.reason}`));
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					this.workerThread!.terminate();
				}
			};

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			this.workerThread!.on('message', listener);
		});

		return this.#connectPromise;
	}

	/**
	 * Sends a message to the websocket connection thread
	 * @param data The data to send
	 */
	public send(data: MasterWorkerMessages): void {
		if (this.workerThread) this.workerThread.postMessage(data);
	}

	/**
	 * Handles logging when the worker thread is online
	 */
	private _onWorkerOnline(): void {
		this.manager.emit(WebSocketManagerEvents.Debug, `[Shard ${this.id}/${this.totalShards}] Worker Thread Online`);
	}

	/**
	 * Handles emitting raw websocket messages with the addition of shard_id
	 * @param packet Raw websocket data packets
	 */
	private _onWorkerMessage(packet: WorkerMasterMessages): void {
		switch (packet.type) {
			case InternalActions.Debug: {
				this.manager.emit(WebSocketManagerEvents.Debug, `[Shard ${this.id}/${this.totalShards}] ${packet.data}`);
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
		this.manager.emit(WebSocketManagerEvents.Debug, `[Shard ${this.id}/${this.totalShards}] ${error.stack}`);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		this.workerThread!.emit('message', error);
	}

	/**
	 * Handles logging and reconnecting a worker thread when it exits
	 * @param exitCode The exit code
	 */
	private _onWorkerExit(exitCode: number): void {
		this.manager.emit(WebSocketManagerEvents.Debug, `[Shard ${this.id}/${this.totalShards}] Worker Thread Exit[${exitCode}]`);
		this.workerThread = null;
		this.manager.scheduleShardRestart(this);
	}

}
