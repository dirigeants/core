import { Worker } from 'worker_threads';
import type { WebSocketManager } from './WebSocketManager';

/**
 * The Structure to manage a Websocket Worker with
 */
export class Shard {

	/**
	 * The Websocket Connection worker
	 */
	private readonly workerThread: Worker;

	private constructor(public readonly manager: WebSocketManager, public readonly id: number, token: string) {
		this.workerThread = new Worker('./WebSocketConnection.js', {
			workerData: {
				url: 'whateverURL',
				// eslint-disable-next-line no-process-env
				token
			}
		});

		this.workerThread.on('message', (packet) => {
			// eslint-disable-next-line @typescript-eslint/camelcase
			packet.d.shard_id = this.id;
			this.manager.emit(packet.t, packet.d);
		});
	}

	/**
	 * Method used to spawn instances of Shards
	 * @param manager The manager this Shard is for
	 * @param id The id of this shard to spawn
	 * @param token The bot token
	 */
	public static spawn(manager: WebSocketManager, id: number, token: string): Shard {
		return new this(manager, id, token);
	}

}
