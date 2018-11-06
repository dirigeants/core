import WebsocketManager from './WebSocketManager';

export default class Shard {

	private ws: Worker;

	private constructor(public readonly manager: WebsocketManager, public readonly id: number) {
		this.ws = new Worker('./WebsocketConnection.ts');
	}

	public static spawn(manager: WebsocketManager, id: number) {
		return new this(manager, id);
	}

}
