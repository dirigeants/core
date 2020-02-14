import * as WebSocket from 'ws';
import { isMainThread, parentPort, workerData, MessagePort } from 'worker_threads';

function checkMainThread(port: unknown): asserts port is MessagePort {
	if (!isMainThread) throw new Error('WebsocketConnection.ts can only be run as a WorkerThread');
};

checkMainThread(parentPort);

enum OpCodes {
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

class WebsocketConnection extends WebSocket {

    public constructor(url: string, private readonly token: string) {
		super(url);
    }

    public destroy() {
        // idk, die instance die
    }

    private onopen() {
        this.send(JSON.stringify({ op: OpCodes.IDENTIFY, data: { token: this.token } }));
    }

    private onPacket(p) {
        switch (p.op) {
            case OpCodes.DISPATCH: return this.dispatch(p);
            case OpCodes.HEARTBEAT: return this.heartbeat(p);
            case OpCodes.IDENTIFY: return this.heartbeat(p);
            case OpCodes.STATUS_UPDATE: return this.heartbeat(p);
            case OpCodes.VOICE_STATE_UPDATE: return this.heartbeat(p);
            case OpCodes.VOICE_GUILD_PING: return this.heartbeat(p);
            case OpCodes.RESUME: return this.heartbeat(p);
            case OpCodes.RECONNECT: return this.heartbeat(p);
            case OpCodes.REQUEST_GUILD_MEMBERS: return this.heartbeat(p);
            case OpCodes.INVALID_SESSION: return this.heartbeat(p);
            case OpCodes.HELLO: return this.heartbeat(p);
            case OpCodes.HEARTBEAT_ACK: return this.heartbeat(p);
            default: {
                // do nothing
            }
        }
    }

    private dispatch(p) {
        (parentPort as MessagePort).postMessage(p.d);
    }

    private heartbeat(p) {
        // handle the beating of the heart
    }

}

let connection: WebsocketConnection = new WebsocketConnection(workerData.url, workerData.token);  

parentPort.on('message', (message) => {
	if (message.action === 'connect') {
		if (connection) connection.destroy();
		connection = new WebsocketConnection(message.url, message.token);
	}
});
