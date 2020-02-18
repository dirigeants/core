import { Client } from '../Client';
import { Snowflake } from '../../util/Snowflake';

export interface RouteIdentifier {
	route: string;
	majorParameter: string;
}

export interface RequestOptions {
	query?: any;
	headers?: any;
	data?: any;
	files?: any[];
	reason?: string;
}

export interface Request extends RequestOptions {
	method: string;
	endpoint: string;
}

/**
 * The route builder class
 */
export class Router {

	// eslint-disable-next-line no-useless-constructor
	public constructor(public readonly client: Client) { }

	/**
	 * Gets data from the api
	 * @param endpoint The endpoint to get from
	 * @param options The request options
	 */
	public get(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.client.rest!.queueRequest(Router.generateRouteIdentifiers(endpoint, 'get'), { method: 'get', endpoint, ...options });
	}

	/**
	 * Deletes data from the api
	 * @param endpoint The endpoint to delete from
	 * @param options The request options
	 */
	public delete(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.client.rest!.queueRequest(Router.generateRouteIdentifiers(endpoint, 'delete'), { method: 'delete', endpoint, ...options });
	}

	/**
	 * Patches data on the api
	 * @param endpoint The endpoint to patch
	 * @param options The request options
	 */
	public patch(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.client.rest!.queueRequest(Router.generateRouteIdentifiers(endpoint, 'patch'), { method: 'patch', endpoint, ...options });
	}

	/**
	 * Puts data into the api
	 * @param endpoint The endpoint to put in
	 * @param options The request options
	 */
	public put(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.client.rest!.queueRequest(Router.generateRouteIdentifiers(endpoint, 'put'), { method: 'put', endpoint, ...options });
	}

	/**
	 * Posts to the api
	 * @param endpoint The endpoint to post to
	 * @param options The request options
	 */
	public post(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.client.rest!.queueRequest(Router.generateRouteIdentifiers(endpoint, 'post'), { method: 'post', endpoint, ...options });
	}

	/**
	 * Generalizes the endpoint into a api route with only "major parameters"
	 * @param endpoint The endpoint we are generalizing
	 */
	private static generateRouteIdentifiers(endpoint: string, method: string): RouteIdentifier {
		const majorParameter = /^\/(?:channels|guilds|webhooks)\/(\d{16,19})/.exec(endpoint)![1];
		const baseRoute = endpoint.replace(/\d{16,19}/g, ':id');

		let exceptions = '';

		// Hard-Code Old Message Deletion Exception (2 week+ old messages are a different bucket)
		// https://github.com/discordapp/discord-api-docs/issues/1295
		if (method === 'delete' && baseRoute === '/channel/:id/messages/:id') {
			const id = /\d{16,19}$/.exec(endpoint)![0];
			const snowflake = new Snowflake(id);
			if ((snowflake.timestamp - Date.now()) > 1000 * 60 * 60 * 24 * 14) exceptions += '[Delete Old Message]';
		}

		return { route: baseRoute + exceptions, majorParameter };
	}

}
