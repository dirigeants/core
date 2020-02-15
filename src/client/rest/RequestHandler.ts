import { Client } from '../Client';
import RestManager from './RestManager';

export interface Request {
	method: string;
	url: string;
	data: any;
	resolve: Function;
	reject: Function;
}

/**
 * The structure used to handle requests for a route
 */
export class RequestHandler extends Array<Request> {

	/**
	 * The Project-Blue client
	 */
	public client: Client;

	public constructor(private readonly manager: RestManager, private token: string) {
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
