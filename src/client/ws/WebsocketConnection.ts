import * as WS from 'ws';
import { isMainThread, parentPort, workerData, MessagePort } from 'worker_threads';

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
	VOICE_GUILD_PING,
	RESUME,
	RECONNECT,
	REQUEST_GUILD_MEMBERS,
	INVALID_SESSION,
	HELLO,
	HEARTBEAT_ACK
}

export interface DataPacket {
	t: string;
	d: any;
	op: number;
}

class WebSocketConnection extends WS {

	public constructor(host: string, private readonly token: string) {
		super(host);
		this.onopen = this._onopen.bind(this);
		this.onmessage = this._onmessage.bind(this);
		this.onerror = this._onerror.bind(this);
		this.onclose = this._onclose.bind(this);
	}

	public destroy(): void {
		// idk, die instance die
	}

	private _onopen(event: WS.OpenEvent) {

	}

	private _onmessage(event: WS.MessageEvent) {

	}

	private _onerror(event: WS.ErrorEvent) {

	}

	private _onclose(event: WS.CloseEvent) {

	}

	private onPacket(packet: DataPacket): unknown {
		switch (packet.op) {
			case OpCodes.DISPATCH: return this.dispatch(packet);
			case OpCodes.HEARTBEAT: return this.heartbeat(packet);
			case OpCodes.IDENTIFY: return this.heartbeat(packet);
			case OpCodes.STATUS_UPDATE: return this.heartbeat(packet);
			case OpCodes.VOICE_STATE_UPDATE: return this.heartbeat(packet);
			case OpCodes.VOICE_GUILD_PING: return this.heartbeat(packet);
			case OpCodes.RESUME: return this.heartbeat(packet);
			case OpCodes.RECONNECT: return this.heartbeat(packet);
			case OpCodes.REQUEST_GUILD_MEMBERS: return this.heartbeat(packet);
			case OpCodes.INVALID_SESSION: return this.heartbeat(packet);
			case OpCodes.HELLO: return this.heartbeat(packet);
			case OpCodes.HEARTBEAT_ACK: return this.heartbeat(packet);
		}
	}

	private dispatch(packet: DataPacket) {
		(parentPort as MessagePort).postMessage(packet);
	}

	private heartbeat(packet: DataPacket) {
		// handle the beating of the heart
	}

}

let connection: WebSocketConnection = new WebSocketConnection(workerData.url, workerData.token);

parentPort.on('message', (message) => {
	if (message.action === 'connect') {
		if (connection) connection.destroy();
		connection = new WebSocketConnection(message.url, message.token);
	}
});
