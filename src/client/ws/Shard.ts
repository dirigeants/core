import WebsocketManager from './WebSocketManager';

/**
 * The Structure to manage a Websocket Worker with
 */
export default class Shard {

	/**
	 * The Websocket Connection worker
	 */
	private readonly connection: Worker;

	private constructor(public readonly manager: WebsocketManager, public readonly id: number) {
		this.connection = new Worker('./WebsocketConnection.ts');

		this.connection.onmessage = (event) => {
			event.data.shardID = this.id;
			this.manager.dispatchEvent(event);
		}
	}

	/**
	 * Method used to spawn instances of Shards
	 * @param manager The manager this Shard is for
	 * @param id The id of this shard to spawn
	 */
	public static spawn(manager: WebsocketManager, id: number) {
		return new this(manager, id);
	}

}
