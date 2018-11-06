import Client from '../Client';
import RestManager from './RestManager';

export interface Request {
	method: string;
	url: string;
	data: any;
	resolve: Function;
	reject: Function;
}

export default class RequestHandler extends Array<Request> {

	public client: Client;
	private manager: RestManager;

	public constructor(restManager: RestManager) {
		super();
		this.client = restManager.client;
		this.manager = restManager;
	}

	public get inactive(): boolean {
		// todo: actual inactive behavior
		return true;
	}

}
