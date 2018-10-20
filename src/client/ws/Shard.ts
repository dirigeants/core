import WebsocketManager from './WebSocketManager';

export default class Shard {

	public readonly manager: WebsocketManager;
	public readonly id: number;

	private constructor(manager: WebsocketManager, id: number) {
		this.manager = manager;
		this.id = id;
	}

	public static spawn(manager: WebsocketManager, id: number) {
		return new this(manager, id);
	}

}
