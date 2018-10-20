import Client from '../Client';
import RestManager from './RestManager';

interface IRequest {
	method: string;
	url: string;
	data: any;
	resolve: Function;
	reject: Function;
}

export default class RequestHandler extends Array<IRequest> {

	public client: Client;
	private manager: RestManager;

	public constructor(restManager: RestManager) {
		super();
		this.client = restManager.client;
		this.manager = restManager;
	}

}
