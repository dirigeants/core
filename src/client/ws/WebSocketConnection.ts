import * as WS from 'ws';
import { isMainThread, parentPort, workerData, MessagePort } from 'worker_threads';
import { WSPayload, OpCodes, HelloPayload, InvalidSession, WorkerMasterMessages, InternalActions, DispatchPayload } from '../../util/types/InternalWebSocket';

function checkMainThread(port: unknown): asserts port is MessagePort {
	if (!isMainThread || port === null) throw new Error('WebSocketConnection.ts can only be run as a WorkerThread');
}

checkMainThread(parentPort);

class WebSocketConnection extends WS {

	/**
	 * The bot token used to connect to the websocket
	 */
	#token: string;

	/**
	 * @param host The host url to connect to
	 * @param token The token to connect with
	 */
	public constructor(host: string, token: string) {
		super(host);
		this.#token = token;
		this.onopen = this._onopen.bind(this);
		this.onmessage = this._onmessage.bind(this);
		this.onerror = this._onerror.bind(this);
		this.onclose = this._onclose.bind(this);
	}

	/**
	 * Gracefully closes the websocket connection
	 */
	public destroy(): void {
		// todo: handle destroy logic
	}

	private _onopen(event: WS.OpenEvent): void {
		// todo: handle websocket open logic
		if (event) {
			if (this.#token) {
				// Make TypeDoc Not complain
			}
		}
	}

	private _onmessage(event: WS.MessageEvent): void {
		const { data } = event;
	}

	private _onerror(event: WS.ErrorEvent): void {
		// todo: handle websocket error logic
		if (event) {
			// Make TypeDoc Not complain
		}
	}

	private _onclose(event: WS.CloseEvent): void {
		// todo: handle websocket close logic
		if (event) {
			// Make TypeDoc Not complain
		}
	}

	private onPacket(packet: WSPayload): unknown {
		switch (packet.op) {
			case OpCodes.HELLO: return this.hello(packet);
			case OpCodes.HEARTBEAT: return this.heartbeatRequest();
			case OpCodes.HEARTBEAT_ACK: return this.heartbeatAck();
			case OpCodes.INVALID_SESSION: return this.invalidSession(packet);
			case OpCodes.RECONNECT: return this.reconnect();
			case OpCodes.DISPATCH: return this.dispatch({ type: InternalActions.Dispatch, data: packet });
			default: return null;
		}
	}

	private dispatch(data: WorkerMasterMessages): void {
		checkMainThread(parentPort);
		parentPort.postMessage(data);
	}

	private hello(packet: HelloPayload): void {
		if (packet.d) {
			// Make code
		}
	}

	private heartbeatRequest(): void {
		// todo: handle the beating of the heart
	}

	private heartbeatAck(): void {
		// todo: handle the beating of the heart
	}

	private invalidSession(packet: InvalidSession): void {
		if (packet.d) {
			// resume now
		} else {
			// re-queue
		}
	}

	private reconnect(): void {
		// reconnect
	}

}

let connection = new WebSocketConnection(workerData.url, workerData.token);

parentPort.on('message', (message) => {
	if (message.action === 'connect') {
		if (connection) connection.destroy();
		connection = new WebSocketConnection(message.url, message.token);
	}
});
