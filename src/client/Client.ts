import { EventEmitter } from 'events';
import { RestManager } from './rest/RestManager';
import { Router } from './rest/Router';
import { WebSocketManager } from './ws/WebSocketManager';
import { mergeDefault } from '@klasa/utils';
import { ClientOptionsDefaults } from '../util/Constants';

export interface ClientOptions {
	shards: number | number[];
	rest: RestOptions;
}

export interface RestOptions {
	offset: number;
	retryLimit: number;
	timeout: number;
	version: number;
	api: string;
}

/**
 * The Project-Blue Client used to wrap the discord api
 */
export class Client extends EventEmitter {

	/**
	 * The api router
	 */
	public api: Router;

	/**
	 * The WebSocket manager
	 */
	public ws: WebSocketManager | null = null;

	/**
	 * The rest api manager
	 */
	public rest: RestManager | null = null;

	/**
	 * The options to use for this client
	 */
	public options: ClientOptions;

	/**
	 * A collection of timeouts to clear on destroy
	 */
	private _timeouts: Set<NodeJS.Timeout> = new Set();

	/**
	 * A collection of intervals to clear on destroy
	 */
	private _intervals: Set<NodeJS.Timeout> = new Set();

	/**
	 * @param options All of your preferences on how Project-Blue should work for you
	 */
	public constructor(options: Partial<ClientOptions>) {
		super();
		this.options = mergeDefault(ClientOptionsDefaults, options);
		this.api = new Router(this);
	}

	/**
	 * Set a timeout that Project Blue can clear when destroyed
	 * @param fn callback function
	 * @param delay amount of time before running the callback
	 * @param args additional arguments to pass back to the callback
	 */
	public setTimeout<A = unknown>(fn: (...args: A[]) => void, delay: number, ...args: A[]): NodeJS.Timeout {
		const timeout = setTimeout(() => {
			this._timeouts.delete(timeout);
			fn(...args);
		}, delay);
		this._timeouts.add(timeout);
		return timeout;
	}

	/**
	 * Clears a timeout set via Project Blue
	 * @param timeout The timeout to clear
	 */
	public clearTimeout(timeout: NodeJS.Timeout): void {
		clearTimeout(timeout);
		this._timeouts.delete(timeout);
	}

	/**
	 * Set an interval that Project Blue can clear when destroyed
	 * @param fn callback function
	 * @param delay amount of time before running the callback
	 * @param args additional arguments to pass back to the callback
	 */
	public setInterval<A = unknown>(fn: (...args: A[]) => void, delay: number, ...args: A[]): NodeJS.Timeout {
		const interval = setInterval(fn, delay, ...args);
		this._intervals.add(interval);
		return interval;
	}

	/**
	 * Clears an interval set via Project Blue
	 * @param interval The interval to clear
	 */
	public clearInterval(interval: NodeJS.Timeout): void {
		clearInterval(interval);
		this._intervals.delete(interval);
	}

	/**
	 * Clears running timeouts and intervals created in Project Blue so node can gracefully exit
	 */
	public destroy(): void {
		for (const i of this._timeouts) clearTimeout(i);
		for (const i of this._intervals) clearInterval(i);
		this._timeouts.clear();
		this._intervals.clear();
	}

	/**
	 * Logs this client into the api
	 * @param token The token to use to connect to the api with
	 */
	public async login(token: string): Promise<void> {
		this.rest = new RestManager(this, token);
		// todo: Not ready yet
		// this.ws = new WebSocketManager(this, this.options.shards, token);
	}

}
