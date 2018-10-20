export default class EventEmitter {

	public maxListeners: number = 10;

	private _listeners: Map<string|symbol, Array<Function>> = new Map();
	private _onceListeners: Map<string|symbol, Array<Function>> = new Map();

	public get eventNames(): Array<string|symbol> {
		return [...new Set([...this._listeners.keys(), ...this._onceListeners.keys()])];
	}

	public emit(event: string|symbol, ...args: Array<any>): this {
		const onceListeners = this.onceListeners(event);
		for (const listener of onceListeners) listener(...args);
		this._onceListeners.delete(event);
		const listeners = this.listeners(event);
		for (const listener of listeners) listener(...args);
		return this;
	}

	public listenerCount(event: string|symbol): number {
		return this.listeners(event).length;
	}

	public listeners(event: string|symbol): Array<Function> {
		return this._listeners.get(event) || [];
	}

	public onceListeners(event: string|symbol): Array<Function> {
		return this._onceListeners.get(event) || [];
	}

	public on(event: string|symbol, listener: Function): this {
		const listeners = this.listeners(event);
		if (!listeners.length) this._listeners.set(event, listeners);
		listeners.push(listener);
		if (listeners.length >= this.maxListeners) {
			// tslint:disable-next-line no-console
			console.warn(`Possible EventEmitter memory leak: (${listeners.length}) listeners created for the ${String(event)} event`);
		}
		return this;
	}

	public off(event: string|symbol, listener: Function): this {
		const listeners = this.listeners(event);
		listeners.splice(listeners.indexOf(listener), 1);
		return this;
	}

	public once(event: string|symbol, listener: Function): this {
		const listeners = this.onceListeners(event);
		if (!listeners.length) this._onceListeners.set(event, listeners);
		listeners.push(listener);
		return this;
	}

	public removeAllListeners(event?: string|symbol): this {
		if (event) {
			this._onceListeners.delete(event);
			this._listeners.delete(event);
		} else {
			this._onceListeners.clear();
			this._listeners.clear();
		}
		return this;
	}

}
