import EventEmitter from '../util/EventEmitter';

export default class Client extends EventEmitter {

	private token;

	public async login(token: string) {
		this.token = token;
		// wip
	}

}