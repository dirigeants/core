export default class EventEmitter {

	public maxListeners: number = 10;

	private _listeners: Map<string|Symbol, Function[]> = new Map();
	private _onceListeners: Map<string|Symbol, Function[]> = new Map();

	public get eventNames(): (string|Symbol)[] {
		return [...new Set([...this._listeners.keys(), ...this._onceListeners.keys()])];
	}

	public emit(event: string|Symbol, ...args: any[]): this {
		const onceListeners = this.onceListeners(event);
		for (const listener of onceListeners) listener(...args);
		this._onceListeners.delete(event);
		const listeners = this.listeners(event);
		for (const listener of listeners) listener(...args);
		return this;
	}

	public listenerCount(event: string|Symbol): number {
		return this.listeners(event).length;
	}

	public listeners(event: string|Symbol): Function[] {
		return this._listeners.get(event) || [];
	}

	public onceListeners(event: string|Symbol): Function[] {
		return this._onceListeners.get(event) || [];
	}

	public on(event: string|Symbol, listener: Function): this {
		const listeners = this.listeners(event);
		if (!listeners.length) this._listeners.set(event, listeners);
		listeners.push(listener);
		if (listeners.length >= this.maxListeners) {
			console.warn(`Possible EventEmitter memory leak: (${listeners.length}) listeners created for the ${event} event`);
		}
		return this;
	}

	public off(event: string|Symbol, listener: Function): this {
		const listeners = this.listeners(event);
		listeners.splice(listeners.indexOf(listener), 1);
		return this;
	}

	public once(event: string|Symbol, listener: Function): this {
		const listeners = this.onceListeners(event);
		if (!listeners.length) this._onceListeners.set(event, listeners);
		listeners.push(listener);
		return this;
	}

	public removeAllListeners(event?: string|Symbol): this {
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