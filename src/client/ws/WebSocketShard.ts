import { Worker } from 'worker_threads';
import type { WebSocketManager } from './WebSocketManager';

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

	public constructor(public readonly manager: WebSocketManager, public readonly id: number, shardTotal: number, url: string, token: string) {
		this.workerThread = new Worker('./WebSocketConnection.js', { workerData: { shards: [id, shardTotal], url, token, options: this.manager.options } });
		this.workerThread.on('message', this._onMessage.bind(this));
	}

	/**
	 * Sends a message to the websocket connection thread
	 * @param data The data to send
	 */
	public send(data: any): void {
		this.workerThread.postMessage(data);
	}

	/**
	 * Handles emitting raw websocket messages with the addition of shard_id
	 * @param packet Raw websocket data packets
	 */
	private _onMessage(packet: DataPacket): void {
		// eslint-disable-next-line @typescript-eslint/camelcase
		packet.d.shard_id = this.id;
		this.manager.emit(packet.t, packet.d);
	}

}
