import Client from '../Client.ts';
import RestManager from './RestManager.ts';

export interface Request {
	method: string;
	url: string;
	data: any;
	resolve: Function;
	reject: Function;
}

/**
 * The structure used to rate limit REST requests
 */
export default class RequestHandler extends Array<Request> {

	/**
	 * The D.TS client
	 */
	public client: Client;

	public constructor(private readonly manager: RestManager) {
		super();
		this.client = this.manager.client;
	}

	/**
	 * The activity state of this RequestHandler
	 */
	public get inactive(): boolean {
		// todo: actual inactive behavior
		return true;
	}

}
