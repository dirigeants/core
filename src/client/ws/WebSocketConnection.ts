/* eslint-disable id-length */
import * as WS from 'ws';
import { isMainThread, parentPort, workerData, MessagePort } from 'worker_threads';
import { WSPayload, OpCodes, HelloPayload, InvalidSession, WorkerMasterMessages, InternalActions, WSCloseCodes, SendPayload } from '../../util/types/InternalWebSocket';

let zlib: typeof import('zlib-sync') | undefined;
try {
	zlib = require('zlib-sync');
} catch {
	// No compression
}

const UNRESUMABLE = [
	1000,
	4006,
	WSCloseCodes.InvalidSeq
];

const UNRECOVERABLE = [
	WSCloseCodes.AuthenticationFailed,
	WSCloseCodes.InvalidShard,
	WSCloseCodes.ShardingRequired,
	WSCloseCodes.InvalidIntents,
	WSCloseCodes.DisallowedIntents
];

interface WSRatelimit {
	remaining: number;
	queue: string[];
}

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
	 * The last time we sent a heartbeat
	 */
	#lastHeartbeat: number;

	/**
	 * The zlib context to use when inflating data
	 */
	#zlib: import('zlib-sync').Inflate | null;

	/**
	 * The current sequence number
	 */
	#sequence: number;

	/**
	 * The current session ID
	 */
	#sessionID: string | null;

	/**
	 * The sequence on WS close
	*/
	#closeSequence: number;

	/**
	 * Current ratelimit data
	 */
	#ratelimitData: WSRatelimit;

	/**
	 * The heartbeat timer
	 */
	#heartbeatTimer!: NodeJS.Timer;

	/**
	 * If the last heartbeat was acked
	*/
	#heartbeatAcked: boolean;

	/**
	 * @param host The host url to connect to
	 * @param token The token to connect with
	 */
	public constructor(host: string, token: string) {
		super(host);
		this.#token = token;
		this.#lastHeartbeat = -1;
		this.#sequence = -1;
		this.#closeSequence = -1;
		this.#sessionID = null;
		this.#ratelimitData = {
			queue: [],
			remaining: 120
		};
		this.#heartbeatAcked = true;

		if (zlib) {
			this.#zlib = new zlib.Inflate({ chunkSize: 128 * 1024 });
		} else {
			this.#zlib = null;
		}

		this.onopen = this._onopen.bind(this);
		this.onmessage = this._onmessage.bind(this);
		this.onerror = this._onerror.bind(this);
		this.onclose = this._onclose.bind(this);
	}

	public sendWS(payload: SendPayload, important = false): void {
		const jsonString = JSON.stringify(payload);
		this.#ratelimitData.queue[important ? 'unshift' : 'push'](jsonString);
		this.processRatelimitQueue();
	}

	/**
	 * Gracefully closes the websocket connection
	 */
	public destroy(closeCode: number): void {
		try {
			this.close(closeCode);
		} catch {
			// No-op
		}
	}

	private _onopen(): void {
		this.debug(`WebSocket Open[${this.url}]`);
	}

	private _onmessage(event: WS.MessageEvent): void {
		let { data } = event;
		// Convert data to a buffer
		if (data instanceof ArrayBuffer) data = Buffer.from(data);
		else if (Array.isArray(data)) data = Buffer.concat(data);

		let stringData!: string;
		if (this.#zlib) {
			const typedData = data as Buffer;
			const dataLength = typedData.length;
			const canFlush = dataLength >= 4 && typedData.readUInt32BE(dataLength - 4) === 0xFFFF;

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			this.#zlib.push(typedData, canFlush && zlib!.Z_SYNC_FLUSH);
			if (canFlush) {
				// If we encountered an error during decompression, log it and cancel
				if (this.#zlib.err) {
					this.debug(`Zlib Error[${this.#zlib.err}] ${this.#zlib.msg}`);
					return;
				}

				stringData = this.#zlib.result as string;
			} else {
				// We need moar data!
				return;
			}
		} else {
			stringData = data as string;
		}

		try {
			const parsedData = JSON.parse(stringData) as WSPayload;
			this.onPacket(parsedData);
		} catch (err) {
			this.debug(`Invalid Data[${err.message}]\nPayload '${stringData}' threw an error`);
		}
	}

	private _onerror(event: WS.ErrorEvent): void {
		const { error, message } = event;
		this.debug(`WebSocket Error[${message}]\n${error}`);
	}

	private _onclose(event: WS.CloseEvent): void {
		// Save sequence
		if (this.#sequence > 0) this.#closeSequence = this.#sequence;

		const { code, reason, wasClean } = event;
		this.debug(`WebSocket Close[${code}] ${reason}\nClean: ${wasClean}`);

		if (UNRESUMABLE.includes(code)) {
			this.debug(`Close[${code}] => Cannot resume any further`);
			this.#sessionID = null;
			this.#sequence = -1;
		}

		if (UNRECOVERABLE.includes(code)) {
			this.debug(`Close[${code}] => Cannot connect any further`);
			this.destroy(code);
		}
	}

	private onPacket(packet: WSPayload): unknown {
		if (packet.s > this.#sequence) this.#sequence = packet.s;

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

	// #region Payloads

	private dispatch(data: WorkerMasterMessages): void {
		checkMainThread(parentPort);
		parentPort.postMessage(data);
	}

	private debug(info: string): void {
		this.dispatch({ type: InternalActions.Debug, data: info });
	}

	private hello(packet: HelloPayload): void {
		this.setHeartbeatTimer(packet.d.heartbeat_interval);
		this.identify();
	}

	private heartbeatRequest(): void {
		this.sendWS({ op: OpCodes.HEARTBEAT, d: this.#sequence });
	}

	private heartbeatAck(): void {
		this.#heartbeatAcked = true;
		const latency = Date.now() - this.#lastHeartbeat;
		this.debug(`Heartbeat Acknowledged[${latency}ms]`);
		this.dispatch({ type: InternalActions.UpdatePing, data: latency });
	}

	private invalidSession(packet: InvalidSession): void {
		if (packet.d) {
			this.identifyResume();
		} else {
			this.scheduleIdentify();
		}
	}

	private reconnect(): void {
		this.close(WSCloseCodes.SessionTimeout);
	}

	// #endregion Payloads

	private setHeartbeatTimer(time: number): void {
		if (time === -1) {
			this.debug('Clearing heartbeat timer');
			clearInterval(this.#heartbeatTimer);
		} else {
			this.debug(`Heartbeat[${time}ms]`);
			clearInterval(this.#heartbeatTimer);
			this.#heartbeatTimer = setInterval(this.sendHeartbeat.bind(this, 'Timer'), time);
		}
	}

	private sendHeartbeat(tag = 'Unknown'): void {
		if (!this.#heartbeatAcked) {
			this.debug(`Heartbeat[${tag}] Didn't receive an ack in time; resetting`);
			this.destroy(WSCloseCodes.SessionTimeout);
			return;
		}

		this.debug(`Heartbeat[${tag}]`);
		this.#heartbeatAcked = false;
		this.#lastHeartbeat = Date.now();
		this.sendWS({ op: OpCodes.HEARTBEAT, d: this.#sequence }, true);
	}

	private processRatelimitQueue(): void {
		// If we have no remaining sends, return
		if (this.#ratelimitData.remaining === 0) return;
		// If we have nothing in the queue, return
		if (this.#ratelimitData.queue.length === 0) return;

		if (this.#ratelimitData.remaining === 120) {
			// Reset remaining back to 120 after a minute
			setTimeout(() => {
				this.#ratelimitData.remaining = 120;
				this.processRatelimitQueue();
			}, 60000);
		}

		while (this.#ratelimitData.remaining > 0) {
			const payload = this.#ratelimitData.queue.shift();
			if (!payload) break;
			this.send(payload);
			this.#ratelimitData.remaining--;
		}
	}

	send(payload: string): void {
		if (this.readyState !== this.OPEN) {
			this.debug(`Tried to send payload '${payload}' but WebSocket connection is not open! Reconnecting`);
			this.destroy(WSCloseCodes.NotAuthenticated);
			return;
		}

		super.send(payload, (error) => {
			if (error) this.debug(`Error while sending payload: ${error.message}`);
		});
	}

}

let connection = new WebSocketConnection(workerData.url, workerData.token);

parentPort.on('message', (message) => {
	if (message.action === 'connect') {
		if (connection) connection.destroy(1000);
		connection = new WebSocketConnection(message.url, message.token);
	}
});
