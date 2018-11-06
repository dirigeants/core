import Client from '../Client';
import Shard from './Shard';

export default class WebsocketManager extends Map<number, Shard> implements EventTarget {

	public addEventListener: (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void = EventTarget.prototype.addEventListener;
	public removeEventListener: (type: string, callback: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => void = EventTarget.prototype.removeEventListener;
	public dispatchEvent: (event: Event) => boolean = EventTarget.prototype.dispatchEvent;

	public constructor(public client: Client, private shards: number | Array<number>) {
		super();
	}

	public spawn() {
		if (Array.isArray(this.shards)) {
			for (const shard of this.shards) this.set(shard, Shard.spawn(this, shard));
		} else {
			for (let i = 0; i < this.shards; i++) this.set(i, Shard.spawn(this, i));
		}
	}

}
