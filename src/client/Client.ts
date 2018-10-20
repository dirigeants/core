import EventEmitter from '../util/EventEmitter';

@EventEmitter
export default class Client {

	private token: string;

	public async login(token: string) {
		this.token = token;
		// wip
	}

}
