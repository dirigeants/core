/* eslint-disable id-length,@typescript-eslint/camelcase */
import * as WS from 'ws';
import { isMainThread, parentPort, workerData, MessagePort } from 'worker_threads';
import {
	GatewayStatus,
	HelloPayload,
	InternalActions,
	InvalidSession,
	MasterWorkerMessages,
	OpCodes,
	SendPayload,
	WebSocketEvents,
	WorkerMasterMessages,
	WSCloseCodes,
	WSIdentify,
	WSPayload,
	WSWorkerData
} from '../../util/types/InternalWebSocket';
import { URLSearchParams } from 'url';

const typedWorkerData = workerData as WSWorkerData;

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

interface WSHeartbeat {
	acked: boolean;
	interval: NodeJS.Timer | null;
}

interface WSDestroyOptions {
	closeCode?: number;
	resetSession?: boolean;
}

function checkMainThread(port: unknown): asserts port is MessagePort {
	if (isMainThread || port === null) throw new Error('A WebSocketConnection can only be created as a WorkerThread');
}

checkMainThread(parentPort);

class WebSocketConnection {

	/**
	 * The last time we sent a heartbeat
	 */
	#lastHeartbeat: number;

	/**
	 * The zlib context to use when inflating data
	 */
	#zlib!: import('zlib-sync').Inflate | null;

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
	 * Current heartbeat data
	 */
	#heartbeat: WSHeartbeat;

	/**
	 * The actual WebSocket connection
	 */
	#connection!: WS | null;

	/**
	 * @param host The host url to connect to
	 * @param token The token to connect with
	 */
	public constructor(private readonly host: string) {
		this.#lastHeartbeat = -1;
		this.#sequence = -1;
		this.#closeSequence = -1;
		this.#sessionID = null;
		this.#ratelimitData = {
			queue: [],
			remaining: 120
		};
		this.#heartbeat = {
			acked: true,
			interval: null
		};

		this.newWS();
	}

	public sendWS(payload: SendPayload, important = false): void {
		const jsonString = JSON.stringify(payload);
		this.#ratelimitData.queue[important ? 'unshift' : 'push'](jsonString);
		this.processRatelimitQueue();
	}

	/**
	 * Gracefully closes the websocket connection
	 */
	public destroy({ closeCode: code, resetSession }: WSDestroyOptions = { closeCode: 1000, resetSession: false }): void {
		this.setHeartbeatTimer(-1);

		try {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			this.#connection!.close(code);
		} catch {
			// No-op
		}

		if (resetSession) {
			this.#sessionID = null;
			this.#sequence = this.#closeSequence = -1;
		}

		this.#ratelimitData.queue.length = 0;
		this.#ratelimitData.remaining = 120;
	}

	private _onopen(): void {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		this.debug(`OPEN[${this.#connection!.url}]`);
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
		this.debug(`ERROR[${message}]\n${error}`);
	}

	private _onclose(event: WS.CloseEvent): void {
		// Save sequence
		if (this.#sequence > 0) this.#closeSequence = this.#sequence;
		this.destroy();

		const { code, reason, wasClean } = event;
		this.debug(`CLOSE[${code}] ${reason}\n  Clean: ${wasClean}`);

		this.#connection = null;

		if (UNRESUMABLE.includes(code)) {
			this.debug(`CLOSE[${code}] => Cannot resume any further`);
			this.destroy({ resetSession: true });
		}

		if (UNRECOVERABLE.includes(code)) {
			this.debug(`CLOSE[${code}] => Cannot connect any further`);
			this.destroy({ resetSession: true });
			this.dispatch({ type: InternalActions.CannotReconnect, data: { code, reason } });
			return;
		}

		if (this.#sessionID) {
			this.debug(`Attempting immediate resume after close`);
			this.newWS();
		} else {
			this.debug('Cannot reconnect anymore — Exiting!');
			process.exit(code);
		}
	}

	private onPacket(packet: WSPayload): void {
		if (packet.s > this.#sequence) this.#sequence = packet.s;

		switch (packet.op) {
			case OpCodes.HELLO: {
				this.hello(packet);
				break;
			}
			case OpCodes.HEARTBEAT: {
				this.heartbeatRequest();
				break;
			}
			case OpCodes.HEARTBEAT_ACK: {
				this.heartbeatAck();
				break;
			}
			case OpCodes.INVALID_SESSION: {
				this.invalidSession(packet);
				break;
			}
			case OpCodes.RECONNECT: {
				this.reconnect();
				break;
			}
			case OpCodes.DISPATCH: {
				this.dispatch({ type: InternalActions.Dispatch, data: packet });
				break;
			}
		}

		switch (packet.t) {
			case WebSocketEvents.Ready: {
				this.debug(`READY[${packet.d.user.id} | ${packet.d.guilds.length} guilds]`);
				this.dispatch({ type: InternalActions.GatewayStatus, data: GatewayStatus.Ready });
				break;
			}
			case WebSocketEvents.Resumed: {
				this.debug(`RESUMED[${this.#sequence - this.#closeSequence} events`);
				this.dispatch({ type: InternalActions.GatewayStatus, data: GatewayStatus.Ready });
				break;
			}
		}
	}

	private debug(info: string): void {
		this.dispatch({ type: InternalActions.Debug, data: info });
	}

	// #region Payloads

	private dispatch(data: WorkerMasterMessages): void {
		checkMainThread(parentPort);
		parentPort.postMessage(data);
	}

	/**
	 * Called when we receive the HELLO payload from Discord
	 */
	private hello(packet: HelloPayload): void {
		this.setHeartbeatTimer(packet.d.heartbeat_interval);
		this.identify();
	}

	/**
	 * Called when Discord asks us to heartbeat
	 */
	private heartbeatRequest(): void {
		this.sendWS({ op: OpCodes.HEARTBEAT, d: this.#sequence }, true);
	}

	/**
	 * Called when we receive an ack for a heartbeat
	 */
	private heartbeatAck(): void {
		this.#heartbeat.acked = true;
		const latency = Date.now() - this.#lastHeartbeat;
		this.debug(`Heartbeat Acknowledged[${latency}ms]`);
		this.dispatch({ type: InternalActions.UpdatePing, data: latency });
	}

	/**
	 * Called when we receive an invalid session payload from Discord
	 */
	private invalidSession(packet: InvalidSession): void {
		if (packet.d) {
			this.resume();
		} else {
			this.scheduleIdentify();
		}
	}

	/**
	 * Called when Discord asks a shard connection to reconnect
	 */
	private reconnect(): void {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		this.#connection!.close(WSCloseCodes.SessionTimeout);
	}

	// #endregion Payloads

	private setHeartbeatTimer(time: number): void {
		if (time === -1) {
			this.debug('Heartbeat Timer[RESET]');
			if (this.#heartbeat.interval) clearInterval(this.#heartbeat.interval);
		} else {
			this.debug(`Heartbeat Timer[${time}ms]`);
			// Sanity check; clear interval
			if (this.#heartbeat.interval) clearInterval(this.#heartbeat.interval);
			this.#heartbeat.interval = setInterval(this.sendHeartbeat.bind(this, 'Timer'), time);
		}
	}

	private sendHeartbeat(tag = 'Unknown'): void {
		if (!this.#heartbeat.acked) {
			this.debug(`Heartbeat[${tag}] Didn't receive an ack in time; resetting`);
			this.destroy({ closeCode: WSCloseCodes.SessionTimeout });
			return;
		}

		this.debug(`Heartbeat[${tag}] Sending`);
		this.#heartbeat.acked = false;
		this.#lastHeartbeat = Date.now();
		this.sendWS({ op: OpCodes.HEARTBEAT, d: this.#sequence }, true);
	}

	private identify(): void {
		if (this.#sessionID) return this.resume();
		return this.newSession();
	}

	public newSession(): void {
		// If we have no connection, attempt to re-create it
		if (!this.#connection) {
			this.newWS();
			return;
		}

		const { options, token } = typedWorkerData;

		this.debug(`IDENTIFY[${(options.shards as number[]).join('/')}]`);
		this.sendWS({ op: OpCodes.IDENTIFY, d: { ...(options as unknown as WSIdentify), token } }, true);
	}

	private resume(): void {
		const session_id = this.#sessionID;
		const seq = this.#closeSequence;
		if (!session_id) {
			this.debug('RESUME[No Session ID] Creating a new session');
			this.newSession();
			return;
		}

		if (seq < 0) {
			this.debug('RESUME[Invalid Close Sequence] Creating a new session');
			this.newSession();
			return;
		}

		this.debug(`RESUME[${session_id} | Sequence ${seq}]`);
		this.sendWS({ op: OpCodes.RESUME, d: { seq, session_id, token: typedWorkerData.token } }, true);
	}

	private scheduleIdentify(): void {
		this.dispatch({ type: InternalActions.GatewayStatus, data: GatewayStatus.InvalidSession });
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

	private send(payload: string): void {
		if (!this.#connection || this.#connection.readyState !== WS.OPEN) {
			this.debug(`Tried to send payload '${payload}' but WebSocket connection is not open! Reconnecting`);
			this.destroy({ closeCode: WSCloseCodes.NotAuthenticated });
			return;
		}

		this.#connection.send(payload, (error) => {
			if (error) this.debug(`Error while sending payload: ${error.message}`);
		});
	}

	private newWS(): void {
		const query = new URLSearchParams();
		query.set('v', typedWorkerData.gatewayVersion.toString());

		if (zlib) {
			this.#zlib = new zlib.Inflate({ chunkSize: 128 * 1024 });
			query.set('compress', 'zlib-stream');
		} else {
			this.#zlib = null;
		}

		const ws = this.#connection = new WS(`${this.host}/?${query.toString()}`);

		ws.onopen = this._onopen.bind(this);
		ws.onmessage = this._onmessage.bind(this);
		ws.onerror = this._onerror.bind(this);
		ws.onclose = this._onclose.bind(this);
	}

}

const connection = new WebSocketConnection(typedWorkerData.gatewayURL);

parentPort.on('message', (message: MasterWorkerMessages) => {
	switch (message.type) {
		case InternalActions.Identify: {
			connection.newSession();
			break;
		}
	}
});
