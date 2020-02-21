import { EventEmitter } from 'events';
import { Snowflake } from '../../util/Snowflake';
import { RESTManager, RESTOptions } from './RESTManager';

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
	auth?: boolean;
}

export interface Request extends RequestOptions {
	method: string;
	endpoint: string;
}

/**
 * The route builder class
 */
export class REST extends EventEmitter {

	/**
	 * The rest manager for handling requests
	 */
	private manager: RESTManager;

	/**
	 * @param options The options for rest requests
	 */
	public constructor(options: Partial<RESTOptions>) {
		super();
		this.manager = new RESTManager(this, options);
	}

	/**
	 * Set token for rest requests
	 */
	public set token(token: string) {
		this.manager.token = token;
	}

	/**
	 * Gets data from the api
	 * @param endpoint The endpoint to get from
	 * @param options The request options
	 */
	public get(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.manager.queueRequest(REST.generateRouteIdentifiers(endpoint, 'get'), { method: 'get', endpoint, ...options });
	}

	/**
	 * Deletes data from the api
	 * @param endpoint The endpoint to delete from
	 * @param options The request options
	 */
	public delete(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.manager.queueRequest(REST.generateRouteIdentifiers(endpoint, 'delete'), { method: 'delete', endpoint, ...options });
	}

	/**
	 * Patches data on the api
	 * @param endpoint The endpoint to patch
	 * @param options The request options
	 */
	public patch(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.manager.queueRequest(REST.generateRouteIdentifiers(endpoint, 'patch'), { method: 'patch', endpoint, ...options });
	}

	/**
	 * Puts data into the api
	 * @param endpoint The endpoint to put in
	 * @param options The request options
	 */
	public put(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.manager.queueRequest(REST.generateRouteIdentifiers(endpoint, 'put'), { method: 'put', endpoint, ...options });
	}

	/**
	 * Posts to the api
	 * @param endpoint The endpoint to post to
	 * @param options The request options
	 */
	public post(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.manager.queueRequest(REST.generateRouteIdentifiers(endpoint, 'post'), { method: 'post', endpoint, ...options });
	}

	/**
	 * Generalizes the endpoint into a api route with only "major parameters"
	 * @param endpoint The endpoint we are generalizing
	 */
	private static generateRouteIdentifiers(endpoint: string, method: string): RouteIdentifier {
		const result = /^\/(?:channels|guilds|webhooks)\/(\d{16,19})/.exec(endpoint);
		// If there is no major parameter, all requests should be bucketed together globally across the api
		const majorParameter = result ? result[1] : 'global';
		// Convert all specific ids to a general string so the route is generic
		const baseRoute = endpoint.replace(/\d{16,19}/g, ':id');

		// Add-on strings to split route identifiers apart where discord has made rate-limiting exceptions
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
