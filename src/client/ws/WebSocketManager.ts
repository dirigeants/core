import EventEmitter from '../../util/EventEmitter';
import Shard from './Shard';

@EventEmitter
export default class WebsocketManager extends Map<number, Shard> {

	public constructor(shards: number|Array<number>) {
		super();

		if (Array.isArray(shards)) {
			for (const shard of shards) this.spawn(shard);
		} else {
			for (let i = 0; i < shards; i++) this.spawn(i);
		}
	}

	private spawn(id: number) {
		this.set(id, Shard.spawn(this, id));
	}

}
