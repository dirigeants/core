import * as WS from 'ws';
import { isMainThread, parentPort, workerData, MessagePort } from 'worker_threads';

import type { DataPacket } from './WebSocketShard';

function checkMainThread(port: unknown): asserts port is MessagePort {
	if (!isMainThread || port === null) throw new Error('WebSocketConnection.ts can only be run as a WorkerThread');
}

checkMainThread(parentPort);

const enum OpCodes {
	DISPATCH,
	HEARTBEAT,
	IDENTIFY,
	STATUS_UPDATE,
	VOICE_STATE_UPDATE,
	RESUME = 6,
	RECONNECT,
	REQUEST_GUILD_MEMBERS,
	INVALID_SESSION,
	HELLO,
	HEARTBEAT_ACK
}

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
		// todo: handle websocket message logic
		if (event) {
			// Make TypeDoc Not complain
			// eslint-disable-next-line id-length
			this.onPacket({ d: { data: 'test' }, op: OpCodes.DISPATCH, t: 'MESSAGE', s: 'foo' });
		}
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

	private onPacket(packet: DataPacket): unknown {
		switch (packet.op) {
			case OpCodes.HELLO: return this.heartbeat(packet);
			case OpCodes.HEARTBEAT: return this.heartbeat(packet);
			case OpCodes.HEARTBEAT_ACK: return this.heartbeat(packet);
			case OpCodes.INVALID_SESSION: return this.heartbeat(packet);
			case OpCodes.RECONNECT: return this.heartbeat(packet);
			case OpCodes.DISPATCH: return this.dispatch(packet);
			default: return null;
		}
	}

	private dispatch(packet: DataPacket): void {
		(parentPort as MessagePort).postMessage(packet);
	}

	private heartbeat(packet: DataPacket): void {
		// todo: handle the beating of the heart
		if (packet.d) {
			// Make TypeDoc Not complain
		}
	}

}

let connection = new WebSocketConnection(workerData.url, workerData.token);

parentPort.on('message', (message) => {
	if (message.action === 'connect') {
		if (connection) connection.destroy();
		connection = new WebSocketConnection(message.url, message.token);
	}
});
