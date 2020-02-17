import { Client } from '../Client';

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
	 * The types of ids that differenciate ratelimit buckets
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
		return this.client.rest!.queueRequest(Router.generateRouteID(endpoint), { method: 'get', endpoint, ...options });
	}

	/**
	 * Deletes data from the api
	 * @param endpoint The endpoint to delete from
	 * @param options The request options
	 */
	public delete(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.client.rest!.queueRequest(Router.generateRouteID(endpoint), { method: 'delete', endpoint, ...options });
	}

	/**
	 * Patches data on the api
	 * @param endpoint The endpoint to patch
	 * @param options The request options
	 */
	public patch(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.client.rest!.queueRequest(Router.generateRouteID(endpoint), { method: 'patch', endpoint, ...options });
	}

	/**
	 * Puts data into the api
	 * @param endpoint The endpoint to put in
	 * @param options The request options
	 */
	public put(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.client.rest!.queueRequest(Router.generateRouteID(endpoint), { method: 'put', endpoint, ...options });
	}

	/**
	 * Posts to the api
	 * @param endpoint The endpoint to post to
	 * @param options The request options
	 */
	public post(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.client.rest!.queueRequest(Router.generateRouteID(endpoint), { method: 'post', endpoint, ...options });
	}

	/**
	 * Generates identifiers for buckets given what we know about ratelimits
	 * @param endpoint The endpoint we are generating an identifier for
	 */
	private static generateRouteID(endpoint: string): string {
		const split = endpoint.split('/');
		const route = [];

		for (const segment of split) {
			const previousSegment = route[route.length - 1];

			// The ID should only be litteral if it's not an id of a Major Parameter
			if (/\d{16,19}/g.test(segment) && !this.MAJOR_PARAMETERS.includes(previousSegment)) route.push(':id');
			// All other IDs should be considered as part of the bucket identifier "route"
			else route.push(segment);
		}

		return route.join('/');
	}

}
