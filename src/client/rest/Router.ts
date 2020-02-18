import { Client } from '../Client';

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

	/**
	 * The types of ids that differentiate ratelimit buckets from similar endpoints
	 * https://discordapp.com/developers/docs/topics/rate-limits#rate-limits
	 */
	private static MAJOR_PARAMETERS = ['channels', 'guilds', 'webhooks'];

	// eslint-disable-next-line no-useless-constructor
	public constructor(public readonly client: Client) { }

	/**
	 * Gets data from the api
	 * @param endpoint The endpoint to get from
	 * @param options The request options
	 */
	public get(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.client.rest!.queueRequest(Router.generateRouteIdentifiers(endpoint), { method: 'get', endpoint, ...options });
	}

	/**
	 * Deletes data from the api
	 * @param endpoint The endpoint to delete from
	 * @param options The request options
	 */
	public delete(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.client.rest!.queueRequest(Router.generateRouteIdentifiers(endpoint), { method: 'delete', endpoint, ...options });
	}

	/**
	 * Patches data on the api
	 * @param endpoint The endpoint to patch
	 * @param options The request options
	 */
	public patch(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.client.rest!.queueRequest(Router.generateRouteIdentifiers(endpoint), { method: 'patch', endpoint, ...options });
	}

	/**
	 * Puts data into the api
	 * @param endpoint The endpoint to put in
	 * @param options The request options
	 */
	public put(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.client.rest!.queueRequest(Router.generateRouteIdentifiers(endpoint), { method: 'put', endpoint, ...options });
	}

	/**
	 * Posts to the api
	 * @param endpoint The endpoint to post to
	 * @param options The request options
	 */
	public post(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.client.rest!.queueRequest(Router.generateRouteIdentifiers(endpoint), { method: 'post', endpoint, ...options });
	}

	/**
	 * Generalizes the endpoint into a api route with only "major parameters"
	 * @param endpoint The endpoint we are generalizing
	 */
	private static generateRouteIdentifiers(endpoint: string): RouteIdentifier {
		const majorParameterResults = /^\/(?:channels|guilds|webhooks)\/(\d{16,19})/.exec(endpoint);
		const majorParameter = majorParameterResults![1];
		const route = endpoint.replace(/\d{16,19}/g, ':id');

		return { route, majorParameter };
	}

}
