import { Worker } from 'worker_threads';
import WebsocketManager from './WebSocketManager.ts';

/**
 * The Structure to manage a Websocket Worker with
 */
export default class Shard {

	/**
	 * The Websocket Connection worker
	 */
	private readonly connection: Worker;

	private constructor(public readonly manager: WebsocketManager, public readonly id: number, token: string) {
		this.connection = new Worker('./WebsocketConnection.ts', { workerData: {
				url: 'whateverURL',
				token
			}
		});

		this.connection.on('message', (packet) => {
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
	public static spawn(manager: WebsocketManager, id: number, token: string) {
		return new this(manager, id, token);
	}

}
