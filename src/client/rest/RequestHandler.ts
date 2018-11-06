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

	public constructor(private manager: RestManager) {
		super();
		this.client = this.manager.client;
	}

	public get inactive(): boolean {
		// todo: actual inactive behavior
		return true;
	}

}
