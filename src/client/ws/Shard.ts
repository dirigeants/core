import WebsocketManager from './WebSocketManager';

/**
 * The Structure to manage a Websocket Worker with
 */
export default class Shard {

	/**
	 * The Websocket Connection worker
	 */
	private readonly ws: Worker;

	private constructor(public readonly manager: WebsocketManager, public readonly id: number) {
		this.ws = new Worker('./WebsocketConnection.ts');
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
