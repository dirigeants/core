import EventEmitter from '../../util/EventEmitter';
import Client from '../Client';
import Shard from './Shard';

@EventEmitter
export default class WebsocketManager extends Map<number, Shard> {

	public client: Client;
	private shards: number | Array<number>;

	public constructor(client: Client, shards: number | Array<number>) {
		super();

		this.client = client;
		this.shards = shards;
	}

	public spawn() {
		if (Array.isArray(this.shards)) {
			for (const shard of this.shards) this.set(shard, Shard.spawn(this, shard));
		} else {
			for (let i = 0; i < this.shards; i++) this.set(i, Shard.spawn(this, i));
		}
	}

}
